import React, { lazy, Suspense } from 'react';

import { CurrentZoneVersion } from '@permaweb/libs/browser';

import { Loader } from 'components/atoms/Loader';
import { DOM } from 'helpers/config';
import Navigation from 'navigation';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { usePermawebProvider } from 'providers/PermawebProvider';

import * as S from './styles';

const Routes = lazy(() =>
	import(`../routes/Routes.tsx` as any).then((module) => ({
		default: module.default,
	}))
);

export default function App() {
	const arProvider = useArweaveProvider();
	const permawebProvider = usePermawebProvider();

	const hasCheckedProfileRef = React.useRef(false);

	React.useEffect(() => {
		(async function () {
			if (hasCheckedProfileRef.current) return;
			if (arProvider.profile && typeof arProvider.profile.id === 'string' && arProvider.profile.id.length === 43) {
				const userVersion = (arProvider as any).profile.version;
				if (!userVersion || userVersion !== CurrentZoneVersion) {
					console.log('Calling updateProfileVersion with:', arProvider.profile, 'processId:', arProvider.profile.id);
					await permawebProvider.libs.updateProfileVersion({
						profileId: arProvider.profile.id,
					});
					console.log('Updated profile version.');
					hasCheckedProfileRef.current = true;
				}
			}
		})();
	}, [arProvider.profile]);

	return (
		<>
			<div id={DOM.loader} />
			<div id={DOM.notification} />
			<div id={DOM.overlay} />
			<Suspense fallback={<Loader />}>
				<Navigation />
				<S.View className={'scroll-wrapper'}>
					<div className={'max-view-wrapper'}>
						<Routes />
					</div>
				</S.View>
			</Suspense>
		</>
	);
}
