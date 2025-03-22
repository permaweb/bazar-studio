export const AOS_SNIPPETS = {
	listAsset: {
		title: 'List Asset in AOS',
		description: 'To list an asset for sale using AOS directly, use this command:',
		code: `Send({
  Target = "ASSET_CONTRACT_ID",
  Action = "List",
  Tags = {
    Price = "1000000",  -- Price in Winston
    Percentage = "10"   -- Royalty percentage
  }
})`,
	},
	unlistAsset: {
		title: 'Unlist Asset in AOS',
		description: 'To remove an asset listing using AOS directly, use this command:',
		code: `Send({
  Target = "ASSET_CONTRACT_ID",
  Action = "Unlist"
})`,
	},
	transferAsset: {
		title: 'Transfer Asset in AOS',
		description: 'To transfer an asset to another address using AOS directly, use this command:',
		code: `Send({
  Target = "ASSET_CONTRACT_ID",
  Action = "Transfer",
  Tags = {
    Recipient = "RECIPIENT_ADDRESS"
  }
})`,
	},
	getAssetOwners: {
		title: 'Get Asset Owners in AOS',
		description: 'To retrieve all owners of an asset using AOS directly, use this command:',
		code: `Send({
  Target = "ASSET_CONTRACT_ID",
  Action = "Get-Owners"
})`,
	},
	getCollectionOwners: {
		title: 'Get Collection Owners in AOS',
		description: 'To retrieve all owners from a collection using AOS directly, use this command:',
		code: `Send({
  Target = "COLLECTION_CONTRACT_ID",
  Action = "Get-Collection-Owners"
})`,
	},
	createCollection: {
		title: 'Create Collection in AOS',
		description: 'To create a new collection using AOS directly, use this command:',
		code: `Send({
  Target = "COLLECTIONS_REGISTRY",
  Action = "Add-Collection",
  Tags = {
    Title = "My Collection",
    Description = "Collection Description",
    Banner = "BANNER_TX_ID",      -- Optional
    Thumbnail = "THUMBNAIL_TX_ID" -- Optional
  }
})`,
	},
	removeCollection: {
		title: 'Remove Collection in AOS',
		description: 'To remove a collection using AOS directly (must be collection creator), use this command:',
		code: `Send({
  Target = "COLLECTIONS_REGISTRY",
  Action = "Remove-Collection",
  Tags = {
    CollectionId = "COLLECTION_ID"
  }
})`,
	},
};
