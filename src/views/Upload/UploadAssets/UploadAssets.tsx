import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactSVG } from 'react-svg';

import { Button } from 'components/atoms/Button';
import { FormField } from 'components/atoms/FormField';
import { IconButton } from 'components/atoms/IconButton';
import { TextArea } from 'components/atoms/TextArea';
import { Modal } from 'components/molecules/Modal';
import { Table } from 'components/molecules/Table';
import { TurboBalanceFund } from 'components/molecules/TurboBalanceFund';
import {
	ALLOWED_ASSET_TYPES,
	ALLOWED_THUMBNAIL_TYPES,
	ASSETS,
	MAX_THUMBNAIL_IMAGE_SIZE,
	MAX_UPLOAD_SIZE,
} from 'helpers/config';
import { getTurboCostWincEndpoint } from 'helpers/endpoints';
import { ActiveFieldAddType, AlignType, FileMetadataType, SequenceType } from 'helpers/types';
import { getARAmountFromWinc, getByteSizeDisplay, stripFileExtension } from 'helpers/utils';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';
import { RootState } from 'store';
import * as uploadActions from 'store/upload/actions';
import { CloseHandler } from 'wrappers/CloseHandler';

import * as S from './styles';

const SEQUENCE_ITERATION = 10;

function FileDropdown(props: {
	id: string;
	data: FileMetadataType;
	handleRemoveFile: (fileName: string) => void;
	handleAddField: (fileName: string, value: string, fieldType: ActiveFieldAddType) => void;
}) {
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [open, setOpen] = React.useState<boolean>(false);
	const [activeFieldAdd, setActiveFieldAdd] = React.useState<ActiveFieldAddType | null>(null);

	const [title, setTitle] = React.useState<string>('');
	const [description, setDescription] = React.useState<string>('');
	const [coverArt, setCoverArt] = React.useState<string>('');

	const fileInputRef = React.useRef<any>(null);

	React.useEffect(() => {
		setTitle('');
		setDescription('');
		setCoverArt('');
	}, [props.id]);

	function handleCoverArtChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target.files && e.target.files.length) {
			const file = e.target.files[0];
			if (file.type.startsWith('image/')) {
				// Check file size (limit to 100KB like thumbnails)
				if (file.size > MAX_THUMBNAIL_IMAGE_SIZE) {
					alert(`Cover art file size must be under ${getByteSizeDisplay(MAX_THUMBNAIL_IMAGE_SIZE)}`);
					return;
				}

				const reader = new FileReader();
				reader.onload = (event: ProgressEvent<FileReader>) => {
					if (event.target?.result) {
						setCoverArt(event.target.result as string);
					}
				};
				reader.readAsDataURL(file);
			} else {
				alert('Please select an image file for cover art');
			}
		}
	}

	function getFieldAdd() {
		let header: string;
		let body: React.ReactNode;
		let handleSave: React.ReactNode;

		switch (activeFieldAdd) {
			case 'title':
				header = language.editTitle;
				body = (
					<FormField
						label={language.title}
						value={title}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
						invalid={{
							status: false,
							message: null,
						}}
						disabled={false}
						sm
					/>
				);
				handleSave = (
					<Button
						type={'alt1'}
						label={language.save}
						handlePress={() => {
							props.handleAddField(props.data.file.name, title, 'title');
							setActiveFieldAdd(null);
						}}
						disabled={false}
						noMinWidth
					/>
				);
				break;
			case 'description':
				header = language.editDescription;
				body = (
					<TextArea
						label={language.description}
						value={description}
						onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
						invalid={{
							status: false,
							message: null,
						}}
						disabled={false}
					/>
				);
				handleSave = (
					<Button
						type={'alt1'}
						label={language.save}
						handlePress={() => {
							props.handleAddField(props.data.file.name, description, 'description');
							setActiveFieldAdd(null);
							setOpen(false);
						}}
						disabled={false}
						noMinWidth
					/>
				);
				break;
			case 'coverArt':
				header = language.editCoverArt;
				body = (
					<S.CoverArtWrapper>
						<S.CoverArtUpload>
							<input
								ref={fileInputRef}
								type={'file'}
								onChange={handleCoverArtChange}
								accept={ALLOWED_THUMBNAIL_TYPES}
								style={{ display: 'none' }}
							/>
							{coverArt ? (
								<S.CoverArtPreview>
									<img src={coverArt} alt="Cover art preview" />
									<S.CoverArtActions>
										<IconButton
											type={'primary'}
											src={ASSETS.close}
											handlePress={() => setCoverArt('')}
											dimensions={{ wrapper: 21.5, icon: 8.5 }}
										/>
									</S.CoverArtActions>
								</S.CoverArtPreview>
							) : (
								<S.CoverArtPlaceholder onClick={() => fileInputRef.current?.click()}>
									<ReactSVG src={ASSETS.image} />
									<span>{language.uploadCoverArt}</span>
								</S.CoverArtPlaceholder>
							)}
						</S.CoverArtUpload>
						<S.CoverArtInfo>
							<span>{language.coverArtInfo}</span>
						</S.CoverArtInfo>
					</S.CoverArtWrapper>
				);
				handleSave = (
					<Button
						type={'alt1'}
						label={language.save}
						handlePress={() => {
							if (coverArt) {
								props.handleAddField(props.data.file.name, coverArt, 'coverArt');
							}
							setActiveFieldAdd(null);
							setOpen(false);
						}}
						disabled={!coverArt}
						noMinWidth
					/>
				);
				break;
		}

		return (
			<Modal header={header} handleClose={() => setActiveFieldAdd(null)}>
				<S.MWrapper>
					{body}
					<S.MActions>
						<Button type={'primary'} label={language.cancel} handlePress={() => setActiveFieldAdd(null)} noMinWidth />
						{handleSave}
					</S.MActions>
				</S.MWrapper>
			</Modal>
		);
	}

	return (
		<>
			<CloseHandler active={open} disabled={!open} callback={() => setOpen(false)}>
				<S.DWrapper>
					<IconButton
						type={'primary'}
						src={ASSETS.actionMenu}
						handlePress={() => setOpen(!open)}
						dimensions={{ wrapper: 27.5, icon: 17.5 }}
					/>
					{open && (
						<S.DDropdown className={'border-wrapper-primary'} open={open}>
							<S.LI
								onClick={() => {
									setActiveFieldAdd('title');
								}}
								disabled={false}
							>
								{language.editTitle}
							</S.LI>
							<S.LI
								onClick={() => {
									setActiveFieldAdd('description');
								}}
								disabled={false}
							>
								{language.editDescription}
							</S.LI>
							{props.data.file.type.startsWith('audio/') && (
								<>
									<S.LI
										onClick={() => {
											setActiveFieldAdd('coverArt');
										}}
										disabled={false}
									>
										{props.data.coverArt ? language.editCoverArt : language.uploadCoverArt}
									</S.LI>
									{props.data.coverArt && (
										<S.LI
											onClick={() => {
												props.handleAddField(props.data.file.name, '', 'coverArt');
												setOpen(false);
											}}
											disabled={false}
										>
											{language.removeCoverArt}
										</S.LI>
									)}
								</>
							)}
							<S.LI
								onClick={() => {
									props.handleRemoveFile(props.data.file.name);
									setOpen(false);
								}}
								disabled={false}
							>
								{language.removeFile}
							</S.LI>
						</S.DDropdown>
					)}
				</S.DWrapper>
			</CloseHandler>
			{activeFieldAdd !== null && getFieldAdd()}
		</>
	);
}

export default function UploadAssets() {
	const dispatch = useDispatch();

	const arProvider = useArweaveProvider();

	const uploadReducer = useSelector((state: RootState) => state.uploadReducer);

	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const fileInputRef = React.useRef<any>(null);

	const [_calculatingCost, setCalculatingCost] = React.useState<boolean>(false);

	const [showFund, setShowFund] = React.useState<boolean>(false);

	const [currentSelectedData, setCurrentSelectedData] = React.useState<FileMetadataType[]>([]);
	const [cursor, setCursor] = React.useState<string | null>(null);
	const [cursorUpdated, setCursorUpdated] = React.useState<boolean>(false);

	const [sequence, setSequence] = React.useState<SequenceType>({
		start: SEQUENCE_ITERATION - (SEQUENCE_ITERATION - 1) - 1,
		end: SEQUENCE_ITERATION - 1,
	});

	React.useEffect(() => {
		(async function () {
			if (uploadReducer.data.contentList && uploadReducer.data.contentList.length && arProvider.wallet) {
				setCalculatingCost(true);
				try {
					const totalSize = uploadReducer.data.contentList.reduce((total, data) => {
						return total + data.file.size;
					}, 0);
					const turboCostResponse = await fetch(getTurboCostWincEndpoint(totalSize));
					if (turboCostResponse.ok) {
						const winc = (await turboCostResponse.json()).winc;
						dispatch(uploadActions.setUploadCost(getARAmountFromWinc(winc)));
					}
				} catch (e: any) {
					console.error(e);
				}
				setCalculatingCost(false);
			}
		})();
	}, [uploadReducer.data.contentList, arProvider.wallet]);

	React.useEffect(() => {
		if (cursor) {
			setSequence({
				start: cursor === 'next' ? sequence.start + SEQUENCE_ITERATION : sequence.start - SEQUENCE_ITERATION,
				end: cursor === 'next' ? sequence.end + SEQUENCE_ITERATION : sequence.end - SEQUENCE_ITERATION,
			});
		}
	}, [cursorUpdated]);

	React.useEffect(() => {
		if (uploadReducer.data.contentList) {
			let currentData = [...uploadReducer.data.contentList].slice(sequence.start, sequence.end + 1);
			setCurrentSelectedData(currentData);
		}
	}, [uploadReducer.data.contentList, sequence]);

	function handleFileChange(e: any) {
		if (e.target.files && e.target.files.length) {
			let newFiles = Array.from(e.target.files).map((file) => {
				return { file: file, title: '', description: '' };
			});

			newFiles = newFiles.filter(
				(newFile: any) =>
					!uploadReducer.data.contentList.some((existingFile: any) => existingFile.file.name === newFile.file.name)
			);

			const updatedData = [...uploadReducer.data.contentList, ...newFiles];

			dispatch(
				uploadActions.setUpload([
					{
						field: 'contentList',
						data: updatedData,
					},
				])
			);

			e.target.value = '';
		}
	}

	function handleAddField(fileName: string, value: string, fieldType: ActiveFieldAddType) {
		const updatedData = uploadReducer.data.contentList.map((data: FileMetadataType) => {
			if (data.file.name === fileName) {
				return {
					...data,
					...(fieldType === 'title' ? { title: value } : {}),
					...(fieldType === 'description' ? { description: value } : {}),
					...(fieldType === 'coverArt' ? { coverArt: value || undefined } : {}),
				};
			}
			return data;
		});

		dispatch(
			uploadActions.setUpload([
				{
					field: 'contentList',
					data: updatedData,
				},
			])
		);
	}

	function handleRemoveFile(fileName: string) {
		const updatedData = uploadReducer.data.contentList.filter((fileData) => fileData.file.name !== fileName);
		dispatch(
			uploadActions.setUpload([
				{
					field: 'contentList',
					data: updatedData,
				},
			])
		);
	}

	function getTableHeader() {
		return {
			fileName: {
				width: '60%',
				align: 'left' as AlignType,
				display: language.title,
			},
			description: {
				width: '15%',
				align: 'center' as AlignType,
				display: language.description,
			},
			coverArt: {
				width: '10%',
				align: 'center' as AlignType,
				display: language.coverArt,
			},
			actions: {
				width: '15%',
				align: 'center' as AlignType,
				display: language.actions,
			},
		};
	}

	function getTableData() {
		if (uploadReducer.data.contentList && currentSelectedData) {
			return currentSelectedData.map((data: FileMetadataType) => {
				const index = uploadReducer.data.contentList.findIndex(
					(currentData: FileMetadataType) => currentData.file.name === data.file.name
				);

				const invalid = data.file.size > MAX_UPLOAD_SIZE;
				let name = data.title ? data.title : stripFileExtension(data.file.name);
				if (invalid) name += ` (File exceeds max ${getByteSizeDisplay(MAX_UPLOAD_SIZE)})`;

				return {
					data: {
						fileName: name,
						description: (
							<S.DDataWrapper>
								<p>{`[ ${data.description ? '✓' : 'x'} ]`}</p>
							</S.DDataWrapper>
						),
						coverArt: data.file.type.startsWith('audio/') ? (
							<S.DDataWrapper>
								<p>{`[ ${data.coverArt ? '✓' : 'x'} ]`}</p>
							</S.DDataWrapper>
						) : (
							<S.DDataWrapper>
								<p>-</p>
							</S.DDataWrapper>
						),
						actions: (
							<FileDropdown
								id={`file-dropdown-${index}`}
								data={data}
								handleRemoveFile={(fileName: string) => handleRemoveFile(fileName)}
								handleAddField={(fileName: string, value: string, fieldType: ActiveFieldAddType) =>
									handleAddField(fileName, value, fieldType)
								}
							/>
						),
					},
					active: false,
					viewed: false,
				};
			});
		} else return null;
	}

	function getFileWrapper() {
		if (uploadReducer.data.contentList && uploadReducer.data.contentList.length && currentSelectedData) {
			return (
				<>
					<Table
						title={`${language.filesSelected} (${uploadReducer.data.contentList.length})`}
						action={null}
						header={getTableHeader()}
						data={getTableData()}
						recordsPerPage={SEQUENCE_ITERATION}
						showPageNumbers={false}
						handleCursorFetch={(cursor: string | null) => {
							setCursor(cursor);
							setCursorUpdated(!cursorUpdated);
						}}
						cursors={{
							next:
								currentSelectedData.length < SEQUENCE_ITERATION ||
								sequence.end + 1 >= uploadReducer.data.contentList.length
									? null
									: 'next',
							previous: sequence.start <= 0 ? null : 'prev',
						}}
						showNoResults={false}
					/>
					<S.TMessage>
						<span>{`${language.showingFiles}: ${sequence.start + 1} - ${
							sequence.end + 1 > uploadReducer.data.contentList.length
								? uploadReducer.data.contentList.length
								: sequence.end + 1
						}`}</span>
					</S.TMessage>
					{/* {arProvider.walletAddress && uploadReducer.uploadCost !== null && (
						<S.TMessage>
							<span>{`${language.uploadCost}: ${formatTurboAmount(uploadReducer.uploadCost)}`}</span>
						</S.TMessage>
					)} */}
				</>
			);
		} else {
			return (
				<S.EWrapper>
					<S.EIcon>
						<ReactSVG src={ASSETS.upload} />
					</S.EIcon>
					<S.EInfo>
						<p>{language.selectFiles}</p>
						<span>{language.supportedFileTypes}</span>
					</S.EInfo>
					<Button
						type={'alt1'}
						label={language.select}
						handlePress={() => fileInputRef.current.click()}
						disabled={uploadReducer.uploadActive}
						noMinWidth
					/>
				</S.EWrapper>
			);
		}
	}

	return (
		<>
			<S.Wrapper>
				<S.Header>
					<h4>{language.uploadFiles}</h4>
					<Button
						type={'primary'}
						label={language.select}
						handlePress={() => fileInputRef.current.click()}
						disabled={uploadReducer.uploadActive}
						noMinWidth
					/>
				</S.Header>
				<S.Body>{getFileWrapper()}</S.Body>
				<input
					ref={fileInputRef}
					type={'file'}
					multiple
					onChange={handleFileChange}
					disabled={false}
					accept={ALLOWED_ASSET_TYPES}
				/>
			</S.Wrapper>
			{showFund && <TurboBalanceFund handleClose={() => setShowFund(false)} />}
		</>
	);
}
