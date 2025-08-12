import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { AOSyncProvider } from '@vela-ventures/aosync-sdk-react';
import { PersistGate } from 'redux-persist/integration/react';

import { App } from 'app';
import { GlobalStyle } from 'app/styles';
import { Loader } from 'components/atoms/Loader';
import { getAOSyncGatewayConfig } from 'helpers/aosync';
import { ArweaveProvider } from 'providers/ArweaveProvider';
import { CustomThemeProvider } from 'providers/CustomThemeProvider';
import { LanguageProvider } from 'providers/LanguageProvider';
import { PermawebProvider } from 'providers/PermawebProvider';
import { TokenProvider } from 'providers/TokenProvider';
import { WayfinderProvider } from 'providers/WayfinderProvider';
import { persistor, store } from 'store';

// Initialize app with dynamic gateway configuration
async function initializeApp() {
	try {
		const gatewayConfig = await getAOSyncGatewayConfig();

		ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
			<Provider store={store}>
				<PersistGate loading={<Loader />} persistor={persistor}>
					<CustomThemeProvider>
						<LanguageProvider>
							<AOSyncProvider
								gatewayConfig={gatewayConfig}
								appInfo={{ name: 'Bazar studio' }}
								muUrl="https://mu.ao-testnet.xyz"
							>
								<WayfinderProvider>
									<ArweaveProvider>
										<PermawebProvider>
											<TokenProvider>
												<HashRouter>
													<GlobalStyle />
													<App />
												</HashRouter>
											</TokenProvider>
										</PermawebProvider>
									</ArweaveProvider>
								</WayfinderProvider>
							</AOSyncProvider>
						</LanguageProvider>
					</CustomThemeProvider>
				</PersistGate>
			</Provider>
		);
	} catch (error) {
		console.error('❌ Failed to initialize app with Wayfinder, using fallback:', error);
		// Fallback to default configuration
		ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
			<Provider store={store}>
				<PersistGate loading={<Loader />} persistor={persistor}>
					<CustomThemeProvider>
						<LanguageProvider>
							<AOSyncProvider
								gatewayConfig={{
									host: 'arweave.net',
									port: 443,
									protocol: 'https',
								}}
								appInfo={{ name: 'Bazar studio' }}
								muUrl="https://mu.ao-testnet.xyz"
							>
								<WayfinderProvider>
									<ArweaveProvider>
										<PermawebProvider>
											<TokenProvider>
												<HashRouter>
													<GlobalStyle />
													<App />
												</HashRouter>
											</TokenProvider>
										</PermawebProvider>
									</ArweaveProvider>
								</WayfinderProvider>
							</AOSyncProvider>
						</LanguageProvider>
					</CustomThemeProvider>
				</PersistGate>
			</Provider>
		);
	}
}

// Start the app
initializeApp();
