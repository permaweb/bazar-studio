import React from 'react';

import Arweave from 'arweave';
import { connect, createSigner } from '@permaweb/aoconnect';
import PermawebLibs from '@permaweb/libs';

import { useArweaveProvider } from './ArweaveProvider';

interface PermawebContextState {
	deps: any | null;
	libs: any | null;
}

const PermawebContext = React.createContext<PermawebContextState>({
	deps: null,
	libs: null,
});

export function usePermawebProvider(): PermawebContextState {
	return React.useContext(PermawebContext);
}

export function PermawebProvider(props: { children: React.ReactNode }) {
	const arProvider = useArweaveProvider();

	const [deps, setDeps] = React.useState<any>(null);
	const [libs, setLibs] = React.useState<any>(null);

	React.useEffect(() => {
		const deps = {
			ao: connect({ MODE: 'legacy' }),
			arweave: Arweave.init({}),
			signer: arProvider.wallet ? createSigner(arProvider.wallet) : null,
		};

		setLibs(PermawebLibs.init(deps));
		setDeps(deps);
	}, [arProvider.wallet]);

	return <PermawebContext.Provider value={{ libs, deps }}>{props.children}</PermawebContext.Provider>;
}
