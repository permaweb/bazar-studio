import { DefaultTheme } from 'styled-components';

export const lightTheme = {
	scheme: 'light',
	positive1: '#64B686',
	positive2: '#4EA673',
	negative1: '#E94278',
	negative2: '#E52461',
	neutral1: '#FFFFFF',
	neutral2: '#F6F6F6',
	neutral3: '#D6D6D6',
	neutral4: '#C9C9C9',
	neutral5: '#CCCCCC',
	neutral6: '#F7F7F7',
	neutral7: '#FAFAFA',
	neutral8: '#EEEEEE',
	neutralA1: '#0A0A0A',
	neutralA2: '#5F5F5F',
	neutralA3: '#5C5C5C',
	neutralA4: '#313131',
	neutralA5: '#A4A4A4',
	neutralA6: '#A9A9A9',
	neutralA7: '#F0F0F0',
	overlay1: 'rgb(30, 30, 30, .65)',
	primary1: '#F96E46',
	primary2: '#E6562C',
	semiTransparent1: 'rgba(255, 255, 255, 0.575)',
	semiTransparent2: 'rgba(40, 40, 40, 0.575)',
	semiTransparent3: 'rgba(0, 0, 0, 0.55)',
	semiTransparent4: '#AEAEAE45',
	semiTransparent5: 'rgb(250, 250, 250, 0)',
	light1: '#FFFFFF',
	light2: '#DADADA',
	dark1: '#151515',
	dark2: '#333333',
	stats: {
		primary: '#FF8385',
		alt1: '#A3DEE2',
		alt2: '#B9B8D0',
		alt3: '#8FC2D3',
		alt4: '#6CB9D9',
		alt5: '#8886D9',
		alt6: '#FFBD9F',
		alt7: '#A8DDE2',
		alt8: '#F2A9D3',
		alt9: '#6D909E',
		alt10: '#BFBFBF',
	},
};

export const darkTheme = {
	scheme: 'dark',
	positive1: '#38BD80',
	positive2: '#2F9D6A',
	labelAlt1: `#FFFFFF`,
	negative1: '#D81E5B',
	negative2: '#E43A72',
	neutral1: '#1A1A1A',
	neutral2: '#202020',
	neutral3: '#333333',
	neutral4: '#5C5C5C',
	neutral5: '#A4A4A4',
	neutral6: '#A9A9A9',
	neutral7: '#CCCCCC',
	neutral8: '#272727',
	neutralA1: '#FFFFFF',
	neutralA2: '#F1F1F1',
	neutralA3: '#E0E0E0',
	neutralA4: '#DEDEDE',
	neutralA5: '#CCCCCC',
	neutralA6: '#FAFAFA',
	neutralA7: '#151515',
	overlay1: 'rgba(10, 10, 10, 0.65)',
	primary1: '#F96E46',
	primary2: '#E6562C',
	semiTransparent1: 'rgba(0, 0, 0, 0.15)',
	semiTransparent2: 'rgba(0, 0, 0, 0.65)',
	semiTransparent3: 'rgba(20, 20, 20, 0.75)',
	semiTransparent4: '#AEAEAE45',
	semiTransparent5: 'rgba(0, 0, 0, 0.5)',
	light1: '#FFFFFF',
	light2: '#DADADA',
	dark1: '#151515',
	dark2: '#333333',
	stats: {
		primary: '#FF8080',
		alt1: '#9BD4E0',
		alt2: '#C2C1E6',
		alt3: '#7AB3D0',
		alt4: '#6AC3E7',
		alt5: '#A1A0E6',
		alt6: '#FFC1A1',
		alt7: '#A5E0E8',
		alt8: '#F29CC8',
		alt9: '#6794AA',
		alt10: '#444444',
	},
};

export const theme = (currentTheme: any): DefaultTheme => ({
	scheme: currentTheme.scheme,
	colors: {
		border: {
			primary: currentTheme.neutral4,
			alt1: currentTheme.primary1,
			alt2: currentTheme.neutralA6,
			alt3: currentTheme.neutral5,
			alt4: currentTheme.neutral8,
		},
		button: {
			primary: {
				background: currentTheme.neutral2,
				border: currentTheme.neutral2,
				color: currentTheme.neutralA1,
				active: {
					background: currentTheme.neutral3,
					border: currentTheme.neutral3,
					color: currentTheme.neutralA1,
				},
				disabled: {
					background: currentTheme.neutral4,
					border: currentTheme.neutral5,
					color: currentTheme.neutralA5,
				},
			},
			alt1: {
				background: currentTheme.primary1,
				border: currentTheme.primary1,
				color: currentTheme.light1,
				active: {
					background: currentTheme.primary2,
					border: currentTheme.primary2,
					color: currentTheme.light1,
				},
				disabled: {
					background: currentTheme.neutral4,
					border: currentTheme.neutral5,
					color: currentTheme.neutralA5,
				},
			},
			alt2: {
				background: currentTheme.neutralA1,
				border: currentTheme.neutralA1,
				color: currentTheme.neutralA1,
				active: {
					background: currentTheme.neutralA4,
					border: currentTheme.neutralA4,
					color: currentTheme.neutralA4,
				},
				disabled: {
					background: currentTheme.neutral4,
					border: currentTheme.neutral3,
					color: currentTheme.neutralA2,
				},
			},
		},
		checkbox: {
			active: {
				background: currentTheme.primary2,
			},
			background: currentTheme.neutral1,
			hover: currentTheme.neutral3,
			disabled: currentTheme.neutral5,
		},
		container: {
			primary: {
				background: currentTheme.neutral1,
				active: currentTheme.neutral2,
			},
			alt1: {
				background: currentTheme.neutral3,
			},
			alt2: {
				background: currentTheme.neutral2,
			},
			alt3: {
				background: currentTheme.neutral2,
			},
			alt4: {
				background: currentTheme.neutral2,
			},
			alt5: {
				background: currentTheme.neutralA4,
			},
			alt6: {
				background: currentTheme.primary1,
			},
			alt7: {
				background: currentTheme.neutralA3,
			},
			alt8: {
				background: currentTheme.dark1,
			},
			alt9: {
				background: currentTheme.primary1,
			},
			alt10: {
				background: currentTheme.primary2,
			},
		},
		font: {
			primary: currentTheme.neutralA1,
			alt1: currentTheme.neutralA4,
			alt2: currentTheme.neutralA4,
			alt3: currentTheme.neutral5,
			alt4: currentTheme.neutral1,
			alt5: currentTheme.primary2,
			light1: currentTheme.light1,
			dark1: currentTheme.dark1,
		},
		form: {
			background: currentTheme.neutral1,
			border: currentTheme.neutral4,
			invalid: {
				outline: currentTheme.negative1,
				shadow: currentTheme.negative2,
			},
			valid: {
				outline: currentTheme.primary1,
				shadow: currentTheme.primary2,
			},
			disabled: {
				background: currentTheme.neutral2,
				border: currentTheme.neutral5,
				label: currentTheme.neutralA2,
			},
		},
		gradient: {
			start: currentTheme.primary1,
			middle: currentTheme.accent1,
			end: currentTheme.accent2,
		},
		icon: {
			primary: {
				fill: currentTheme.neutralA1,
				active: currentTheme.neutral4,
				disabled: currentTheme.neutralA3,
			},
			alt1: {
				fill: currentTheme.neutral1,
				active: currentTheme.semiTransparent4,
				disabled: currentTheme.neutral3,
			},
			alt2: {
				fill: currentTheme.neutralA1,
				active: currentTheme.neutral2,
				disabled: currentTheme.neutral3,
			},
			alt3: {
				fill: currentTheme.neutralA2,
				active: currentTheme.neutral1,
				disabled: currentTheme.neutral3,
			},
		},
		indicator: {
			primary: currentTheme.primary2,
		},
		link: {
			color: currentTheme.neutralA1,
			active: currentTheme.neutralA1,
		},
		loader: {
			primary: currentTheme.primary2,
		},
		overlay: {
			primary: currentTheme.overlay1,
			alt1: currentTheme.semiTransparent2,
			alt2: currentTheme.semiTransparent3,
			alt3: currentTheme.semiTransparent1,
		},
		row: {
			active: {
				background: currentTheme.neutral3,
				border: currentTheme.neutral2,
			},
			hover: {
				background: currentTheme.neutral2,
			},
		},
		scrollbar: {
			thumb: currentTheme.neutral3,
		},
		shadow: {
			primary: currentTheme.semiTransparent5,
			alt1: currentTheme.neutralA1,
		},
		view: {
			background: currentTheme.neutral1,
		},
		video: {
			buffered: currentTheme.neutral4,
			unbuffered: currentTheme.semiTransparent4,
			watched: currentTheme.primary1,
		},
		warning: currentTheme.negative1,
	},
	typography: {
		family: {
			primary: `'Inter', sans-serif`,
			alt1: `'Quantico', sans-serif`,
		},
		size: {
			xxxSmall: '12px',
			xxSmall: '13px',
			xSmall: '14px',
			small: '15px',
			base: '16px',
			lg: '18px',
		},
		weight: {
			medium: '500',
			bold: '600',
			xBold: '700',
			xxBold: '800',
		},
	},
});
