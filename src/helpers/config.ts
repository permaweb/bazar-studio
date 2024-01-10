import actionMenu from 'assets/action-menu.svg';
import add from 'assets/add.svg';
import arweaveApp from 'assets/ar-logo.svg';
import arconnect from 'assets/arconnect-wallet-logo.png';
import arrow from 'assets/arrow.svg';
import arrowNextSVG from 'assets/arrow-next.svg';
import arrowPreviousSVG from 'assets/arrow-previous.svg';
import asset from 'assets/asset.svg';
import bazar from 'assets/bazar.svg';
import checkmark from 'assets/checkmark.svg';
import close from 'assets/close.svg';
import comments from 'assets/comments.svg';
import copy from 'assets/copy.svg';
import details from 'assets/details.svg';
import download from 'assets/download.svg';
import following from 'assets/following.svg';
import fullScreen from 'assets/fullscreen.svg';
import image from 'assets/image.svg';
import info from 'assets/info.svg';
import landing from 'assets/landing.svg';
import link from 'assets/link.svg';
import logo from 'assets/logo.svg';
import menu from 'assets/menu.svg';
import miniPlayerActive from 'assets/miniplayer-active.svg';
import miniPlayerInactive from 'assets/miniplayer-inactive.svg';
import pause from 'assets/pause.svg';
import play from 'assets/play.svg';
import search from 'assets/search.svg';
import share from 'assets/share.svg';
import stamp from 'assets/stamp.svg';
import u from 'assets/u.svg';
import upload from 'assets/upload.svg';
import uploadGraphic from 'assets/upload-graphic.riv';
import user from 'assets/user.svg';
import volumeActive from 'assets/volume-active.svg';
import volumeInactive from 'assets/volume-inactive.svg';
import wallet from 'assets/wallet.svg';
import x from 'assets/x.svg';

import { UploadStepType, WalletEnum } from './types';

export const APP = {
	name: 'Odysee',
};

export const ASSETS = {
	actionMenu: actionMenu,
	add: add,
	arrow: arrow,
	arrowNext: arrowNextSVG,
	arrowPrevious: arrowPreviousSVG,
	asset: asset,
	bazar: bazar,
	checkmark: checkmark,
	close: close,
	comments: comments,
	copy: copy,
	details: details,
	download: download,
	following: following,
	fullScreen: fullScreen,
	image: image,
	info: info,
	landing: landing,
	link: link,
	logo: logo,
	menu: menu,
	miniPlayerActive: miniPlayerActive,
	miniPlayerInactive: miniPlayerInactive,
	pause: pause,
	play: play,
	search: search,
	share: share,
	stamp: stamp,
	u: u,
	upload: upload,
	uploadGraphic: uploadGraphic,
	user: user,
	volumeActive: volumeActive,
	volumeInactive: volumeInactive,
	wallet: wallet,
	wallets: {
		arconnect: arconnect,
		arweaveApp: arweaveApp,
	},
	x: x,
};

export const TAGS = {
	keys: {
		ans110: {
			title: 'Title',
			description: 'Description',
			topic: 'Topic:*',
			type: 'Type',
			implements: 'Implements',
			license: 'License',
		},
		appName: 'App-Name',
		appVersion: 'App-Version',
		avatar: 'Avatar',
		banner: 'Banner',
		channelTitle: 'Channel-Title',
		collectionCode: 'Collection-Code',
		contentLength: 'Content-Length',
		contentType: 'Content-Type',
		contractManifest: 'Contract-Manifest',
		contractSrc: 'Contract-Src',
		creator: 'Creator',
		dataProtocol: 'Data-Protocol',
		dataSource: 'Data-Source',
		dateCreated: 'Date-Created',
		handle: 'Handle',
		initState: 'Init-State',
		initialOwner: 'Initial-Owner',
		license: 'License',
		name: 'Name',
		profileIndex: 'Profile-Index',
		protocolName: 'Protocol-Name',
		renderWith: 'Render-With',
		smartweaveAppName: 'App-Name',
		smartweaveAppVersion: 'App-Version',
		target: 'Target',
		thumbnail: 'Thumbnail',
		topic: (topic: string) => `topic:${topic}`,
		udl: {
			accessFee: 'Access-Fee',
			commercialUse: 'Commercial-Use',
			dataModelTraining: 'Data-Model-Training',
			derivations: 'Derivations',
			paymentAddress: 'Payment-Address',
			paymentMode: 'Payment-Mode',
		},
	},
	values: {
		ansVersion: 'ANS-110',
		appVersion: 'Odysee-v0.0.2',
		collection: 'Collection',
		comment: 'comment',
		contractManifest:
			'{"evaluationOptions":{"sourceType":"redstone-sequencer","allowBigInt":true,"internalWrites":true,"unsafeClient":"skip","useConstructor":true}}',
		document: 'Document',
		followDataProtocol: 'Follow',
		license: 'yRj4a5KMctX_uOmKWCFJIjmY8DeJcusVk6-HzLiM_t8',
		profileVersions: {
			'1': 'Account-0.3',
		},
		smartweaveAppName: 'SmartWeaveContract',
		smartweaveAppVersion: '0.3.0',
		ticker: 'ATOMIC ASSET',
		title: (title: string) => `${title}`,
	},
};

export const ASSET_CONTRACT = {
	src: 'Of9pi--Gj7hCTawhgxOwbuWnFI1h24TTgO5pw8ENJNQ',
};

export const TRADE_SOURCES = [ASSET_CONTRACT.src, 'h9v17KHV4SXwdW2-JHU6a23f6R0YtbXZJJht8LfP8QM'];

function createURLs() {
	const base = `/`;
	const profile = `${base}profile/`;
	return {
		base: base,
		asset: `${base}asset/`,
		following: `${base}following`,
		profile: profile,
		profileChannel: (address: string) => `${profile}${address}/channel/`,
		profileCommunity: (address: string) => `${profile}${address}/community/`,
		profileManage: `${profile}manage/`,
		signup: `${base}signup`,
		upload: `${base}upload/`,
	};
}

export const URLS = createURLs();

export const DOM = {
	loader: 'loader',
	notification: 'notification',
	overlay: 'overlay',
};

export const CURSORS = {
	p1: 'P1',
	end: 'END',
};

export const PAGINATORS = {
	default: 100,
	version: 8,
	assetTable: 10,
};

export const GATEWAYS = {
	arweave: 'arweave.net',
	goldsky: 'arweave-search.goldsky.com',
};

export const STYLING = {
	cutoffs: {
		initial: '1024px',
		max: '1400px',
		tablet: '840px',
		secondary: '540px',
	},
	dimensions: {
		button: {
			height: '32.5px',
			width: '150px',
		},
		form: {
			small: '42.5px',
			max: '47.5px',
		},
		nav: {
			headerHeight: '65px',
			panelWidthClosed: '85px',
			panelWidthOpen: '250px',
		},
		radius: {
			primary: '10px',
			alt1: '15px',
			alt2: '5px',
			alt3: '2.5px',
		},
	},
};

export const CONTENT_TYPES = {
	json: 'application/json',
	mp4: 'video/mp4',
	textPlain: 'text/plain',
};

export const AR_WALLETS = [{ type: WalletEnum.arConnect, logo: ASSETS.wallets.arconnect }];

export const WALLET_PERMISSIONS = ['ACCESS_ADDRESS', 'ACCESS_PUBLIC_KEY', 'SIGN_TRANSACTION', 'DISPATCH', 'SIGNATURE'];

export const STORAGE = {
	none: 'N/A',
};

export const AR_PROFILE = {
	defaultAvatar: 'OrG-ZG2WN3wdcwvpjz1ihPe4MI24QBJUpsJGIdL85wA',
	defaultBanner: 'a0ieiziq2JkYhWamlrUCHxrGYnHWUAMcONxRmfkWt-k',
};

export const DEFAULT_THUMBNAIL = 'nmEZucV8rT47rAh1gA3HO-PQTZ0qCKTS6oqUT4D09Pk';

export const COMMENT_SPEC = {
	protcolId: 'comment',
	renderWith: 'comment-renderers',
	ticker: 'ATOMIC ASSET - COMMENT',
};

export const API_CONFIG = {
	protocol: 'https',
	port: 443,
	timeout: 40000,
	logging: false,
};

export const UPLOAD_CONFIG = {
	node1: 'https://up.arweave.network',
	node2: 'https://turbo.ardrive.io',
	batchSize: 1,
	chunkSize: 7500000,
};

export const CONTRACT_CONFIG = {
	node: 'arweave',
};

export const UPLOAD_STEPS: UploadStepType[] = ['details', 'license', 'checks'];

export const DEFAULT_ASSET_TOPICS = [
	'music',
	'politics',
	'gaming',
	'crypto',
	'finance',
	'sports',
	'universe',
	'art',
	'education',
	'history',
	'comedy',
];

export const ALLOWED_THUMBNAIL_TYPES = 'image/png, image/jpeg, image/gif';
export const ALLOWED_BANNER_TYPES = 'image/png, image/jpeg, image/gif';
export const ALLOWED_AVATAR_TYPES = 'image/png, image/jpeg, image/gif';
export const ALLOWED_ASSET_TYPES = '*';
export const ALLOWED_ASSET_TYPES_DISPLAY = [];

export const ASSET_TITLE_PREFIX = 'Odysee -';

export const CURRENCIES = {
	u: {
		label: 'U',
		icon: ASSETS.u,
	},
};

export const REDIRECTS = {
	bazar: {
		asset: (id: string) => `https://bazar.arweave.dev/#/asset/${id}`,
		collection: (id: string) => `https://bazar.arweave.dev/#/collection/${id}`,
		profile: (id: string) => `https://bazar.arweave.dev/#/profile/${id}`,
	},
};
