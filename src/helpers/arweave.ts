import Arweave from 'arweave';

import { getBestGatewayEndpoint } from './wayfinder';

/**
 * Creates an Arweave instance using the best available gateway from Wayfinder
 * @returns Promise<Arweave> - Initialized Arweave instance
 */
export async function createArweaveInstance(): Promise<Arweave> {
	try {
		const gateway = await getBestGatewayEndpoint();
		const host = gateway.replace('https://', '');

		console.log(`Creating Arweave instance with gateway: ${host}`);

		return Arweave.init({
			host,
			protocol: 'https',
			port: 443,
			timeout: 60000,
			logging: false,
		});
	} catch (error) {
		console.error('Failed to create Arweave instance with Wayfinder, using fallback:', error);
		// Fallback to default gateway
		return Arweave.init({
			host: 'arweave.net',
			protocol: 'https',
			port: 443,
			timeout: 60000,
			logging: false,
		});
	}
}

/**
 * Creates an Arweave instance with custom configuration
 * @param config - Custom Arweave configuration
 * @returns Promise<Arweave> - Initialized Arweave instance
 */
export async function createArweaveInstanceWithConfig(config: {
	timeout?: number;
	logging?: boolean;
	port?: number;
}): Promise<Arweave> {
	try {
		const gateway = await getBestGatewayEndpoint();
		const host = gateway.replace('https://', '');

		console.log(`Creating Arweave instance with custom config and gateway: ${host}`);

		return Arweave.init({
			host,
			protocol: 'https',
			port: config.port || 443,
			timeout: config.timeout || 60000,
			logging: config.logging || false,
		});
	} catch (error) {
		console.error('Failed to create Arweave instance with Wayfinder, using fallback:', error);
		// Fallback to default gateway
		return Arweave.init({
			host: 'arweave.net',
			protocol: 'https',
			port: config.port || 443,
			timeout: config.timeout || 60000,
			logging: config.logging || false,
		});
	}
}

/**
 * Gets the current best gateway host (without protocol)
 * @returns Promise<string> - Gateway host
 */
export async function getCurrentGatewayHost(): Promise<string> {
	try {
		const gateway = await getBestGatewayEndpoint();
		return gateway.replace('https://', '');
	} catch (error) {
		console.error('❌ Failed to get gateway host, using fallback:', error);
		return 'arweave.net';
	}
}
