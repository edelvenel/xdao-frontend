import { AnimatePresence, motion } from 'framer-motion';
import React, { PropsWithChildren } from 'react';
import { Icon } from 'shared/icons';
import { Button } from 'shared/ui/Button';
import css from './styles.module.scss';

interface IFilterProps<T> {
	selected: string;
	options: string[];
	mapper: (value: string) => T;
	onApply: (value: T) => void;
	onClose: () => void;
}

export function Filter<T>({ selected, options, mapper, onApply, onClose }: IFilterProps<T>) {
	const [currentSelected, setCurrentSelected] = React.useState<string>(selected);

	const handleOnApply = React.useCallback(() => {
		onApply(mapper(currentSelected));
		onClose();
	}, [currentSelected, mapper, onApply, onClose]);

	return (
		<div className={css.filter}>
			<div className={css.filterList}>
				{options.map((option, index) => (
					<FilterOption key={index} selected={option === currentSelected} onClick={() => setCurrentSelected(option)}>
						{option}
					</FilterOption>
				))}
			</div>
			<div className={css.button}>
				<Button onClick={handleOnApply}>Apply</Button>
			</div>
		</div>
	);
}

interface IFilterOptionProps extends PropsWithChildren {
	selected: boolean;
	onClick: () => void;
}

function FilterOption({ selected, children, onClick }: IFilterOptionProps) {
	return (
		<div className={css.option} onClick={onClick}>
			<div className={css.value}>{children}</div>

			<div className={css.icon}>
				<AnimatePresence initial={false}>
					{!selected && (
						<motion.div transition={{ type: 'tween', duration: 0.2 }} initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
							<Icon.Special.EmptyRadio />
						</motion.div>
					)}
				</AnimatePresence>
				{selected && (
					<motion.div transition={{ type: 'tween', duration: 0.2 }} initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
						<Icon.Special.FilledRadioCheck />
					</motion.div>
				)}
			</div>
		</div>
	);
}
