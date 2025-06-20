import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { messageResult } from 'api';
import { getGQLData } from 'gql';

import { Button } from 'components/atoms/Button';
import { Checkbox } from 'components/atoms/Checkbox';
import { IconButton } from 'components/atoms/IconButton';
import { Loader } from 'components/atoms/Loader';
import { Notification } from 'components/atoms/Notification';
import { Table } from 'components/molecules/Table';
import { AOS_SNIPPETS } from 'helpers/aos-snippets';
import { ASSETS, GATEWAYS, PAGINATORS, REDIRECTS, STORAGE, TAGS, URLS } from 'helpers/config';
import { AlignType, CursorEnum, GQLNodeResponseType, GroupIndexType } from 'helpers/types';
import { formatAddress, getTagValue } from 'helpers/utils';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';
import { RootState } from 'store';
import * as uploadActions from 'store/upload/actions';
import { CloseHandler } from 'wrappers/CloseHandler';

import { CodeSnippetModal } from '../../molecules/CodeSnippetModal';

import * as S from './styles';

export function AssetDropdown(props: { id: string; title: string; handleToggleUpdate: () => void }) {
	const arProvider = useArweaveProvider();

	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [open, setOpen] = React.useState<boolean>(false);
	const [showAOSSnippet, setShowAOSSnippet] = React.useState<string | null>(null);

	const [loading, setLoading] = React.useState<boolean>(false);
	const [response, setResponse] = React.useState<string>(null);

	async function handleRemoveAsset() {
		if (arProvider.walletAddress && arProvider.profile && arProvider.profile.id) {
			setLoading(true);
			try {
				await messageResult({
					processId: arProvider.profile.id,
					wallet: arProvider.wallet,
					action: 'Eval',
					tags: [],
					data: `table.remove(Assets, (function() for i, v in ipairs(Assets) do if v.Id == '${props.id}' then return i end end end)())`,
					useRawData: true,
				});

				setResponse(`${language.assetRemoved}!`);
				setOpen(false);

				await new Promise((resolve) => setTimeout(resolve, 1000));
				props.handleToggleUpdate();
			} catch (e: any) {
				console.error(e);
				setResponse(language.errorOccurred);
			}
			setLoading(false);
		}
	}

	return (
		<>
			<CloseHandler active={open} disabled={!open} callback={() => setOpen(false)}>
				<S.DWrapper>
					<IconButton
						type={'primary'}
						src={ASSETS.actionMenu}
						handlePress={() => setOpen(!open)}
						dimensions={{ wrapper: 27.5, icon: 18.5 }}
					/>
					{open && (
						<S.DDropdown className={'border-wrapper-primary'} open={open}>
							<S.LI onClick={() => setShowAOSSnippet('listAsset')} disabled={false}>
								{language.listAsset}
							</S.LI>
							<S.LI onClick={() => setShowAOSSnippet('unlistAsset')} disabled={false}>
								{language.unlistAsset}
							</S.LI>
							<S.LI onClick={() => setShowAOSSnippet('transferAsset')} disabled={false}>
								{language.transferAsset}
							</S.LI>
							<S.LI onClick={handleRemoveAsset} disabled={loading}>
								{response ? response : loading ? `${language.loading}...` : language.removeAsset}
							</S.LI>
							<S.LI onClick={() => setShowAOSSnippet('getAssetOwners')} disabled={false}>
								{language.viewOwners}
							</S.LI>
						</S.DDropdown>
					)}
				</S.DWrapper>
			</CloseHandler>
			{response && <Notification message={response} callback={() => setResponse(null)} />}
			{showAOSSnippet && (
				<CodeSnippetModal {...AOS_SNIPPETS[showAOSSnippet]} open={true} onClose={() => setShowAOSSnippet(null)} />
			)}
		</>
	);
}

export default function AssetsTable(props: { useIdAction: boolean; useActions: boolean }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const uploadReducer = useSelector((state: RootState) => state.uploadReducer);

	const arProvider = useArweaveProvider();

	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [assets, setAssets] = React.useState<GQLNodeResponseType[] | null>(null);
	const [selectedAssets, setSelectedAssets] = React.useState<GQLNodeResponseType[] | null>(null);
	const [groupIndex, setGroupIndex] = React.useState<GroupIndexType | null>(null);
	const [idCount, setIdCount] = React.useState<number>(0);

	const [loading, setLoading] = React.useState<boolean>(false);
	const [recordsPerPage] = React.useState(PAGINATORS.assetTable);

	const [currentTableCursor, setCurrentTableCursor] = React.useState<string | null>(null);
	const [currentRecords, setCurrentRecords] = React.useState<GQLNodeResponseType[] | null>(null);

	const [toggleUpdate, _setToggleUpdate] = React.useState<boolean>(false);

	const lastRecordIndex = 1 * recordsPerPage;
	const firstRecordIndex = lastRecordIndex - recordsPerPage;

	React.useEffect(() => {
		if (assets !== null) {
			setCurrentRecords(assets.length ? assets.slice(firstRecordIndex, lastRecordIndex) : []);
		}
	}, [assets]);

	React.useEffect(() => {
		if (!arProvider.profile) setLoading(true);
		else setLoading(false);
	}, [arProvider.profile]);

	React.useEffect(() => {
		(async function () {
			if (arProvider.walletAddress && arProvider.profile?.id) {
				setLoading(true);
				try {
					const groups: GroupIndexType = [];
					const ids = (arProvider.profile as any).assets.map((asset) => asset.id);

					if (ids && ids.length) {
						setIdCount(ids.length);
						const groupIndex = new Map(groups.map((group: any) => [group.index, group.ids]));

						for (let i = 0, j = 0; i < ids.length; i += PAGINATORS.assetTable, j++) {
							const cursorIds = [...ids].slice(i, i + PAGINATORS.assetTable);
							const newIndex = `index-${j}`;

							if (
								![...groupIndex.values()].some((groupedIds: any) =>
									groupedIds.every((id: any, index: any) => id === cursorIds[index])
								) ||
								newIndex === `index-0`
							) {
								groups.push({
									index: newIndex,
									ids: cursorIds,
								});
							}
						}

						if (groups && groups.length) {
							setCurrentTableCursor(groups[0].index);
							setGroupIndex(groups);
						} else {
							setLoading(false);
							setAssets([]);
						}
					} else {
						setLoading(false);
						setAssets([]);
					}
				} catch (e: any) {
					console.error(e);
				}
			}
		})();
	}, [arProvider.walletAddress, arProvider.profile?.id, uploadReducer.uploadActive, toggleUpdate]);

	React.useEffect(() => {
		(async function () {
			if (currentTableCursor && groupIndex) {
				const index = parseInt(currentTableCursor.match(/\d+/)[0], 10);
				if (index !== null) {
					try {
						const assetsResponse = await getGQLData({
							gateway: GATEWAYS.arweave,
							ids: groupIndex[index].ids,
							tagFilters: null,
							owners: null,
							cursor: null,
							reduxCursor: null,
							cursorObjectKey: CursorEnum.IdGQL,
						});
						if (assetsResponse) {
							setAssets(assetsResponse.data);
						}
					} catch (e: any) {
						console.error(e);
					}
				} else {
					setAssets([]);
				}
				setLoading(false);
			}
		})();
	}, [currentTableCursor, groupIndex]);

	React.useEffect(() => {
		(async function () {
			if (uploadReducer.data.idList && uploadReducer.data.idList.length) {
				try {
					const assetsResponse = await getGQLData({
						gateway: GATEWAYS.arweave,
						ids: uploadReducer.data.idList,
						tagFilters: null,
						owners: null,
						cursor: null,
						reduxCursor: null,
						cursorObjectKey: CursorEnum.IdGQL,
					});
					if (assetsResponse) {
						setSelectedAssets(assetsResponse.data);
					}
				} catch (e: any) {
					console.error(e);
				}
			} else {
				setSelectedAssets([]);
			}
		})();
	}, [uploadReducer.data.idList]);

	function handleId(id: string) {
		let ids: string[];
		const index = uploadReducer.data.idList.indexOf(id);
		if (index === -1) ids = [...uploadReducer.data.idList, id];
		else ids = uploadReducer.data.idList.filter((item: string) => item !== id);
		dispatch(
			uploadActions.setUpload([
				{
					field: 'idList',
					data: ids,
				},
			])
		);
	}

	function getPaginatorAction(action: 'next' | 'prev') {
		if (groupIndex.length) {
			const currentIndex = parseInt(currentTableCursor.match(/\d+/)[0], 10);
			switch (action) {
				case 'next':
					return groupIndex.length > currentIndex + 1 ? groupIndex[currentIndex + 1].index : null;
				case 'prev':
					return currentIndex > 0 ? groupIndex[currentIndex - 1].index : null;
				default:
					return null;
			}
		} else {
			return null;
		}
	}

	function getTableHeader() {
		const header: any = {};
		header.assetTitle = {
			width: props.useIdAction ? '85%' : '100%',
			align: 'left' as AlignType,
			display: language.title,
		};

		if (props.useIdAction) {
			header.select = {
				width: '15%',
				align: 'center' as AlignType,
				display: language.select,
			};
		}

		// TODO
		// if (props.useActions) {
		// 	header.actions = {
		// 		width: '15%',
		// 		align: 'center' as AlignType,
		// 		display: language.actions,
		// 	};
		// }

		return header;
	}

	function getTableData(records: GQLNodeResponseType[], useDisable: boolean) {
		if (records && records.length) {
			return records.map((element: GQLNodeResponseType) => {
				const data: any = {};

				const titleTag =
					getTagValue(element.node.tags, 'Bootloader-Name') ??
					getTagValue(element.node.tags, TAGS.keys.ans110.title) ??
					getTagValue(element.node.tags, TAGS.keys.name);

				const title = titleTag !== STORAGE.none ? titleTag : formatAddress(element.node.id, false);
				const displayTitle = title ? title : language.titleNotFound;

				let idChecked = false;
				if (uploadReducer.data && uploadReducer.data.idList) {
					idChecked = uploadReducer.data.idList.includes(element.node.id);
				}

				data.assetTitle = (
					<a href={REDIRECTS.bazar.asset(element.node.id)} target={'_blank'}>
						<p>{displayTitle}</p>
					</a>
				);

				if (props.useIdAction) {
					data.select = (
						<S.CWrapper>
							<Checkbox checked={idChecked} handleSelect={() => handleId(element.node.id)} disabled={useDisable} />
						</S.CWrapper>
					);
				}

				// TODO
				// if (props.useActions) {
				// 	data.actions = (
				// 		<AssetDropdown
				// 			id={element.node.id}
				// 			title={displayTitle}
				// 			handleToggleUpdate={() => setToggleUpdate(!toggleUpdate)}
				// 		/>
				// 	);
				// }

				return {
					data: data,
					active: false,
					viewed: false,
				};
			});
		} else return null;
	}

	function getAssets() {
		if (!arProvider.walletAddress) {
			return (
				<S.MWrapper>
					<span>{language.assetFetchConnectionRequired}</span>
				</S.MWrapper>
			);
		}
		if (loading) return <Loader sm relative />;
		if (currentRecords !== null) {
			if (currentRecords.length) {
				const currentIndex = parseInt(currentTableCursor.match(/\d+/)[0], 10);
				const currentIndexDisplay = currentIndex * PAGINATORS.assetTable;

				return (
					<>
						<Table
							title={`${language.assets} (${idCount})`}
							action={null}
							header={getTableHeader()}
							data={getTableData(currentRecords, false)}
							recordsPerPage={PAGINATORS.assetTable}
							showPageNumbers={false}
							handleCursorFetch={(cursor: string | null) => setCurrentTableCursor(cursor)}
							cursors={{
								next: getPaginatorAction('next'),
								previous: getPaginatorAction('prev'),
							}}
							showNoResults={false}
						/>
						<S.TMessage>
							<span>{`${language.showingAssets}: ${currentIndexDisplay + 1} - ${
								currentIndexDisplay + PAGINATORS.assetTable
							}`}</span>
						</S.TMessage>
					</>
				);
			} else {
				return (
					<S.EmptyContainer className={'border-wrapper-alt1'}>
						<S.EmptyLogo>
							<ReactSVG src={ASSETS.asset} />
						</S.EmptyLogo>
						<p>{language.noAssetsInfo}</p>
						<Button type={'alt1'} label={language.upload} handlePress={() => navigate(URLS.upload)} />
					</S.EmptyContainer>
				);
			}
		}
	}

	function getSelectedAssets() {
		if (selectedAssets && selectedAssets.length && uploadReducer.data.idList && uploadReducer.data.idList.length) {
			const currentSelectedAssets = selectedAssets.filter((element: GQLNodeResponseType) =>
				uploadReducer.data.idList.includes(element.node.id)
			);

			return (
				<S.TAWrapper>
					<Table
						title={`${language.selected} (${uploadReducer.data.idList.length})`}
						action={null}
						header={getTableHeader()}
						data={getTableData(currentSelectedAssets, false)}
						recordsPerPage={PAGINATORS.default}
						showPageNumbers={false}
						handleCursorFetch={(_cursor: string | null) => {}}
						cursors={{
							next: null,
							previous: null,
						}}
						showNoResults={false}
						hidePaginator={true}
					/>
				</S.TAWrapper>
			);
		}
		return null;
	}

	return (
		<S.Wrapper>
			{props.useIdAction && (
				<S.Header>
					<h4>{language.chooseExistingAssets}</h4>
				</S.Header>
			)}
			<S.Body>{getAssets()}</S.Body>
			{props.useIdAction && getSelectedAssets()}
		</S.Wrapper>
	);
}
