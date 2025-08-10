export interface IProps {
	assets: Array<{
		file: any;
		title: string;
		description: string;
		coverArt?: string;
		traits?: Array<{
			trait_type: string;
			value: string;
		}>;
	}>;
	onApplyToAssets: (assetNames: string[], trait: { trait_type: string; value: string }) => void;
}
