import styled from 'styled-components';

import { STYLING } from 'helpers/config';

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
`;

export const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	span {
		font-size: ${(props) => props.theme.typography.size.base};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) => props.theme.colors.font.primary};
	}
`;

export const Info = styled.div`
	span {
		font-size: ${(props) => props.theme.typography.size.small};
		color: ${(props) => props.theme.colors.font.alt1};
	}
`;

export const ModalWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	max-height: 70vh;
	overflow-y: auto;
`;

export const Section = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
`;

export const SectionTitle = styled.h4`
	font-size: ${(props) => props.theme.typography.size.base};
	font-weight: ${(props) => props.theme.typography.weight.bold};
	color: ${(props) => props.theme.colors.font.primary};
	margin: 0;
`;

export const AssetList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	max-height: 300px;
	overflow-y: auto;
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.radius.alt2};
	padding: 10px;
`;

export const SelectAllRow = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 8px;
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
`;

export const SelectAllLabel = styled.span`
	font-size: ${(props) => props.theme.typography.size.small};
	font-weight: ${(props) => props.theme.typography.weight.medium};
	color: ${(props) => props.theme.colors.font.primary};
`;

export const AssetRow = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 8px;
	border-radius: ${STYLING.dimensions.radius.alt2};
	background: ${(props) => props.theme.colors.container.alt3.background};

	&:hover {
		background: ${(props) => props.theme.colors.container.primary.background};
	}
`;

export const Checkbox = styled.input`
	margin: 0;
`;

export const AssetName = styled.span`
	font-size: ${(props) => props.theme.typography.size.small};
	font-weight: ${(props) => props.theme.typography.weight.medium};
	color: ${(props) => props.theme.colors.font.primary};
	flex: 1;
`;

export const AssetTraits = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 4px;
	max-width: 200px;
`;

export const ExistingTrait = styled.span`
	font-size: 10px;
	padding: 2px 6px;
	background: ${(props) => props.theme.colors.container.primary.background};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.radius.alt2};
	color: ${(props) => props.theme.colors.font.alt1};
`;

export const NoTraits = styled.span`
	font-size: 10px;
	color: ${(props) => props.theme.colors.font.alt1};
	font-style: italic;
`;

export const TraitForm = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
`;

export const ModalActions = styled.div`
	display: flex;
	gap: 10px;
	justify-content: flex-end;
	margin-top: 10px;
`;
