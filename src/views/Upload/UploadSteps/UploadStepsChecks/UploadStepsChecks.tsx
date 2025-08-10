import React from 'react';
import { useSelector } from 'react-redux';

import { getLicenseValuePayment } from 'gql';

import { AssetInfoLicense } from 'components/molecules/AssetInfoLicense';
import { Modal } from 'components/molecules/Modal';
import { TurboBalanceFund } from 'components/molecules/TurboBalanceFund';
import { MetadataTraits } from 'components/organisms/MetadataTraits';
import { ASSETS, TAGS } from 'helpers/config';
import { formatAddress } from 'helpers/utils';
import { useLanguageProvider } from 'providers/LanguageProvider';
import { RootState } from 'store';

import * as S from './styles';

export default function UploadStepsChecks() {
	const uploadReducer = useSelector((state: RootState) => state.uploadReducer);

	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const videoRef = React.useRef(null);

	const [showPlayer, setShowPlayer] = React.useState<boolean>(false);
	const [videoSrc, setVideoSrc] = React.useState('');

	const [showFund, setShowFund] = React.useState<boolean>(false);

	React.useEffect(() => {
		if (showPlayer && uploadReducer.data.content) {
			const url = URL.createObjectURL(uploadReducer.data.content);
			setVideoSrc(url);
		}
	}, [showPlayer, uploadReducer.data.content]);

	return (
		<>
			<S.Wrapper>
				<S.InfoHeader>
					<span>{language.review}</span>
				</S.InfoHeader>
				<S.InfoWrapper className={'border-wrapper-alt1'}>
					{uploadReducer.uploadType === 'collection' && (
						<>
							<S.InfoLine>
								<span>{language.title}</span>
								<p>{uploadReducer.data.title || '-'}</p>
							</S.InfoLine>
							<S.InfoLine>
								<span>{language.description}</span>
								<p>{uploadReducer.data.description || '-'}</p>
							</S.InfoLine>
						</>
					)}
					{uploadReducer.uploadType === 'assets' && uploadReducer.data?.collectionId && (
						<>
							<S.InfoLine>
								<span>{language.collection}</span>
								<p>{uploadReducer.data.collectionName ?? formatAddress(uploadReducer.data.collectionId, false)}</p>
							</S.InfoLine>
						</>
					)}
					<S.InfoLine>
						<span>{language.topics}</span>
						{uploadReducer.data.topics && uploadReducer.data.topics.length > 0 ? (
							<S.TWrapper>
								{uploadReducer.data.topics.map((topic: string, index: number) => {
									return (
										<p key={index}>
											{topic.charAt(0).toUpperCase() + topic.slice(1)}
											{!(index === uploadReducer.data.topics.length - 1) && ',\u00A0'}
										</p>
									);
								})}
							</S.TWrapper>
						) : (
							<p>-</p>
						)}
					</S.InfoLine>
					{/* Show per-asset traits */}
					{uploadReducer.data.contentList.some((asset: any) => asset.traits && asset.traits.length > 0) && (
						<>
							<S.InfoLine>
								<span>Metadata Traits</span>
								<S.AssetTraitsPreview>
									{uploadReducer.data.contentList.map((asset: any, assetIndex: number) => {
										if (!asset.traits || asset.traits.length === 0) return null;

										return (
											<S.AssetTraitItem key={assetIndex}>
												<S.AssetName>{asset.title || asset.file.name}</S.AssetName>
												<S.AssetTraitsList>
													{asset.traits.map((trait: any, traitIndex: number) => (
														<S.TraitPreviewItem key={traitIndex}>
															<S.TraitPreviewType>{trait.trait_type}</S.TraitPreviewType>
															<S.TraitPreviewValue>{trait.value}</S.TraitPreviewValue>
														</S.TraitPreviewItem>
													))}
												</S.AssetTraitsList>
											</S.AssetTraitItem>
										);
									})}
								</S.AssetTraitsPreview>
							</S.InfoLine>
						</>
					)}
				</S.InfoWrapper>
				<S.InfoHeader>
					<span>{language.assets}</span>
				</S.InfoHeader>
				<S.InfoWrapper className={'border-wrapper-alt1'}>
					<S.InfoLine>
						<span>{language.toUpload}</span>
						<p>{`(${uploadReducer.data.contentList.length})`}</p>
					</S.InfoLine>
					{uploadReducer.uploadType === 'collection' && (
						<>
							<S.InfoLine>
								<span>{language.existingAssets}</span>
								<p>{`(${uploadReducer.data.idList.length})`}</p>
							</S.InfoLine>
							<S.InfoLine>
								<span>{language.totalAssets}</span>
								<p>{`(${uploadReducer.data.contentList.length + uploadReducer.data.idList.length})`}</p>
							</S.InfoLine>
						</>
					)}
				</S.InfoWrapper>
				{uploadReducer.data.hasLicense && (
					<AssetInfoLicense
						asset={{
							id: '',
							contentType: '',
							contentLength: 0,
							title: '',
							description: '',
							type: '',
							topics: [''],
							creator: null,
							dateCreated: 0,
							thumbnail: '',
							license: {
								license: TAGS.values.license,
								access: {
									value: `${uploadReducer.data.license.accessFee.value}-${uploadReducer.data.license.accessFee.amount}`,
									icon: ASSETS.wrappedAr,
								},
								derivations: getLicenseValuePayment(
									`${uploadReducer.data.license.derivations.value}-${uploadReducer.data.license.derivations.terms.value}-${uploadReducer.data.license.derivations.terms.amount}`
								),
								commercialUse: getLicenseValuePayment(
									`${uploadReducer.data.license.commercialUse.value}-${uploadReducer.data.license.commercialUse.terms.value}-${uploadReducer.data.license.commercialUse.terms.amount}`
								),
								dataModelTraining: getLicenseValuePayment(
									`${uploadReducer.data.license.dataModelTraining.value}-${uploadReducer.data.license.dataModelTraining.terms.value}-${uploadReducer.data.license.dataModelTraining.terms.amount}`
								),
								paymentMode: uploadReducer.data.license.paymentMode.value,
								paymentAddress: uploadReducer.data.license.paymentMode.recipient,
							},
						}}
					/>
				)}
				{/* {arProvider.wallet && (
					<>
						<S.InfoHeader>
							<span>{language.paymentInformation}</span>
						</S.InfoHeader>
						<S.InfoWrapper className={'border-wrapper-alt1'}>
							<S.InfoLine>
								<span>{language.turboUploadCost}</span>
								<p>
									{uploadReducer.uploadCost > 0
										? formatTurboAmount(uploadReducer.uploadCost)
										: language.uploadChecksCostInfo}
								</p>
							</S.InfoLine>
							<S.InfoLine>
								<S.InfoLineFlex>
									<span>{language.yourBalance}</span>
									{arProvider.turboBalance === null && (
										<Button
											type={'alt2'}
											label={`(${language.fetch})`}
											handlePress={() => arProvider.getTurboBalance()}
											disabled={arProvider.turboBalance !== null}
											height={22.5}
											noMinWidth
										/>
									)}
									<Button
										type={'alt2'}
										label={language.fund}
										handlePress={() => setShowFund(true)}
										height={22.5}
										noMinWidth
									/>
								</S.InfoLineFlex>
								<p>
									{arProvider.turboBalance !== null
										? getTurboBalance(arProvider.turboBalance)
										: language.uploadChecksCostTurboInfo}
								</p>
							</S.InfoLine>
						</S.InfoWrapper>
					</>
				)} */}
			</S.Wrapper>
			{showPlayer && uploadReducer.data.content && (
				<Modal header={language.previewContent} handleClose={() => setShowPlayer(false)}>
					<S.MWrapper>
						<video ref={videoRef} src={videoSrc} controls autoPlay />
					</S.MWrapper>
				</Modal>
			)}
			{showFund && <TurboBalanceFund handleClose={() => setShowFund(false)} />}
		</>
	);
}
