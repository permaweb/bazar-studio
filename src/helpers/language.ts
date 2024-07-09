import { MAX_UPLOAD_SIZE } from './config';
import { getByteSizeDisplay } from './utils';

export const language = {
	en: {
		about: `About`,
		actions: `Actions`,
		addTopic: `Add topic`,
		addComment: `Add a comment`,
		amount: `Amount`,
		arBalance: `AR Balance`,
		arweaveAppUploadBlocked: `Arweave.app is not supported for upload`,
		assets: `Assets`,
		assetsCreated: `Assets created`,
		assetsCreatedInfo: `Your assets have been created. You will now be able to view them from your profile.`,
		assetDetails: `Asset details`,
		assetExists: `An asset with this name already exists`,
		assetFetchConnectionRequired: `Connect a wallet to view your assets`,
		assetInfoNote: `Note: Details entered below will only apply to newly created assets, existing assets will not be modified.`,
		assetTopics: `Asset topics`,
		assetLicenseCheck: `This asset will contain a license`,
		assetRights: `Asset Rights`,
		assetStamped: `Asset stamped`,
		assetUploaded: `Asset uploaded`,
		assetUploading: `Uploading Asset`,
		assetUploadingInfo: (collection: boolean) =>
			`Your assets are being uploaded, this will take some time. Please stay on this screen.${
				collection ? ' Once all of the assets are uploaded, your collection will be created.' : ''
			}`,
		atomicAssets: `Atomic Assets`,
		back: `Back`,
		banner: `Banner`,
		bannerInfo: `Upload a banner image to display at the top of the collection. (Recommended size: 16:9 aspect ratio, 1920 x 1080 pixels).`,
		bio: `Bio`,
		cancel: `Cancel`,
		calculating: `Calculating`,
		channel: `Channel`,
		channelDetails: `Channel details`,
		channelTitle: `Channel Title`,
		charLimitReached: `Character Limit Reached`,
		checks: `Checks`,
		chooseExistingAssets: `Choose existing assets`,
		clear: `Clear`,
		close: `Close`,
		collection: `Collection`,
		collections: `Collections`,
		collectionCode: `Collection code`,
		collectionCodeInfo: `A collection code is a unique identifier for your collection. It can be used to identify which collection an asset belongs to in other applications.`,
		collectionCreated: `Collection created`,
		collectionDetails: `Collection details`,
		collectionExists: `A collection with this title already exists`,
		collectionUploadedInfo: `Your collection has been created ! You can view it directly in BazAR by clicking View collection below.`,
		comment: `Comment`,
		comments: `Comments`,
		community: `Community`,
		complete: `Complete`,
		contentTokens: `Fractional tokens`,
		contentTokensInfo: `Atomic assets can be fractionalized by inputting a number greater than one. This enables multiple users to own fractions of the same atomic asset.`,
		contentTokensCheckInfo: `These assets will use fractionalized tokens`,
		conversion: `Conversion`,
		connect: `Connect`,
		connectToContinue: `Connect your wallet to continue`,
		connectWallet: `Connect Wallet`,
		connectorNotFound: `Connector not found`,
		copied: `Copied`,
		copyURL: `Copy URL`,
		copyWalletAddress: `Copy wallet address`,
		createAtomicAssets: `Create atomic assets`,
		createACollection: `Create a collection`,
		createListings: `Create listings`,
		createProfile: `Create your profile`,
		customAmount: `Custom Amount`,
		customAmountTurboInfo: `min $5 - max $10,000`,
		description: `Description`,
		details: `Details`,
		disconnect: `Disconnect`,
		dismiss: `Dismiss`,
		docs: `Docs`,
		download: `Download`,
		downloading: `Downloading`,
		editDescription: `Edit description`,
		editProfile: `Edit profile`,
		editTitle: `Edit title`,
		errorOccurred: `Error occurred`,
		existingAssets: `Existing`,
		fetch: `Fetch`,
		fetching: `Fetching`,
		fileExceedsLimit: `One or more files exceeds max ${getByteSizeDisplay(MAX_UPLOAD_SIZE)}`,
		fileName: `Filename`,
		filesSelected: `Files selected`,
		follow: `Follow`,
		followed: (address: string) => `Followed ${address}`,
		follower: `Follower`,
		followers: `Followers`,
		following: `Following`,
		fullScreen: `Full screen`,
		fund: `Fund`,
		fundTurboBalance: `Fund Turbo Balance`,
		fundTurboBalanceInfoHeader: `Buy Credits`,
		fundTurboBalanceInfoDetail: `Credits will be automatically added to your Turbo balance, and you can start using them right away.`,
		fundTurboPaymentHeader: `Complete Payment`,
		fundTurboPaymentDetail: `Payments are powered by ArDrive Turbo, and handled securely by Stripe.`,
		goToPayment: `Go to payment`,
		handle: `Handle`,
		home: `Home`,
		insufficientBalance: `Insufficient Upload Balance`,
		invalidAmountTurbo: `Amount must be between $5 - $10,000`,
		invalidContentTokens: `Value must be between 0 - 1,000,000`,
		inProgress: `In progress`,
		length: `Length`,
		license: `License`,
		licenseTags: {
			addTerms: `Add Terms`,
			access: {
				label: `Access Fee`,
				options: {
					none: `None`,
					oneTime: `One Time`,
				},
			},
			commercialUse: {
				label: `Commercial Use`,
				options: {
					disallowed: `Disallowed`,
					allowed: `Allowed`,
					suboptions: {
						revenueShare: `With Revenue Share`,
						monthlyFee: `With Monthly Fee`,
						oneTimeFee: `With One-Time Fee`,
					},
				},
			},
			dataModelTraining: {
				label: `Data Model Training`,
				options: {
					disallowed: `Disallowed`,
					allowed: `Allowed`,
					suboptions: {
						monthlyFee: `With Monthly Fee`,
						oneTimeFee: `With One-Time Fee`,
					},
				},
			},
			derivations: {
				label: `Derivations`,
				options: {
					disallowed: `Disallowed`,
					allowed: `Allowed`,
					suboptions: {
						credit: `With Credit`,
						indication: `With Indication`,
						licensePassthrough: `With License Passthrough`,
						revenueShare: `With Revenue Share`,
						monthlyFee: `With Monthly Fee`,
						oneTimeFee: `With One-Time Fee`,
					},
				},
			},
			paymentMode: {
				label: `Payment Mode`,
				single: `Single`,
				random: `Random`,
				global: `Global`,
			},
		},
		listingPercentage: `Listing percentage (1 - 100%)`,
		listingPercentageInfo: `This value represents the percentage of available content tokens to list for sale.`,
		listingPrice: `Unit price (Wrapped AR)`,
		listingPriceInfo: `This value represents the unit price for each asset that will be listed in the UCM.`,
		listingsCreated: (start: number, end: number) => `(${start} of ${end}) listings created`,
		listingsCreating: `Creating listings`,
		loading: `Loading`,
		max: `Max`,
		maxCharsReached: `Max chars reached`,
		miniplayer: `Miniplayer`,
		mute: `Mute`,
		name: `Name`,
		next: `Next`,
		noAssets: `No assets`,
		noAssetsInfo: `Assets you create or receive will appear here`,
		noAssetsSelected: `No assets selected for upload`,
		noBio: `No bio`,
		noCollections: `No collections`,
		noCollectionsInfo: `Collections you create will appear here`,
		noResults: `No Results`,
		pageNotFound: `Page Not Found`,
		pause: `Pause`,
		payLicense: `Pay License`,
		paymentInformation: `Payment`,
		play: `Play`,
		playingPiP: `Playing in picture-in-picture`,
		posted: `Posted`,
		postYourReply: `Post your reply`,
		previous: `Previous`,
		previewContent: `Preview content`,
		profile: `Profile`,
		profileCreated: `Profile created`,
		profileCreatedInfo: `Your profile has been created, welcome to Helix ! You can visit your profile directly by clicking View profile below.`,
		profileCreatingInfo: `Creating profile`,
		profileExists: `Profile Exists`,
		profileExistsInfo: `It looks like you already have an account ! You can visit your profile directly by clicking View profile below.`,
		profileRequired: `A profile is required for upload`,
		profileUpdated: `Profile updated`,
		profileUpdatedInfo: `Your profile has been updated.`,
		readDocs: `Read docs`,
		recipient: `Recipient`,
		removeAvatar: `Remove avatar`,
		removeBanner: `Remove banner`,
		removeFile: `Remove file`,
		reply: `Reply`,
		returnToWindow: `Return to window`,
		save: `Save`,
		search: `Search`,
		select: `Select`,
		selectFiles: `Select files to upload`,
		selected: `Selected`,
		showingAssets: `Showing assets`,
		showingFiles: `Showing files`,
		signUp: `Sign up`,
		signUpRequired: `Sign up required`,
		signUpRequiredInfo: `You must create an account to continue`,
		share: `Share`,
		shareOn: `Share on`,
		show: `Show`,
		siteTitle: `Helix`,
		size: `Size`,
		stamp: `Stamp`,
		stamped: `Stamped`,
		submit: `Submit`,
		successfullyFunded: `Successfully funded`,
		supportedFileTypes: `Any file type is supported for upload. The current upload size limit per file is ${getByteSizeDisplay(
			MAX_UPLOAD_SIZE
		)}.`,
		terms: `Terms`,
		title: `Title`,
		titleNotFound: `Title not found`,
		thumbnail: `Thumbnail`,
		thumbnailInfo: `Upload a thumbnail image for the collection. (Recommended size: 1:1 aspect ratio, 300 x 300 pixels).`,
		thumbnailDescription: `Upload an image that represents your collection`,
		toggleTheme: `Toggle theme`,
		totalAssets: `Total`,
		topic: `Topic`,
		topics: `Topics`,
		topicInfo: `Topics will be attached to newly created assets`,
		toUpload: `To upload`,
		transferableTokensCheckInfo: `These assets will be transferable`,
		turboBalance: `Turbo Balance`,
		turboUploadCost: `Turbo upload cost`,
		udl: `Universal Data License`,
		unmute: `Unmute`,
		upload: `Upload`,
		uploading: `Uploading`,
		uploadAvatar: `Upload avatar`,
		uploadCost: `Upload cost`,
		uploadBanner: `Upload banner`,
		uploadConnectionRequired: `Wallet connection required for upload`,
		uploadChecksCostInfo: `Select files to upload to determine total upload cost`,
		uploadChecksCostTurboInfo: `Select Fetch to view your turbo balance`,
		uploadFiles: `Upload files`,
		uploadStatus: `Upload status`,
		uploadStepsInfo: `File Selected. Complete remaining steps to begin uploading`,
		uploadThumbnail: `Upload thumbnail`,
		uploadThumbnailInfo: `Pause the video at any point and click Upload to generate a thumbnail`,
		uploadingFileCount: (start: number, end: number) => `Uploading file: ${start} of ${end}`,
		useHandleForChannel: `Use Handle for Channel Title`,
		useScreenshot: `Use screenshot from content`,
		validating: `Validating`,
		valueAboveZero: `Value must be greater than 0`,
		valuePercentage: `Value must be between 1 and 100`,
		video: `Video`,
		videos: `Videos`,
		viewAdvancedOptions: `View advanced options`,
		viewAsset: `View Asset`,
		viewCollection: `View collection`,
		viewFullBio: `View full bio`,
		viewLicense: `View License`,
		viewOnBazar: `View on BazAR`,
		viewProfile: `View profile`,
		waitingToUpload: `Waiting to upload`,
		yourBalance: `Your balance`,
	},
};
