import styled from 'styled-components';

export const Tooltip = styled.div<{ useBottom: boolean }>`
	position: absolute;
	top: ${(props) => (props.useBottom ? 'auto' : '-25px')};
	bottom: ${(props) => (props.useBottom ? '-25px' : 'auto')};
	left: 50%;
	transform: translate(-50%, 0);
	z-index: 1;
	display: none;
`;

export const Wrapper = styled.div`
	position: relative;
	width: fit-content;
	&:hover {
		${Tooltip} {
			display: block;
		}
	}
`;

export const Primary = styled.button<{
	dimensions: { wrapper: number; icon: number } | undefined;
	sm: boolean | undefined;
	warning: boolean | undefined;
	disabled: boolean | undefined;
	active: boolean | undefined;
}>`
	height: ${(props) => (props.dimensions ? `${props.dimensions.wrapper.toString()}px` : `42.5px`)};
	width: ${(props) => (props.dimensions ? `${props.dimensions.wrapper.toString()}px` : `42.5px`)};
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 4.5px 0 0 0;
	pointer-events: ${(props) => (props.disabled ? 'none' : 'all')};
	border-radius: 50%;

	svg {
		height: ${(props) => (props.dimensions ? `${props.dimensions.icon.toString()}px` : `24.5px`)};
		width: ${(props) => (props.dimensions ? `${props.dimensions.icon.toString()}px` : `24.5px`)};
		fill: ${(props) =>
			props.disabled
				? props.theme.colors.icon.primary.disabled
				: props.active
				? props.theme.colors.icon.primary.fill
				: props.theme.colors.icon.primary.fill};
	}
	&:hover {
		background: ${(props) => props.theme.colors.icon.primary.active};
	}
`;

export const Alt1 = styled(Primary)`
	svg {
		height: ${(props) => (props.dimensions ? `${props.dimensions.icon.toString()}px` : `24.5px`)};
		width: ${(props) => (props.dimensions ? `${props.dimensions.icon.toString()}px` : `24.5px`)};
		fill: ${(props) =>
			props.disabled
				? props.theme.colors.icon.alt1.disabled
				: props.active
				? props.theme.colors.icon.alt1.fill
				: props.theme.colors.icon.alt1.fill};
	}

	&:hover {
		background: ${(props) => props.theme.colors.icon.alt1.active};
	}
`;
