import { getBestGatewayEndpoint, getGateways } from './wayfinder';

// Default fallback endpoint
const DEFAULT_ARWEAVE_ENDPOINT = 'https://arweave.net';
const turboEndpoint = 'https://payment.ardrive.io/v1';

// Get the current best gateway endpoint (sync version)
function getCurrentGatewayEndpoint(): string {
	const gateways = getGateways();
	if (gateways.length > 0) {
		// Use the first gateway as default
		return gateways[0];
	}
	return DEFAULT_ARWEAVE_ENDPOINT;
}

// Legacy synchronous functions for backward compatibility (now the default exports)
export function getARBalanceEndpoint(walletAddress: string): string {
	const gatewayEndpoint = getCurrentGatewayEndpoint();
	return `${gatewayEndpoint}/wallet/${walletAddress}/balance`;
}

export function getTxEndpoint(txId: string): string {
	const gatewayEndpoint = getCurrentGatewayEndpoint();
	return `${gatewayEndpoint}/${txId}`;
}

export function getRendererEndpoint(renderWith: string, tx: string): string {
	if (checkValidAddress(renderWith)) {
		const gatewayEndpoint = getCurrentGatewayEndpoint();
		return `${gatewayEndpoint}/${renderWith}/?tx=${tx}`;
	} else {
		return `https://${renderWith}.arweave.net/?tx=${tx}`;
	}
}

// Turbo endpoints (unchanged)
export function getTurboCostWincEndpoint(bytes: number) {
	return `${turboEndpoint}/price/bytes/${bytes}`;
}

export function getTurboPriceWincEndpoint(currency: string, amount: number) {
	return `${turboEndpoint}/price/${currency}/${amount * 100}`;
}

export function getTurboCheckoutEndpoint(walletAddress: string, currency: string, amount: number) {
	return `${turboEndpoint}/top-up/payment-intent/${walletAddress}/${currency}/${amount * 100}`;
}

export function getTurboBalanceEndpoint() {
	return `${turboEndpoint}/balance`;
}

// Async versions for advanced usage
export async function getARBalanceEndpointAsync(walletAddress: string): Promise<string> {
	const gatewayEndpoint = await getBestGatewayEndpoint();
	return `${gatewayEndpoint}/wallet/${walletAddress}/balance`;
}

export async function getTxEndpointAsync(txId: string): Promise<string> {
	const gatewayEndpoint = await getBestGatewayEndpoint();
	return `${gatewayEndpoint}/${txId}`;
}

export async function getRendererEndpointAsync(renderWith: string, tx: string): Promise<string> {
	if (checkValidAddress(renderWith)) {
		const gatewayEndpoint = await getBestGatewayEndpoint();
		return `${gatewayEndpoint}/${renderWith}/?tx=${tx}`;
	} else {
		return `https://${renderWith}.arweave.net/?tx=${tx}`;
	}
}

// Legacy aliases for backward compatibility
export const getARBalanceEndpointSync = getARBalanceEndpoint;
export const getTxEndpointSync = getTxEndpoint;
export const getRendererEndpointSync = getRendererEndpoint;

// Helper function to check if address is valid (copied from bazar)
function checkValidAddress(address: string): boolean {
	return /^[a-zA-Z0-9_-]{43}$/.test(address);
}
