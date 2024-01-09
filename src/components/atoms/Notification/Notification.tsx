import React from 'react';

import { DOM } from 'helpers/config';
import { useLanguageProvider } from 'providers/LanguageProvider';

import { Button } from '../Button';
import { Portal } from '../Portal';

import * as S from './styles';
import { IProps } from './types';

export default function Notification(props: IProps) {
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [show, setShow] = React.useState<boolean>(true);

	function handleClose() {
		setShow(false);
		props.callback();
	}

	return show ? (
		<Portal node={DOM.notification}>
			<S.Wrapper>
				<S.Message>{props.message}</S.Message>
				{props.callback && (
					<S.Close>
						<Button type={'alt2'} label={language.dismiss} handlePress={handleClose} />
					</S.Close>
				)}
			</S.Wrapper>
		</Portal>
	) : null;
}
