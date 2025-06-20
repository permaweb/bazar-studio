import React from 'react';
import { ReactSVG } from 'react-svg';

import { connect, createDataItemSigner } from '@permaweb/aoconnect';

import { createTransaction, messageResult } from 'api';

import { Button } from 'components/atoms/Button';
import { FormField } from 'components/atoms/FormField';
import { Notification } from 'components/atoms/Notification';
import { TextArea } from 'components/atoms/TextArea';
import { AO, ASSETS, TAGS } from 'helpers/config';
import { getTxEndpoint } from 'helpers/endpoints';
import { NotificationType } from 'helpers/types';
import { checkValidAddress, getBase64Data, getDataURLContentType } from 'helpers/utils';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';
import { WalletBlock } from 'wallet/WalletBlock';

import * as S from './styles';
import { IProps } from './types';

const MAX_BIO_LENGTH = 500;
const MAX_IMAGE_SIZE = 100000;
const ALLOWED_BANNER_TYPES = 'image/png, image/jpeg, image/gif';
const ALLOWED_AVATAR_TYPES = 'image/png, image/jpeg, image/gif';

export default function ProfileManage(props: IProps) {
	const arProvider = useArweaveProvider();

	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const bannerInputRef = React.useRef<any>(null);
	const avatarInputRef = React.useRef<any>(null);

	const [name, setName] = React.useState<string>('');
	const [username, setUsername] = React.useState<string>('');
	const [bio, setBio] = React.useState<string>('');
	const [banner, setBanner] = React.useState<any>(null);
	const [avatar, setAvatar] = React.useState<any>(null);

	const [loading, setLoading] = React.useState<boolean>(false);
	const [profileResponse, setProfileResponse] = React.useState<NotificationType | null>(null);

	React.useEffect(() => {
		if (props.profile) {
			setUsername(props.profile.username ?? '');
			setName(props.profile.displayName ?? '');
			setBio(props.profile.bio ?? '');
			setBanner(props.profile.banner && checkValidAddress(props.profile.banner) ? props.profile.banner : null);
			setAvatar(props.profile.avatar && checkValidAddress(props.profile.avatar) ? props.profile.avatar : null);
		}
	}, [props.profile]);

	function handleUpdate() {
		arProvider.setToggleProfileUpdate(!arProvider.toggleProfileUpdate);
		if (props.handleUpdate) props.handleUpdate();
	}

	async function handleSubmit() {
		if (arProvider.wallet) {
			setLoading(true);

			const data: any = {
				DisplayName: name,
				UserName: username,
				Description: bio,
			};

			let bannerTx: any = null;
			if (banner) {
				if (checkValidAddress(banner)) {
					bannerTx = banner;
				} else {
					try {
						const bannerContentType = getDataURLContentType(banner);
						const base64Data = getBase64Data(banner);
						const bufferData = Buffer.from(base64Data, 'base64');

						bannerTx = await createTransaction({
							content: bufferData,
							contentType: bannerContentType,
							tags: [{ name: TAGS.keys.contentType, value: bannerContentType }],
						});
					} catch (e: any) {
						console.error(e);
					}
				}
			}

			let avatarTx: any = null;
			if (avatar) {
				if (checkValidAddress(avatar)) {
					avatarTx = avatar;
				} else {
					try {
						const avatarContentType = getDataURLContentType(avatar);
						const base64Data = getBase64Data(avatar);
						const bufferData = Buffer.from(base64Data, 'base64');

						avatarTx = await createTransaction({
							content: bufferData,
							contentType: avatarContentType,
							tags: [{ name: TAGS.keys.contentType, value: avatarContentType }],
						});
					} catch (e: any) {
						console.error(e);
					}
				}
			}

			data.CoverImage = bannerTx || 'None';
			data.ProfileImage = avatarTx || 'None';

			try {
				if (props.profile && props.profile.id) {
					let updateResponse = await messageResult({
						processId: props.profile.id,
						action: 'Update-Profile',
						tags: null,
						data: data,
						wallet: arProvider.wallet,
					});
					if (updateResponse && updateResponse['Profile-Success']) {
						setProfileResponse({
							message: `${language.profileUpdated}!`,
							status: 'success',
						});
						handleUpdate();
					} else {
						console.log(updateResponse);
						setProfileResponse({
							message: language.errorUpdatingProfile,
							status: 'warning',
						});
					}
				} else {
					const aos = connect({ MODE: 'legacy' });

					let processSrc = null;
					try {
						const processSrcFetch = await fetch(getTxEndpoint(AO.profileSrc));
						if (processSrcFetch.ok) {
							processSrc = await processSrcFetch.text();

							const dateTime = new Date().getTime().toString();

							const profileTags: { name: string; value: string }[] = [
								{ name: 'Date-Created', value: dateTime },
								{ name: 'Action', value: 'CreateProfile' },
							];

							console.log('Spawning profile process...');
							const processId = await aos.spawn({
								module: AO.module,
								scheduler: AO.scheduler,
								signer: createDataItemSigner(arProvider.wallet),
								tags: profileTags,
							});

							console.log(`Process Id -`, processId);

							if (processId) {
								console.log('Sending source eval...');
								const evalMessage = await aos.message({
									process: processId,
									signer: createDataItemSigner(arProvider.wallet),
									tags: [{ name: 'Action', value: 'Eval' }],
									data: processSrc,
								});

								console.log(evalMessage);

								const evalResult = await aos.result({
									message: evalMessage,
									process: processId,
								});

								console.log(evalResult);

								await new Promise((r) => setTimeout(r, 1000));

								console.log('Updating profile data...');
								let updateResponse = await messageResult({
									processId: processId,
									action: 'Update-Profile',
									tags: null,
									data: data,
									wallet: arProvider.wallet,
								});

								if (updateResponse && updateResponse['Profile-Success']) {
									setProfileResponse({
										message: `${language.profileCreated}!`,
										status: 'success',
									});
									handleUpdate();
								} else {
									console.log(updateResponse);
									setProfileResponse(language.errorUpdatingProfile);
									setProfileResponse({
										message: language.errorUpdatingProfile,
										status: 'warning',
									});
								}
							} else {
								setProfileResponse({
									message: language.errorUpdatingProfile,
									status: 'warning',
								});
							}
						}
					} catch (e: any) {
						setProfileResponse({
							message: e.message ?? language.errorUpdatingProfile,
							status: 'warning',
						});
					}
				}
			} catch (e: any) {
				setProfileResponse(e.message ?? e);
			}
			setLoading(false);
		}
	}

	function getImageSizeMessage() {
		if (!avatar && !banner) return null;
		if (checkValidAddress(avatar) && checkValidAddress(banner)) return null;

		const avatarSize = avatar ? (avatar.length * 3) / 4 : 0;
		const bannerSize = banner ? (banner.length * 3) / 4 : 0;

		if (avatarSize > MAX_IMAGE_SIZE || bannerSize > MAX_IMAGE_SIZE)
			return <span>One or more images exceeds max size of 100KB</span>;
		return null;
	}

	function getInvalidBio() {
		if (bio && bio.length > MAX_BIO_LENGTH) {
			return {
				status: true,
				message: `${language.maxCharsReached} (${bio.length} / ${MAX_BIO_LENGTH})`,
			};
		}
		return { status: false, message: null };
	}

	function handleFileChange(e: React.ChangeEvent<HTMLInputElement>, type: 'banner' | 'avatar') {
		if (e.target.files && e.target.files.length) {
			const file = e.target.files[0];
			if (file.type.startsWith('image/')) {
				const reader = new FileReader();

				reader.onload = (event: ProgressEvent<FileReader>) => {
					if (event.target?.result) {
						switch (type) {
							case 'banner':
								setBanner(event.target.result);
								break;
							case 'avatar':
								setAvatar(event.target.result);
								break;
							default:
								break;
						}
					}
				};

				reader.readAsDataURL(file);
			}
			e.target.value = '';
		}
	}

	function getBannerWrapper() {
		if (banner) return <img src={checkValidAddress(banner) ? getTxEndpoint(banner) : banner} />;
		return (
			<>
				<ReactSVG src={ASSETS.media} />
				<span>{language.uploadBanner}</span>
			</>
		);
	}

	function getAvatarWrapper() {
		if (avatar) return <img src={checkValidAddress(avatar) ? getTxEndpoint(avatar) : avatar} />;
		return (
			<>
				<ReactSVG src={ASSETS.user} />
				<span>{language.uploadAvatar}</span>
			</>
		);
	}

	function getConnectedView() {
		if (!arProvider.walletAddress) return <WalletBlock />;
		else {
			return (
				<>
					<S.Wrapper>
						<S.Body>
							<S.PWrapper>
								<S.BWrapper>
									<S.BInput
										hasBanner={banner !== null}
										onClick={() => bannerInputRef.current.click()}
										disabled={loading}
									>
										{getBannerWrapper()}
									</S.BInput>
									<input
										ref={bannerInputRef}
										type={'file'}
										onChange={(e: any) => handleFileChange(e, 'banner')}
										disabled={loading}
										accept={ALLOWED_BANNER_TYPES}
									/>
									<S.AInput
										hasAvatar={avatar !== null}
										onClick={() => avatarInputRef.current.click()}
										disabled={loading}
									>
										{getAvatarWrapper()}
									</S.AInput>
									<input
										ref={avatarInputRef}
										type={'file'}
										onChange={(e: any) => handleFileChange(e, 'avatar')}
										disabled={loading}
										accept={ALLOWED_AVATAR_TYPES}
									/>
								</S.BWrapper>
								<S.PActions>
									<Button
										type={'primary'}
										label={language.removeAvatar}
										handlePress={() => setAvatar(null)}
										disabled={loading || !avatar}
									/>
									<Button
										type={'primary'}
										label={language.removeBanner}
										handlePress={() => setBanner(null)}
										disabled={loading || !banner}
									/>
								</S.PActions>
								<S.PInfoMessage>
									<span>Images have a max size of 100KB</span>
								</S.PInfoMessage>
							</S.PWrapper>
							<S.Form>
								<S.TForm>
									<FormField
										label={language.name}
										value={name}
										onChange={(e: any) => setName(e.target.value)}
										disabled={loading}
										invalid={{ status: false, message: null }}
										required
										hideErrorMessage
									/>
									<FormField
										label={language.handle}
										value={username}
										onChange={(e: any) => setUsername(e.target.value)}
										disabled={loading}
										invalid={{ status: false, message: null }}
										hideErrorMessage
										required
									/>
								</S.TForm>
								<TextArea
									label={language.bio}
									value={bio}
									onChange={(e: any) => setBio(e.target.value)}
									disabled={loading}
									invalid={getInvalidBio()}
								/>
							</S.Form>
							<S.SAction>
								{(!props.profile || !props.profile.id) && loading && (
									<S.Message>
										<span>{`${language.profileCreatingInfo}...`}</span>
									</S.Message>
								)}
								{props.handleClose && (
									<Button
										type={'primary'}
										label={language.close}
										handlePress={() => props.handleClose(true)}
										disabled={loading}
										loading={false}
									/>
								)}
								<Button
									type={'alt1'}
									label={language.save}
									handlePress={handleSubmit}
									disabled={!username || !name || loading || getImageSizeMessage() !== null}
									loading={loading}
								/>
							</S.SAction>
							{getImageSizeMessage() && <S.MInfoWrapper>{getImageSizeMessage()}</S.MInfoWrapper>}
						</S.Body>
					</S.Wrapper>
					{profileResponse && (
						<Notification message={profileResponse.message} callback={() => setProfileResponse(null)} />
					)}
				</>
			);
		}
	}

	return getConnectedView();
}
