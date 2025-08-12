import React from 'react';
import { useWallet as useAOsyncWallet } from '@vela-ventures/aosync-sdk-react';
import { randomBytes } from 'crypto-browserify';

import Arweave from 'arweave';
import { bufferTob64Url } from 'arweave/node/lib/utils';
import { ArconnectSigner } from 'arbundles';
import { connect, createSigner } from '@permaweb/aoconnect';
import PermawebLibs from '@permaweb/libs';

import { readHandler } from 'api';

import { Modal } from 'components/molecules/Modal';
import { AO, API_CONFIG, AR_WALLETS, GATEWAYS, REDIRECTS, STORAGE, WALLET_PERMISSIONS } from 'helpers/config';
import { getARBalanceEndpoint, getTurboBalanceEndpoint } from 'helpers/endpoints';
import { ProfileHeaderType, WalletEnum } from 'helpers/types';
import { getARAmountFromWinc, getTotalTokenBalance } from 'helpers/utils';
import Othent from 'helpers/wallet';
import { useLanguageProvider } from 'providers/LanguageProvider';

import * as S from './styles';

interface ArweaveContextState {
	libs: any;
	wallets: { type: WalletEnum; logo: string }[];
	wallet: any;
	walletAddress: string | null;
	walletType: WalletEnum | null;
	arBalance: number | null;
	tokenBalances: { [address: string]: number } | null;
	toggleTokenBalanceUpdate: boolean;
	setToggleTokenBalanceUpdate: (toggleUpdate: boolean) => void;
	handleConnect: any;
	handleDisconnect: () => void;
	walletModalVisible: boolean;
	setWalletModalVisible: (open: boolean) => void;
	profile: ProfileHeaderType;
	toggleProfileUpdate: boolean;
	setToggleProfileUpdate: (toggleUpdate: boolean) => void;
	turboBalance: number | string | null;
	getTurboBalance: () => void;
}

interface ArweaveProviderProps {
	children: React.ReactNode;
}

const DEFAULT_CONTEXT = {
	libs: null,
	wallets: [],
	wallet: null,
	walletAddress: null,
	walletType: null,
	arBalance: null,
	tokenBalances: null,
	toggleTokenBalanceUpdate: false,
	setToggleTokenBalanceUpdate(_toggleUpdate: boolean) {},
	handleConnect() {},
	handleDisconnect() {},
	walletModalVisible: false,
	setWalletModalVisible(_open: boolean) {},
	profile: null,
	toggleProfileUpdate: false,
	setToggleProfileUpdate(_toggleUpdate: boolean) {},
	turboBalance: null,
	getTurboBalance() {},
};

const ARContext = React.createContext<ArweaveContextState>(DEFAULT_CONTEXT);

export function useArweaveProvider(): ArweaveContextState {
	return React.useContext(ARContext);
}

function WalletList(props: { handleConnect: any }) {
	return (
		<S.WalletListContainer>
			{AR_WALLETS.map((wallet: any, index: number) => (
				<S.WalletListItem key={index} onClick={() => props.handleConnect(wallet.type)}>
					<img src={`${wallet.logo}`} alt={''} />
					<span>{wallet.type.charAt(0).toUpperCase() + wallet.type.slice(1)}</span>
				</S.WalletListItem>
			))}
			<S.WalletLink>
				<span>
					Don't have an Arweave Wallet? You can create one{' '}
					<a href={REDIRECTS.arconnect} target={'_blank'}>
						here.
					</a>
				</span>
			</S.WalletLink>
		</S.WalletListContainer>
	);
}

export function ArweaveProvider(props: ArweaveProviderProps) {
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const wallets = AR_WALLETS;

	const [libs, setLibs] = React.useState<any>(null);
	const [wallet, setWallet] = React.useState<any>(null);
	const [walletType, setWalletType] = React.useState<WalletEnum | null>(null);
	const [walletModalVisible, setWalletModalVisible] = React.useState<boolean>(false);
	const [walletAddress, setWalletAddress] = React.useState<string | null>(null);

	const [arBalance, setArBalance] = React.useState<number | null>(null);
	const [turboBalance, setTurboBalance] = React.useState<number | string | null>(null);
	const [tokenBalances, setTokenBalances] = React.useState<{ [address: string]: number } | null>({
		[AO.defaultToken]: null,
		[AO.pixl]: null,
		'7GoQfmSOct_aUOWKM4xbKGg6DzAmOgdKwg8Kf-CbHm4': null, // Wander token
	});
	const [toggleTokenBalanceUpdate, setToggleTokenBalanceUpdate] = React.useState<boolean>(false);

	const [profile, setProfile] = React.useState<ProfileHeaderType | null>(null);
	const [toggleProfileUpdate, setToggleProfileUpdate] = React.useState<boolean>(false);
	const {
		isConnected: isAOsyncConnected,
		connect: connectAOsync,
		getAddress: aosyncGetAddress,
		isSessionActive: aoSyncSessionActive,
	} = useAOsyncWallet();

	React.useEffect(() => {
		(async function () {
			await handleWallet();
		})();
	}, []);

	React.useEffect(() => {
		handleWallet();

		window.addEventListener('arweaveWalletLoaded', handleWallet);
		window.addEventListener('walletSwitch', handleWallet);

		return () => {
			window.removeEventListener('arweaveWalletLoaded', handleWallet);
			window.removeEventListener('walletSwitch', handleWallet);
		};
	}, []);

	React.useEffect(() => {
		const deps = {
			ao: connect({ MODE: 'legacy' }),
			arweave: Arweave.init({}),
			signer: wallet ? createSigner(wallet) : null,
		};

		setLibs(PermawebLibs.init(deps));
	}, [wallet]);

	React.useEffect(() => {
		(async function () {
			if (walletAddress) {
				try {
					setArBalance(await getARBalance(walletAddress));
				} catch (e: any) {
					console.error(e);
				}
			}
		})();
	}, [walletAddress]);

	// React.useEffect(() => {
	// 	(async function () {
	// 		if (wallet && walletAddress) {
	// 			await new Promise((r) => setTimeout(r, 2000));
	// 			try {
	// 				setProfile(await libs.getProfileByWalletAddress(walletAddress));
	// 			} catch (e: any) {
	// 				console.error(e);
	// 			}
	// 		}
	// 	})();
	// }, [walletAddress]);

	React.useEffect(() => {
		(async function () {
			if (walletAddress) {
				const cachedProfile = getCachedProfile(walletAddress);

				if (cachedProfile) {
					if (cachedProfile.status && cachedProfile.status === 'pending') {
						setProfile(cachedProfile);
						return;
					}

					setProfile(cachedProfile);
				}
				await new Promise((r) => setTimeout(r, 2000));
				setProfile(await resolveProfile(walletAddress));
			}
		})();
	}, [walletAddress]);

	async function resolveProfile(address: string) {
		try {
			let fetchedProfile: any;
			const cachedProfile = getCachedProfile(address);
			if (cachedProfile?.id) fetchedProfile = await libs.getProfileById(cachedProfile.id);
			else fetchedProfile = await libs.getProfileByWalletAddress(address);
			let profileToUse = { ...fetchedProfile };

			if (!fetchedProfile?.id && cachedProfile) profileToUse = cachedProfile;
			cacheProfile(address, profileToUse);

			return profileToUse;
		} catch (e: any) {
			console.error('fetchError', e);
		}
	}

	function getCachedProfile(address: string) {
		const cached = localStorage.getItem(STORAGE.profileByWallet(address));
		return cached ? JSON.parse(cached) : null;
	}

	function cacheProfile(address: string, profileData: any) {
		localStorage.setItem(STORAGE.profileByWallet(address), JSON.stringify(profileData));
	}

	React.useEffect(() => {
		(async function () {
			if (wallet && walletAddress) {
				const fetchProfileUntilChange = async () => {
					let changeDetected = false;
					let tries = 0;
					const maxTries = 10;

					while (!changeDetected && tries < maxTries) {
						try {
							const existingProfile = profile;
							const newProfile = await libs.getProfileByWalletAddress(walletAddress);

							if (JSON.stringify(existingProfile) !== JSON.stringify(newProfile)) {
								setProfile(newProfile);
								changeDetected = true;
							} else {
								await new Promise((resolve) => setTimeout(resolve, 2000));
								tries++;
							}
						} catch (error) {
							console.error(error);
							break;
						}
					}

					if (!changeDetected) {
						console.warn(`No changes detected after ${maxTries} attempts`);
					}
				};

				await fetchProfileUntilChange();
			}
		})();
	}, [toggleProfileUpdate]);

	React.useEffect(() => {
		if (profile && profile.id && walletAddress) {
			const fetchDefaultTokenBalance = async () => {
				try {
					// Fetch profile balance
					const profileBalance = await readHandler({
						processId: AO.defaultToken,
						action: 'Balance',
						tags: [{ name: 'Recipient', value: profile.id }],
					});

					// Fetch wallet balance
					const walletBalance = await readHandler({
						processId: AO.defaultToken,
						action: 'Balance',
						tags: [{ name: 'Recipient', value: walletAddress }],
					});

					// Combine balances using getTotalTokenBalance
					const totalBalance = getTotalTokenBalance({
						profileBalance: profileBalance || 0,
						walletBalance: walletBalance || 0,
					});

					setTokenBalances((prevBalances) => ({
						...prevBalances,
						[AO.defaultToken]: totalBalance || 0,
					}));
				} catch (e) {
					console.error(e);
				}
			};

			fetchDefaultTokenBalance();
		} else {
			setTokenBalances({
				[AO.defaultToken]: 0,
				[AO.pixl]: 0,
				'7GoQfmSOct_aUOWKM4xbKGg6DzAmOgdKwg8Kf-CbHm4': 0, // Wander token
			});
		}
	}, [profile, toggleTokenBalanceUpdate, walletAddress]);

	React.useEffect(() => {
		if (profile && profile.id && walletAddress) {
			const fetchPixlTokenBalance = async () => {
				try {
					// Fetch profile balance
					const profileBalance = await readHandler({
						processId: AO.pixl,
						action: 'Balance',
						tags: [{ name: 'Recipient', value: profile.id }],
					});

					// Fetch wallet balance
					const walletBalance = await readHandler({
						processId: AO.pixl,
						action: 'Balance',
						tags: [{ name: 'Recipient', value: walletAddress }],
					});

					// Combine balances using getTotalTokenBalance
					const totalBalance = getTotalTokenBalance({
						profileBalance: profileBalance || 0,
						walletBalance: walletBalance || 0,
					});

					setTokenBalances((prevBalances) => ({
						...prevBalances,
						[AO.pixl]: totalBalance || 0,
					}));
				} catch (e) {
					console.error(e);
				}
			};

			fetchPixlTokenBalance();
		}
	}, [profile, toggleTokenBalanceUpdate, walletAddress]);

	React.useEffect(() => {
		if (profile && profile.id && walletAddress) {
			const fetchWanderTokenBalance = async () => {
				try {
					// Fetch profile balance
					const profileBalance = await readHandler({
						processId: '7GoQfmSOct_aUOWKM4xbKGg6DzAmOgdKwg8Kf-CbHm4',
						action: 'Balance',
						tags: [{ name: 'Recipient', value: profile.id }],
					});

					// Fetch wallet balance
					const walletBalance = await readHandler({
						processId: '7GoQfmSOct_aUOWKM4xbKGg6DzAmOgdKwg8Kf-CbHm4',
						action: 'Balance',
						tags: [{ name: 'Recipient', value: walletAddress }],
					});

					// Combine balances using getTotalTokenBalance
					const totalBalance = getTotalTokenBalance({
						profileBalance: profileBalance || 0,
						walletBalance: walletBalance || 0,
					});

					setTokenBalances((prevBalances) => ({
						...prevBalances,
						'7GoQfmSOct_aUOWKM4xbKGg6DzAmOgdKwg8Kf-CbHm4': totalBalance || 0,
					}));
				} catch (e) {
					console.error(e);
				}
			};

			fetchWanderTokenBalance();
		}
	}, [profile, toggleTokenBalanceUpdate, walletAddress]);

	async function getTurboBalance() {
		if (wallet && walletType) {
			try {
				setTurboBalance(`${language.loading}...`);
				const arweave = Arweave.init({
					host: GATEWAYS.arweave,
					protocol: API_CONFIG.protocol,
					port: API_CONFIG.port,
					timeout: API_CONFIG.timeout,
					logging: API_CONFIG.logging,
				});

				const publicKey = await wallet.getActivePublicKey();
				const nonce = randomBytes(16).toString('hex');
				const buffer = Buffer.from(nonce);

				const signer = new ArconnectSigner(wallet, arweave as any);
				const signature = await signer.sign(buffer);
				const b64UrlSignature = bufferTob64Url(Buffer.from(signature));

				const result = await fetch(getTurboBalanceEndpoint(), {
					headers: {
						'x-nonce': nonce,
						'x-public-key': publicKey,
						'x-signature': b64UrlSignature,
					},
				});

				if (result.ok) {
					setTurboBalance(getARAmountFromWinc(Number((await result.json()).winc)));
				} else {
					setTurboBalance(0);
				}
			} catch (e: any) {
				console.error(e);
				setTurboBalance(null);
			}
		}
	}

	async function handleWallet() {
		if (localStorage.getItem('walletType')) {
			try {
				await handleConnect(localStorage.getItem('walletType') as any);
			} catch (e: any) {
				console.error(e);
			}
		}
	}

	async function handleConnect(walletType: WalletEnum.wander | WalletEnum.othent | WalletEnum.beacon) {
		let walletObj: any = null;
		switch (walletType) {
			case WalletEnum.wander:
				handleArConnect();
				break;
			case WalletEnum.othent:
				handleOthent();
				break;
			case WalletEnum.beacon:
				handleAOsyncConnect();
				break;
			default:
				if (window.arweaveWallet || walletType === WalletEnum.wander) {
					handleArConnect();
					break;
				}
		}
		setWalletModalVisible(false);
		return walletObj;
	}

	React.useEffect(() => {
		(async function () {
			await checkAOsyncConnection();
		})();
	}, [isAOsyncConnected]);

	async function checkAOsyncConnection() {
		if (localStorage.getItem('walletType') === WalletEnum.beacon && !isAOsyncConnected) {
			try {
				setWallet(null);
				setWalletAddress(null);
				setProfile(null);
				if (localStorage.getItem('walletType')) localStorage.removeItem('walletType');
			} catch (error) {}
		}
	}

	async function handleAOsyncConnect() {
		if (!walletAddress) {
			try {
				const localItem = localStorage.getItem('walletType');
				if (localItem !== WalletEnum.beacon) {
					await connectAOsync();
				}
				if (aoSyncSessionActive || localItem !== WalletEnum.beacon) {
					const walletAddress = await aosyncGetAddress();
					setWalletAddress(walletAddress);
					setWalletType(WalletEnum.beacon);
					setWalletModalVisible(false);
					localStorage.setItem('walletType', WalletEnum.beacon);
					setWallet(window.arweaveWallet);
				}
			} catch (e: any) {
				console.error(e);
			}
		}
	}

	async function handleArConnect() {
		if (!walletAddress) {
			if (window.arweaveWallet) {
				try {
					await global.window?.arweaveWallet?.connect(WALLET_PERMISSIONS as any);
					setWalletAddress(await global.window.arweaveWallet.getActiveAddress());
					setWallet(window.arweaveWallet);
					setWalletType(WalletEnum.wander);
					setWalletModalVisible(false);
					localStorage.setItem('walletType', WalletEnum.wander);
				} catch (e: any) {
					console.error(e);
				}
			}
		}
	}

	async function handleOthent() {
		Othent.init();
		await window.arweaveWallet.connect(WALLET_PERMISSIONS as any);
		setWallet(window.arweaveWallet);
		setWalletAddress(Othent.getUserInfo().walletAddress);
		setWalletType(WalletEnum.othent);
		localStorage.setItem('walletType', WalletEnum.othent);
	}

	async function handleDisconnect() {
		await global.window?.arweaveWallet?.disconnect();
		setWallet(null);
		setWalletAddress(null);
		setProfile(null);
		if (localStorage.getItem('walletType')) localStorage.removeItem('walletType');
	}

	async function getARBalance(walletAddress: string) {
		const rawBalance = await fetch(getARBalanceEndpoint(walletAddress));
		const jsonBalance = await rawBalance.json();
		return jsonBalance / 1e12;
	}

	return (
		<>
			{walletModalVisible && (
				<Modal header={language.connectWallet} handleClose={() => setWalletModalVisible(false)}>
					<WalletList handleConnect={handleConnect} />
				</Modal>
			)}
			<ARContext.Provider
				value={{
					libs,
					wallet,
					walletAddress,
					walletType,
					arBalance,
					tokenBalances,
					toggleTokenBalanceUpdate,
					setToggleTokenBalanceUpdate,
					handleConnect,
					handleDisconnect,
					wallets,
					walletModalVisible,
					setWalletModalVisible,
					profile,
					toggleProfileUpdate,
					setToggleProfileUpdate,
					turboBalance: turboBalance,
					getTurboBalance: getTurboBalance,
				}}
			>
				{props.children}
			</ARContext.Provider>
		</>
	);
}
