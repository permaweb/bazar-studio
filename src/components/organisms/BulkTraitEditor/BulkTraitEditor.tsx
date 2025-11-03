import React from 'react';

import { Button } from 'components/atoms/Button';
import { FormField } from 'components/atoms/FormField';
import { Modal } from 'components/molecules/Modal';
import { useLanguageProvider } from 'providers/LanguageProvider';

import * as S from './styles';
import { IProps } from './types';

export default function BulkTraitEditor(props: IProps) {
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [showModal, setShowModal] = React.useState<boolean>(false);
	const [traitType, setTraitType] = React.useState<string>('');
	const [traitValue, setTraitValue] = React.useState<string>('');
	const [selectedAssets, setSelectedAssets] = React.useState<Set<string>>(new Set());

	const handleApplyToSelected = () => {
		if (traitType.trim() && traitValue.trim() && selectedAssets.size > 0) {
			const newTrait = { trait_type: traitType.trim(), value: traitValue.trim() };
			props.onApplyToAssets(Array.from(selectedAssets), newTrait);
			setTraitType('');
			setTraitValue('');
			setSelectedAssets(new Set());
			setShowModal(false);
		}
	};

	const handleSelectAll = () => {
		if (selectedAssets.size === props.assets.length) {
			setSelectedAssets(new Set());
		} else {
			setSelectedAssets(new Set(props.assets.map((asset) => asset.file.name)));
		}
	};

	const handleSelectAsset = (fileName: string) => {
		const newSelected = new Set(selectedAssets);
		if (newSelected.has(fileName)) {
			newSelected.delete(fileName);
		} else {
			newSelected.add(fileName);
		}
		setSelectedAssets(newSelected);
	};

	return (
		<>
			<S.Wrapper>
				<S.Header>
					<span>Bulk Trait Editor</span>
					<Button
						type={'alt2'}
						label={'Bulk Edit'}
						handlePress={() => setShowModal(true)}
						disabled={props.assets.length === 0}
					/>
				</S.Header>
				<S.Info>
					<span>Apply the same trait to multiple assets at once</span>
				</S.Info>
			</S.Wrapper>

			{showModal && (
				<Modal header={'Bulk Trait Editor'} handleClose={() => setShowModal(false)}>
					<S.ModalWrapper>
						<S.Section>
							<S.SectionTitle>Select Assets</S.SectionTitle>
							<S.AssetList>
								<S.SelectAllRow>
									<S.Checkbox
										type="checkbox"
										checked={selectedAssets.size === props.assets.length}
										onChange={handleSelectAll}
									/>
									<S.SelectAllLabel>Select All ({props.assets.length})</S.SelectAllLabel>
								</S.SelectAllRow>
								{props.assets.map((asset, index) => (
									<S.AssetRow key={index}>
										<S.Checkbox
											type="checkbox"
											checked={selectedAssets.has(asset.file.name)}
											onChange={() => handleSelectAsset(asset.file.name)}
										/>
										<S.AssetName>{asset.title || asset.file.name}</S.AssetName>
										<S.AssetTraits>
											{asset.traits && asset.traits.length > 0 ? (
												asset.traits.map((trait: any, traitIndex: number) => (
													<S.ExistingTrait key={traitIndex}>
														{trait.trait_type}: {trait.value}
													</S.ExistingTrait>
												))
											) : (
												<S.NoTraits>No traits</S.NoTraits>
											)}
										</S.AssetTraits>
									</S.AssetRow>
								))}
							</S.AssetList>
						</S.Section>

						<S.Section>
							<S.SectionTitle>Add Trait</S.SectionTitle>
							<S.TraitForm>
								<FormField
									label={'Trait Type'}
									value={traitType}
									onChange={(e: any) => setTraitType(e.target.value)}
									placeholder={'e.g., Background, Rarity, Type'}
									disabled={false}
									invalid={{ status: false, message: null }}
								/>
								<FormField
									label={'Trait Value'}
									value={traitValue}
									onChange={(e: any) => setTraitValue(e.target.value)}
									placeholder={'e.g., Blue, Legendary, Character'}
									disabled={false}
									invalid={{ status: false, message: null }}
								/>
							</S.TraitForm>
						</S.Section>

						<S.ModalActions>
							<Button type={'primary'} label={'Cancel'} handlePress={() => setShowModal(false)} noMinWidth />
							<Button
								type={'alt1'}
								label={`Apply to ${selectedAssets.size} Assets`}
								handlePress={handleApplyToSelected}
								disabled={!traitType.trim() || !traitValue.trim() || selectedAssets.size === 0}
								noMinWidth
							/>
						</S.ModalActions>
					</S.ModalWrapper>
				</Modal>
			)}
		</>
	);
}
