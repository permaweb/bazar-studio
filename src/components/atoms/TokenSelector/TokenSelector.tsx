import React from 'react';

import { getTxEndpoint } from 'helpers/endpoints';
import { useLanguageProvider } from 'providers/LanguageProvider';
import { useTokenProvider } from 'providers/TokenProvider';

import * as S from './styles';

interface TokenSelectorProps {
	onTokenChange?: (tokenId: string) => void;
	className?: string;
	showLabel?: boolean;
}

export default function TokenSelector(props: TokenSelectorProps) {
	const { selectedToken, setSelectedToken, availableTokens } = useTokenProvider();
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const handleTokenChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const tokenId = event.target.value;
		const newToken = availableTokens.find((token) => token.id === tokenId);
		if (newToken) {
			setSelectedToken(newToken);
			props.onTokenChange?.(tokenId);
		}
	};

	return (
		<S.Wrapper className={props.className}>
			{props.showLabel && <S.Label>{language.selectToken}:</S.Label>}
			<S.SelectWrapper>
				<S.Select value={selectedToken.id} onChange={handleTokenChange}>
					{availableTokens.map((token) => (
						<S.Option key={token.id} value={token.id}>
							<S.TokenOption>
								<S.TokenLogo>
									<img src={getTxEndpoint(token.logo)} alt={token.name} />
								</S.TokenLogo>
								<S.TokenInfo>
									<S.TokenName>{token.name}</S.TokenName>
									<S.TokenSymbol>{token.symbol}</S.TokenSymbol>
								</S.TokenInfo>
							</S.TokenOption>
						</S.Option>
					))}
				</S.Select>
			</S.SelectWrapper>
		</S.Wrapper>
	);
}
