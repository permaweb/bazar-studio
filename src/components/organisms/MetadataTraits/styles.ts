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
	display: flex;
	flex-direction: column;
	gap: 8px;

	span {
		font-size: ${(props) => props.theme.typography.size.small};
		color: ${(props) => props.theme.colors.font.alt1};
	}
`;

export const InfoNote = styled.div`
	span {
		font-size: 11px;
		color: #888;
		font-style: italic;
	}
`;

export const TraitsList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const TraitItem = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 12px;
	background: ${(props) => props.theme.colors.container.primary.background};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.radius.alt2};
`;

export const TraitContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
	flex: 1;
`;

export const TraitType = styled.span`
	font-size: 11px;
	font-weight: ${(props) => props.theme.typography.weight.medium};
	color: ${(props) => props.theme.colors.font.alt1};
	text-transform: uppercase;
	letter-spacing: 0.5px;
`;

export const TraitValue = styled.span`
	font-size: ${(props) => props.theme.typography.size.small};
	font-weight: ${(props) => props.theme.typography.weight.bold};
	color: ${(props) => props.theme.colors.font.primary};
`;

export const EmptyState = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 20px;
	background: ${(props) => props.theme.colors.container.alt3.background};
	border: 1px dashed ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.radius.alt2};

	span {
		font-size: ${(props) => props.theme.typography.size.small};
		color: ${(props) => props.theme.colors.font.alt1};
		text-align: center;
	}
`;

export const ModalWrapper = styled.form`
	display: flex;
	flex-direction: column;
	gap: 20px;
	padding: 20px;
`;

export const ModalActions = styled.div`
	display: flex;
	gap: 10px;
	justify-content: flex-end;
	margin-top: 10px;
`;

export const TemplatesSection = styled.div`
	margin-top: 20px;
	padding-top: 20px;
	border-top: 1px solid ${(props) => props.theme.colors.border.primary};
`;

export const TemplatesHeader = styled.div`
	margin-bottom: 15px;

	span {
		font-size: ${(props) => props.theme.typography.size.small};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) => props.theme.colors.font.primary};
	}
`;

export const TemplatesInfo = styled.div`
	margin-top: 5px;

	span {
		font-size: 11px;
		color: ${(props) => props.theme.colors.font.alt1};
	}
`;

export const TemplatesList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

export const TemplateItem = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
	padding: 8px 12px;
	background: ${(props) => props.theme.colors.container.alt3.background};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.radius.alt2};
`;

export const TemplateType = styled.span`
	font-size: 10px;
	font-weight: ${(props) => props.theme.typography.weight.medium};
	color: ${(props) => props.theme.colors.font.alt1};
	text-transform: uppercase;
	letter-spacing: 0.5px;
	min-width: 80px;
	flex-shrink: 0;
`;

export const TemplateValues = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 4px;
	align-items: center;
`;

export const TemplateValue = styled.button`
	padding: 3px 6px;
	background: ${(props) => props.theme.colors.container.alt3.background};
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.radius.alt2};
	font-size: 10px;
	color: ${(props) => props.theme.colors.font.primary};
	cursor: pointer;
	transition: all 0.2s ease;
	white-space: nowrap;

	&:hover {
		background: ${(props) => props.theme.colors.container.primary.background};
		border-color: ${(props) => props.theme.colors.border.alt1};
	}
`;

export const TemplateValueEdit = styled.button`
	padding: 3px 6px;
	background: ${(props) => props.theme.colors.container.primary.background};
	border: 1px dashed ${(props) => props.theme.colors.border.primary};
	border-radius: ${STYLING.dimensions.radius.alt2};
	font-size: 10px;
	color: ${(props) => props.theme.colors.font.alt1};
	cursor: pointer;
	transition: all 0.2s ease;
	white-space: nowrap;
	font-style: italic;

	&:hover {
		background: ${(props) => props.theme.colors.container.alt3.background};
		border-color: ${(props) => props.theme.colors.border.alt1};
		color: ${(props) => props.theme.colors.font.primary};
	}
`;
