import React from 'react';
import { Icon } from 'shared/icons';
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
	const [answer, setAnswer] = React.useState<boolean>(false);
	const [voteDisabled, setVoteDisabled] = React.useState<boolean>(false);

	const handleOnConfirm = React.useCallback(() => {
		if (!answer) {
			setVoteDisabled(true);
			setTimeout(() => onConfirm(answer), 1000);
		}
	}, [answer, onConfirm]);

	return (
		<div className={css.vote}>
			<div className={css.infoText}>
				{currentPercent + voteImpact >= totalPercent ? 'You are the decisive vote!' : 'Vote impact preview'}
			</div>
			<div>
				<ProgressBar
					currentPercent={currentPercent}
					totalPercent={totalPercent}
					additionalPercent={voteImpact}
					isAdditionalPercentShown={answer}
				/>
			</div>
			<button type="button" disabled={voteDisabled} className={css.voteButton} onClick={() => setAnswer(!answer)}>
				<div className={css.icon}>{answer ? <Icon.Special.FilledRadioCheck /> : <Icon.Special.EmptyRadio />}</div>
				<span>Yes</span>
				<div className={css.reachText}>{`(Will reach ${currentPercent + voteImpact}%)`}</div>
			</button>
			<Slider disabled={answer === false} onDone={handleOnConfirm} />
		</div>
	);
}
