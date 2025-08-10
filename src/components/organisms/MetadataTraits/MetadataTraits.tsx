import React from 'react';
import { ReactSVG } from 'react-svg';

import { Button } from 'components/atoms/Button';
import { FormField } from 'components/atoms/FormField';
import { IconButton } from 'components/atoms/IconButton';
import { Modal } from 'components/molecules/Modal';
import { ASSETS } from 'helpers/config';
import { useLanguageProvider } from 'providers/LanguageProvider';

import * as S from './styles';
import { IProps } from './types';

export default function MetadataTraits(props: IProps) {
	const languageProvider = useLanguageProvider();
	const language = languageProvider.object[languageProvider.current];

	const [showAddTrait, setShowAddTrait] = React.useState<boolean>(false);
	const [newTraitType, setNewTraitType] = React.useState<string>('');
	const [newTraitValue, setNewTraitValue] = React.useState<string>('');

	const handleAddTrait = () => {
		if (newTraitType.trim() && newTraitValue.trim()) {
			props.onAddTrait({
				trait_type: newTraitType.trim(),
				value: newTraitValue.trim(),
			});
			setNewTraitType('');
			setNewTraitValue('');
			setShowAddTrait(false);
		}
	};

	const handleRemoveTrait = (index: number) => {
		props.onRemoveTrait(index);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		handleAddTrait();
	};

	return (
		<>
			<S.Wrapper>
				<S.Header>
					<span>Metadata Traits</span>
					<Button type={'alt2'} label={'Add Trait'} handlePress={() => setShowAddTrait(true)} disabled={false} />
				</S.Header>
				<S.Info>
					<span>Add custom traits to your assets (e.g., Background: Blue, Rarity: Legendary)</span>
					{props.assetCount > 1 && (
						<S.InfoNote>
							<span>Note: These traits will be applied to all {props.assetCount} assets in this upload.</span>
						</S.InfoNote>
					)}
				</S.Info>

				{/* Trait Templates for Large Collections */}
				{props.showTemplates && props.existingTraits && props.existingTraits.length > 0 && (
					<S.TemplatesSection>
						<S.TemplatesHeader>
							<span>Quick Apply Templates</span>
							<S.TemplatesInfo>
								<span>Click to apply or edit trait values</span>
							</S.TemplatesInfo>
						</S.TemplatesHeader>
						<S.TemplatesList>
							{props.existingTraits.map((template, index) => (
								<S.TemplateItem key={index}>
									<S.TemplateType>{template.trait_type}</S.TemplateType>
									<S.TemplateValues>
										{template.values.map((value, valueIndex) => (
											<S.TemplateValue
												key={valueIndex}
												onClick={() => {
													if (props.onApplyTemplate) {
														const newTrait = { trait_type: template.trait_type, value };
														const updatedTraits = [...props.traits, newTrait];
														props.onApplyTemplate(updatedTraits);
													}
												}}
											>
												{value}
											</S.TemplateValue>
										))}
										<S.TemplateValueEdit
											onClick={() => {
												setNewTraitType(template.trait_type);
												setNewTraitValue('');
												setShowAddTrait(true);
											}}
										>
											+ Custom Value
										</S.TemplateValueEdit>
									</S.TemplateValues>
								</S.TemplateItem>
							))}
						</S.TemplatesList>
					</S.TemplatesSection>
				)}
				<S.TraitsList>
					{props.traits.map((trait, index) => (
						<S.TraitItem key={index}>
							<S.TraitContent>
								<S.TraitType>{trait.trait_type}</S.TraitType>
								<S.TraitValue>{trait.value}</S.TraitValue>
							</S.TraitContent>
							<IconButton
								type={'primary'}
								src={ASSETS.close}
								handlePress={() => handleRemoveTrait(index)}
								dimensions={{ wrapper: 21.5, icon: 8.5 }}
							/>
						</S.TraitItem>
					))}
					{props.traits.length === 0 && (
						<S.EmptyState>
							<span>No traits added yet. Click "Add Trait" to get started.</span>
						</S.EmptyState>
					)}
				</S.TraitsList>
			</S.Wrapper>

			{showAddTrait && (
				<Modal header={'Add Metadata Trait'} handleClose={() => setShowAddTrait(false)}>
					<S.ModalWrapper onSubmit={handleSubmit}>
						<FormField
							label={'Trait Type'}
							value={newTraitType}
							onChange={(e: any) => setNewTraitType(e.target.value)}
							disabled={false}
							invalid={{ status: false, message: null }}
							placeholder={'e.g., Background, Rarity, Type'}
							required
						/>
						<FormField
							label={'Trait Value'}
							value={newTraitValue}
							onChange={(e: any) => setNewTraitValue(e.target.value)}
							disabled={false}
							invalid={{ status: false, message: null }}
							placeholder={'e.g., Blue, Legendary, Character'}
							required
						/>
						<S.ModalActions>
							<Button type={'primary'} label={'Cancel'} handlePress={() => setShowAddTrait(false)} noMinWidth />
							<Button
								type={'alt1'}
								label={'Add Trait'}
								handlePress={handleAddTrait}
								disabled={!newTraitType.trim() || !newTraitValue.trim()}
								noMinWidth
							/>
						</S.ModalActions>
					</S.ModalWrapper>
				</Modal>
			)}
		</>
	);
}
