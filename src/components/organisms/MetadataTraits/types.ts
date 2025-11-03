export interface IProps {
	traits: Array<{
		trait_type: string;
		value: string;
	}>;
	onAddTrait: (trait: { trait_type: string; value: string }) => void;
	onRemoveTrait: (index: number) => void;
	assetCount?: number;
	showTemplates?: boolean;
	existingTraits?: Array<{
		trait_type: string;
		values: string[];
	}>;
	onApplyTemplate?: (templateTraits: Array<{ trait_type: string; value: string }>) => void;
}
