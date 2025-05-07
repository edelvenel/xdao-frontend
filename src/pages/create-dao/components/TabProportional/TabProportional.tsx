import React from 'react';
import { Icon } from 'shared/icons';
import { IDistributionRule } from 'shared/types';
import { Button } from 'shared/ui/Button';
import { IconButton } from 'shared/ui/IconButton';
import { InputNumber } from 'shared/ui/InputNumber';
import { InputStep } from 'shared/ui/InputStep';
import { Title } from 'shared/ui/Title';
import { DistributionRule } from './components/DistributionRule';
import css from './styles.module.scss';

interface ITabProportionalProps {
	currentConsensus: number;
	isManualConsensus: boolean;
	distributionRules: IDistributionRule[];
	setDistributionRules: (rules: IDistributionRule[]) => void;
	setCurrentConsensus: (value: number) => void;
	setIsManualConsensus: (value: boolean) => void;
	onInfo: () => void;
}

export function TabProportional({
	currentConsensus,
	isManualConsensus,
	distributionRules,
	setCurrentConsensus,
	setIsManualConsensus,
	setDistributionRules,
	onInfo,
}: ITabProportionalProps) {
	const handleOnDelete = React.useCallback(
		(idx: number) => {
			if (distributionRules.length > 2) {
				setDistributionRules([...distributionRules.filter((_, index) => index !== idx)]);
			} else {
				setDistributionRules([
					...distributionRules.filter((_, index) => index < idx),
					{ walletAddress: '', tokens: null, percent: 30 },
					...distributionRules.filter((_, index) => index > idx),
				]);
			}
		},
		[distributionRules, setDistributionRules]
	);

	return (
		<div className={css.tab}>
			<div className={css.block}>
				<Title variant={'medium'} value="Update GP distribution" />
				{distributionRules.map((rule, index) => (
					<DistributionRule
						key={index}
						rule={rule}
						onChange={(value) =>
							setDistributionRules([
								...distributionRules.filter((_, idx) => idx < index),
								{ ...value },
								...distributionRules.filter((_, idx) => idx > index),
							])
						}
						onDelete={() => handleOnDelete(index)}
					/>
				))}
				<Button
					variant="primary"
					onClick={() => setDistributionRules([...distributionRules, { walletAddress: '', percent: 30, tokens: null }])}
				>
					Add more
				</Button>
			</div>
			<div className={css.block}>
				<div className={css.setConsensusBlock}>
					<div className={css.title}>
						<div className={css.header}>
							<Title variant={'medium'} value="Current consensus" />
							<IconButton size="small" variant="secondary" onClick={onInfo}>
								<Icon.Common.QuestionSmall />
							</IconButton>
						</div>
					</div>
					<InputStep
						step={10}
						current={currentConsensus}
						onChange={setCurrentConsensus}
						renderLabel={(value) => `${value}%`}
					/>

					<InputNumber
						max={100}
						min={0}
						onUpdate={(value) => setCurrentConsensus(Number(value))}
						onFocus={() => setIsManualConsensus(true)}
						value={isManualConsensus ? currentConsensus : ''}
						placeholder="Enter amount manual"
					/>
				</div>
			</div>
		</div>
	);
}
