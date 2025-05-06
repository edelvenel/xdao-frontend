import cn from 'classnames';
import { AnimatePresence, motion } from 'motion/react';
import React, { CSSProperties } from 'react';
import css from './styles.module.scss';

interface IProgressBarInterface {
	currentPercent: number;
	totalPercent: number;
	additionalPercent: number;
	isAdditionalPercentShown: boolean;
}

export function ProgressBar({
	currentPercent,
	totalPercent,
	additionalPercent,
	isAdditionalPercentShown,
}: IProgressBarInterface) {
	const currentPart = React.useMemo(() => {
		if (currentPercent < 0) {
			return 0;
		} else if (currentPercent > totalPercent) {
			return 100;
		} else {
			return (currentPercent / totalPercent) * 100;
		}
	}, [currentPercent, totalPercent]);

	const additionalPart = React.useMemo(() => {
		if (additionalPercent < 0) {
			return (currentPercent / totalPercent) * 100;
		} else if (additionalPercent + currentPercent > totalPercent) {
			return 100;
		} else {
			return ((additionalPercent + currentPercent) / totalPercent) * 100;
		}
	}, [additionalPercent, currentPercent, totalPercent]);

	return (
		<div className={css.progressBar}>
			<AnimatePresence initial={true}>
				{isAdditionalPercentShown && (
					<motion.div
						initial={{ left: `calc(-1 * (100% - ${currentPart}%))` }}
						animate={{ left: `calc(-1 * (100% - ${additionalPart}%))` }}
						exit={{ left: `calc(-1 * (100% - ${currentPart}%))` }}
						transition={{ duration: 0.6 }}
						className={cn(css.additionalBar)}
					/>
				)}
			</AnimatePresence>
			<div className={css.currentBar} style={{ left: `calc(-1 * (100% - ${currentPart}%))` }} />

			<div className={css.text} style={{ '--dark-width': `${currentPart}%` } as CSSProperties}>
				<div className={css.currentPercent}>{`${currentPercent}%`}</div>
				<div className={css.rightBlock}>
					<AnimatePresence initial={false}>
						{!isAdditionalPercentShown && (
							<motion.div
								initial={{ opacity: 0, scale: 0.5 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.5 }}
								className={css.leftPercent}
							>{`${totalPercent - currentPercent}% left`}</motion.div>
						)}
					</AnimatePresence>
					<div className={css.totalPercent}>{`${totalPercent}%`}</div>
				</div>
			</div>
			<AnimatePresence initial={true}>
				{isAdditionalPercentShown && (
					<motion.div
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.5 }}
						className={css.additionalText}
						style={{ '--dark-width': `${currentPart}%` } as CSSProperties}
					>
						<div className={css.additionalPercent}>{`+${additionalPercent}% ↑`}</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
