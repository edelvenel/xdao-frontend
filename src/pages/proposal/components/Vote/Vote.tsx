import React from 'react';
import { ProgressBar } from 'shared/ui/ProgressBar';
import { Slider } from 'shared/ui/Slider';
import css from './styles.module.scss';

interface IVoteProps {
	currentPercent: number;
	totalPercent: number;
	voteImpact: number;
	onConfirm: (answer: boolean) => void;
}

export function Vote({ currentPercent, totalPercent, voteImpact, onConfirm }: IVoteProps) {
	const handleOnConfirm = React.useCallback(() => {
		setTimeout(() => onConfirm(true), 1000);
	}, [onConfirm]);

	return (
		<div className={css.vote}>
			<div className={css.infoText}>{`You reach ${(currentPercent + voteImpact).toFixed(2)}% after your vote`}</div>
			<div>
				<ProgressBar
					currentPercent={currentPercent}
					totalPercent={totalPercent}
					additionalPercent={voteImpact}
					isAdditionalPercentShown
				/>
			</div>
			<Slider onDone={handleOnConfirm} />
		</div>
	);
}
