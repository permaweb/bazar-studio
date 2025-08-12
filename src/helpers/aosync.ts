import { getBestGatewayEndpoint } from './wayfinder';

/**
 * Gets the best gateway configuration for AOSyncProvider using Wayfinder
 * @returns Promise<{host: string, port: number, protocol: string}> - Gateway configuration
 */
export async function getAOSyncGatewayConfig(): Promise<{
	host: string;
	port: number;
	protocol: string;
}> {
	try {
		const gateway = await getBestGatewayEndpoint();
		const host = gateway.replace('https://', '');

		console.log(`🔗 Using AOSync gateway: ${host}`);

		return {
			host,
			port: 443,
			protocol: 'https',
		};
	} catch (error) {
		console.error('❌ Failed to get AOSync gateway with Wayfinder, using fallback:', error);
		return {
			host: 'arweave.net',
			port: 443,
			protocol: 'https',
		};
	}
}

/**
 * Gets the best gateway host for AOSync operations
 * @returns Promise<string> - Gateway host
 */
export async function getAOSyncGatewayHost(): Promise<string> {
	try {
		const gateway = await getBestGatewayEndpoint();
		return gateway.replace('https://', '');
	} catch (error) {
		console.error('❌ Failed to get AOSync gateway host, using fallback:', error);
		return 'arweave.net';
	}
}
