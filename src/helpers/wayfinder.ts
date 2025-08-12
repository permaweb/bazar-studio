import { ARIO } from '@ar.io/sdk';

// Global gateway management
let globalGateways: string[] = [];
let currentGatewayIndex = 0;
let isInitializing = false;
let initializationPromise: Promise<void> | null = null;

// Initialize gateway list using ARIO
export async function initializeWayfinder(): Promise<string[]> {
	if (globalGateways.length > 0) {
		return globalGateways;
	}

	if (isInitializing && initializationPromise) {
		await initializationPromise;
		return globalGateways;
	}

	isInitializing = true;
	initializationPromise = (async () => {
		try {
			// Initialize ARIO client for mainnet
			const ario = ARIO.mainnet();

			// Get gateways from ARIO network
			const gatewaysResponse = await ario.getGateways({
				limit: 10,
				sortBy: 'totalDelegatedStake',
				sortOrder: 'desc',
			});

			// Extract gateway URLs from the response
			const gatewayUrls = gatewaysResponse.items
				.filter((gateway) => gateway.settings?.fqdn && gateway.status === 'joined')
				.map((gateway) => `https://${gateway.settings.fqdn}`)
				.slice(0, 5); // Take top 5 gateways

			// Add fallback gateways
			const fallbackGateways = ['https://arweave.net', 'https://ar-io.net'];

			globalGateways = [...gatewayUrls, ...fallbackGateways];

			// Make resolveGateway available globally for endpoints.ts
			if (typeof window !== 'undefined') {
				(window as any).__WAYFINDER_RESOLVE__ = async (url: string) => {
					if (url.startsWith('ar://')) {
						const gateway = getNextGateway();
						return url.replace('ar://', `${gateway}/`);
					}
					return url;
				};
			}

			console.log('Global gateways initialized successfully:', globalGateways);
		} catch (error) {
			console.error('Failed to initialize global gateways:', error);
			// Fallback to basic gateways
			globalGateways = ['https://arweave.net', 'https://ar-io.net'];
		} finally {
			isInitializing = false;
		}
	})();

	await initializationPromise;
	return globalGateways;
}

// Get the next gateway in round-robin fashion
function getNextGateway(): string {
	if (globalGateways.length === 0) {
		return 'https://arweave.net';
	}

	const gateway = globalGateways[currentGatewayIndex];
	currentGatewayIndex = (currentGatewayIndex + 1) % globalGateways.length;
	return gateway;
}

// Get the global gateways list
export function getGateways(): string[] {
	return globalGateways;
}

// Resolve gateway URL using round-robin selection
export async function resolveGatewayUrl(url: string): Promise<string> {
	try {
		if (globalGateways.length === 0) {
			await initializeWayfinder();
		}

		if (url.startsWith('ar://')) {
			const gateway = getNextGateway();
			return url.replace('ar://', `${gateway}/`);
		}

		return url;
	} catch (error) {
		console.error('Failed to resolve gateway URL:', url, error);
		// Fallback to arweave.net
		return url.replace('ar://', 'https://arweave.net/');
	}
}

// Get the best gateway endpoint
export async function getBestGatewayEndpoint(): Promise<string> {
	try {
		if (globalGateways.length === 0) {
			await initializeWayfinder();
		}
		return getNextGateway();
	} catch (error) {
		console.warn('Gateways not available, using fallback gateway:', error);
		return 'https://arweave.net';
	}
}

// Test gateway performance
export async function testGatewayPerformance(): Promise<Record<string, number>> {
	const results: Record<string, number> = {};

	for (const gateway of globalGateways) {
		try {
			const start = performance.now();
			const response = await fetch(`${gateway}/info`);
			const duration = performance.now() - start;

			if (response.ok) {
				results[gateway] = duration;
			} else {
				results[gateway] = Infinity;
			}
		} catch (error) {
			results[gateway] = Infinity;
		}
	}

	return results;
}
