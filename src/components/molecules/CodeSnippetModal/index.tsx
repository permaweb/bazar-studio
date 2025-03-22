import React from 'react';

import { Button } from '../../atoms/Button';
import { Panel } from '../Panel';

import * as S from './styles';

interface CodeSnippetModalProps {
	title: string;
	description: string;
	code: string;
	open: boolean;
	onClose: () => void;
}

export function CodeSnippetModal({ title, description, code, open, onClose }: CodeSnippetModalProps) {
	const [copied, setCopied] = React.useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<Panel open={open} width={600} header={title} handleClose={onClose}>
			<S.Container>
				<S.Description>
					{description}{' '}
					<a href="#/docs/aos/commands" target="_blank" rel="noopener noreferrer">
						View full AOS documentation
					</a>
				</S.Description>
				<S.CodeBlock>
					<pre>
						<code>{code}</code>
					</pre>
					<S.CopyButton onClick={handleCopy}>{copied ? 'Copied!' : 'Copy'}</S.CopyButton>
				</S.CodeBlock>
				<Button type="primary" label="Close" handlePress={onClose} />
			</S.Container>
		</Panel>
	);
}
