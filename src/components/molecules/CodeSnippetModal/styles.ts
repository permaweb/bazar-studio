import styled from 'styled-components';

export const Container = styled.div`
	padding: 20px;
`;

export const Description = styled.p`
	color: var(--text-primary);
	margin-bottom: 15px;
	line-height: 1.5;

	a {
		color: var(--accent-primary);
		text-decoration: none;
		margin-left: 5px;

		&:hover {
			text-decoration: underline;
		}
	}
`;

export const CodeBlock = styled.div`
	background: var(--background-secondary);
	border-radius: 4px;
	padding: 15px;
	position: relative;
	margin-bottom: 15px;

	pre {
		margin: 0;
		padding-right: 70px;
	}

	code {
		color: var(--text-primary);
		font-family: monospace;
		white-space: pre-wrap;
		word-break: break-all;
	}
`;

export const CopyButton = styled.button`
	position: absolute;
	top: 10px;
	right: 10px;
	background: var(--accent-primary);
	color: var(--text-inverse);
	border: none;
	border-radius: 4px;
	padding: 5px 10px;
	cursor: pointer;
	font-size: 14px;
	transition: background 0.2s;

	&:hover {
		background: var(--accent-primary-hover);
	}
`;
