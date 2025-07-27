import { FileMetadataType } from './types';

export interface MusicNFTInfo {
	isMusicNFT: boolean;
	uniqueId: string;
	albumId?: string;
	suggestedTopics: string[];
}

/**
 * Detects if a file is a music NFT (audio file with cover art)
 */
export function detectMusicNFT(fileData: FileMetadataType): boolean {
	return fileData.file.type.startsWith('audio/') && !!fileData.coverArt;
}

/**
 * Generates a unique identifier for a music track
 */
export function generateTrackId(creatorAddress: string, fileName: string, timestamp: number): string {
	const fileHash = fileName.replace(/[^a-zA-Z0-9]/g, '').substring(0, 8);
	return `${creatorAddress}_${timestamp}_${fileHash}`;
}

/**
 * Generates an album identifier for grouping related tracks
 */
export function generateAlbumId(creatorAddress: string, albumName: string): string {
	const albumHash = albumName.replace(/[^a-zA-Z0-9]/g, '').substring(0, 8);
	return `ALBUM_${creatorAddress}_${albumHash}`;
}

/**
 * Analyzes content list to detect music NFTs and generate appropriate metadata
 */
export function analyzeMusicNFTs(
	contentList: FileMetadataType[],
	creatorAddress: string,
	collectionTitle?: string
): MusicNFTInfo[] {
	const musicNFTs: MusicNFTInfo[] = [];
	const timestamp = Date.now();

	// Group audio files by potential album (same title pattern or collection)
	const audioFiles = contentList.filter((file) => file.file.type.startsWith('audio/'));
	const hasCoverArt = audioFiles.some((file) => !!file.coverArt);

	if (hasCoverArt) {
		// Generate album ID if we have a collection title
		const albumId = collectionTitle ? generateAlbumId(creatorAddress, collectionTitle) : undefined;

		// Process each audio file
		audioFiles.forEach((file, index) => {
			if (detectMusicNFT(file)) {
				const trackId = generateTrackId(creatorAddress, file.file.name, timestamp + index);

				musicNFTs.push({
					isMusicNFT: true,
					uniqueId: trackId,
					albumId,
					suggestedTopics: ['Music', 'Bazar Music', 'Cover Art'],
				});
			}
		});
	}

	return musicNFTs;
}

/**
 * Gets suggested topics for music NFTs with genre recommendations
 */
export function getMusicNFTSuggestions(): string[] {
	return [
		'hip-hop/rap',
		'electronic',
		'rock',
		'pop',
		'jazz',
		'classical',
		'country',
		'folk',
		'blues',
		'reggae',
		'punk',
		'metal',
		'ambient',
		'experimental',
	];
}
