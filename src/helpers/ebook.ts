import { FileMetadataType } from './types';

export interface EbookInfo {
	isEbook: boolean;
	suggestedTopics: string[];
	isbn?: string;
	author?: string;
	publisher?: string;
	publicationDate?: string;
	language?: string;
	genre?: string;
}

/**
 * Detects if a file is an ebook (PDF or TXT)
 */
export function detectEbook(fileData: FileMetadataType): boolean {
	const fileType = fileData.file.type;
	return fileType === 'application/pdf' || fileType === 'text/plain';
}

/**
 * Validates ISBN format (ISBN-10 or ISBN-13)
 */
export function validateISBN(isbn: string): { valid: boolean; message: string | null } {
	// Remove hyphens and spaces
	const cleanISBN = isbn.replace(/[-\s]/g, '');

	// Check if it's ISBN-10 (10 digits) or ISBN-13 (13 digits starting with 978 or 979)
	if (cleanISBN.length === 10) {
		// ISBN-10 validation
		const digits = cleanISBN.split('').map((d) => (d === 'X' ? 10 : parseInt(d, 10)));
		if (digits.some((d) => isNaN(d))) {
			return { valid: false, message: 'ISBN-10 must contain only digits or X' };
		}
		return { valid: true, message: null };
	} else if (cleanISBN.length === 13 && (cleanISBN.startsWith('978') || cleanISBN.startsWith('979'))) {
		// ISBN-13 validation
		const digits = cleanISBN.split('').map((d) => parseInt(d, 10));
		if (digits.some((d) => isNaN(d))) {
			return { valid: false, message: 'ISBN-13 must contain only digits' };
		}
		return { valid: true, message: null };
	}

	return { valid: false, message: 'ISBN must be 10 digits (ISBN-10) or 13 digits starting with 978/979 (ISBN-13)' };
}

/**
 * Analyzes content list to detect ebooks and generate appropriate metadata
 * Similar to analyzeMusicNFTs() pattern
 */
export function analyzeEbooks(
	contentList: FileMetadataType[],
	creatorAddress: string,
	collectionTitle?: string
): EbookInfo[] {
	const ebooks: EbookInfo[] = [];
	const timestamp = Date.now();

	// Filter PDF and TXT files
	const ebookFiles = contentList.filter((file) => detectEbook(file));

	if (ebookFiles.length > 0) {
		// Process each ebook file
		ebookFiles.forEach((file, index) => {
			ebooks.push({
				isEbook: true,
				suggestedTopics: ['Book', 'Ebook', 'ISBN'],
			});
		});
	}

	return ebooks;
}

/**
 * Gets suggested topics for ebooks with genre recommendations
 */
export function getEbookSuggestions(): string[] {
	return [
		'Fiction',
		'Non-Fiction',
		'Science Fiction',
		'Fantasy',
		'Mystery',
		'Thriller',
		'Romance',
		'Biography',
		'History',
		'Science',
		'Technology',
		'Philosophy',
		'Poetry',
		'Drama',
		'Comedy',
		'Educational',
		'Reference',
		'Children',
		'Young Adult',
		'Horror',
	];
}
