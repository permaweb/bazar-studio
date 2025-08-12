import React from 'react';
import { defaultCacheOptions, LoggerFactory, WarpFactory } from 'warp-contracts';
import { DeployPlugin } from 'warp-contracts-plugin-deploy';
import { InjectedArweaveSigner } from 'warp-contracts-plugin-signature';

import Arweave from 'arweave';
import Stamps from '@permaweb/stampjs';

import { createArweaveInstance } from 'helpers/arweave';
import { API_CONFIG } from 'helpers/config';
import { getGraphQLEndpoint } from 'helpers/graphql';
import { StampType } from 'helpers/types';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';

LoggerFactory.INST.logLevel('fatal');

export default function useStamps() {
	const arProvider = useArweaveProvider();

	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [stampLib, setStampLib] = React.useState<any>(null);
	const [stampDisabled, setStampDisabled] = React.useState<boolean>(false);

	React.useEffect(() => {
		(async function () {
			try {
				const arweave = await createArweaveInstance();
				const graphqlEndpoint = await getGraphQLEndpoint();

				const warp = WarpFactory.forMainnet({
					...defaultCacheOptions,
					inMemory: true,
				}).use(new DeployPlugin());

				const stamps = Stamps.init({
					warp: warp,
					arweave: arweave,
					wallet: arProvider.walletAddress ? new InjectedArweaveSigner(arProvider.walletAddress) : null,
					graphql: graphqlEndpoint,
				});
				setStampLib(stamps);

				if (!arProvider.walletAddress) setStampDisabled(true);
			} catch (error) {
				console.error('Failed to initialize stamps with Wayfinder:', error);
				// Fallback to default configuration
				const arweave = Arweave.init({
					host: 'arweave.net',
					protocol: 'https',
					port: 443,
					timeout: 60000,
					logging: false,
				});

				const warp = WarpFactory.forMainnet({
					...defaultCacheOptions,
					inMemory: true,
				}).use(new DeployPlugin());

				const stamps = Stamps.init({
					warp: warp,
					arweave: arweave,
					wallet: arProvider.walletAddress ? new InjectedArweaveSigner(arProvider.walletAddress) : null,
					graphql: 'https://arweave.net/graphql',
				});
				setStampLib(stamps);

				if (!arProvider.walletAddress) setStampDisabled(true);
			}
		})();
	}, [arProvider.walletAddress]);

	async function getStampObject(ids: string[]) {
		if (ids && stampLib) {
			let stampCounts: any = {};
			let stampChecks: any = {};
			try {
				stampCounts = await stampLib.counts(ids);

				if (arProvider.walletAddress) {
					stampChecks = await stampLib.hasStamped([...ids, '']);
				}

				const stampObject = {};
				ids.forEach((id: string) => {
					stampObject[id] = getStamps(id, { ...stampCounts }, { ...stampChecks });
				});
				return stampObject;
			} catch (e: any) {
				console.error(e);
				return null;
			}
		}
	}

	const handleStamp: any = React.useCallback(
		async (id: string, amount?: number) => {
			try {
				if (id) {
					setStampDisabled(true);

					const stamp: any = await stampLib.stamp(id, amount ? amount : 0, [{ name: '', value: '' }]);
					let stampSuccess = stamp && stamp.bundlrResponse && stamp.bundlrResponse.id;
					if (!stampSuccess) {
						stampSuccess = stamp && stamp.id;
					}

					if (!stampSuccess) {
						setStampDisabled(false);
						return language.errorOccurred;
					}

					return stampSuccess ? language.stamped : language.errorOccurred;
				}
			} catch (e: any) {
				return e.toString();
			}
		},
		[stampLib]
	);

	return {
		stampLib,
		handleStamp,
		stampDisabled,
		getStampObject,
	};
}

function getStamps(assetId: string, stampCounts: any, stampChecks: any) {
	let stamps: StampType = { total: 0, vouched: 0, connectedWalletStamped: false };

	if (stampCounts && stampCounts[assetId]) {
		stamps.total = stampCounts[assetId].total;
		stamps.vouched = stampCounts[assetId].vouched;
	}
	if (stampChecks && stampChecks[assetId]) {
		stamps.connectedWalletStamped = stampChecks[assetId];
	}
	return stamps;
}
