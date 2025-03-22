# AOS Commands Reference

This guide provides a comprehensive reference for interacting with Bazar using AOS (Arweave Operating System) commands. AOS allows you to manage your assets and collections directly through the Arweave network.

## Asset Management

### List an Asset for Sale

To list an asset for sale on Bazar:

```lua
Send({
  Target = "ASSET_CONTRACT_ID",
  Action = "List",
  Tags = {
    Price = "1000000",  -- Price in Winston
    Percentage = "10"   -- Royalty percentage (1-100)
  }
})
```

- `ASSET_CONTRACT_ID`: The contract ID of your asset
- `Price`: The listing price in Winston (1 AR = 1000000000000 Winston)
- `Percentage`: Royalty percentage for secondary sales (1-100)

### Unlist an Asset

To remove an asset listing from Bazar:

```lua
Send({
  Target = "ASSET_CONTRACT_ID",
  Action = "Unlist"
})
```

### Transfer an Asset

To transfer an asset to another address:

```lua
Send({
  Target = "ASSET_CONTRACT_ID",
  Action = "Transfer",
  Tags = {
    Recipient = "RECIPIENT_ADDRESS"
  }
})
```

- `RECIPIENT_ADDRESS`: The Arweave wallet address of the recipient

### View Asset Owners

To retrieve all owners of an asset:

```lua
Send({
  Target = "ASSET_CONTRACT_ID",
  Action = "Get-Owners"
})
```

## Collection Management

### Create a Collection

To create a new collection on Bazar:

```lua
Send({
  Target = "COLLECTIONS_REGISTRY",
  Action = "Add-Collection",
  Tags = {
    Title = "My Collection",
    Description = "Collection Description",
    Banner = "BANNER_TX_ID",      -- Optional
    Thumbnail = "THUMBNAIL_TX_ID" -- Optional
  }
})
```

### Remove a Collection

To remove a collection (must be either the collection creator or collection owner):

```lua
Send({
  Target = "COLLECTIONS_REGISTRY",
  Action = "Remove-Collection",
  Tags = {
    CollectionId = "COLLECTION_ID"
  }
})
```

The `Remove-Collection` action is available to:

- The collection creator (who initially created the collection)
- The collection owner (who currently owns the collection)
- The process owner (administrator)

This allows for proper management of collections by both creators and owners.

### View Collection Owners

To retrieve all owners from a collection:

```lua
Send({
  Target = "COLLECTION_CONTRACT_ID",
  Action = "Get-Collection-Owners"
})
```

## Best Practices

1. **Contract IDs**: Always double-check contract IDs before sending transactions
2. **Prices**: Remember that prices are in Winston (1 AR = 1000000000000 Winston)
3. **Permissions**: Some actions (like removing collections) require specific permissions
4. **Testing**: Consider testing with small amounts first when dealing with financial transactions

## Error Handling

Common error responses and their meanings:

- `Invalid Price`: The price value is not a valid number
- `Invalid Percentage`: Royalty percentage must be between 1 and 100
- `Not Authorized`: You don't have permission to perform this action
- `Asset Not Found`: The specified asset contract ID doesn't exist
- `Collection Not Found`: The specified collection ID doesn't exist

## Tips

1. **Wallet Balance**: Ensure your wallet has enough AR to cover transaction fees
2. **Confirmation**: Wait for transaction confirmation before considering it complete
3. **Permissions**: Keep track of which assets and collections you own or manage
4. **Documentation**: Refer to this documentation when constructing AOS commands

For more detailed information about Bazar and its features, check out our other documentation sections.
