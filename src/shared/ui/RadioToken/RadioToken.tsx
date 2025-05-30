import React from 'react';
import { IToken } from 'shared/types';
import { hapticFeedback } from 'shared/utils/haptic';
import { Option } from './components/Option';
import { OptionLoader } from './components/OptionLoader';
import css from './styles.module.scss';

interface IRadioTokenProps {
	selected: IToken | null;
	options: IToken[];
	onSelect: (option: IToken) => void;
}

export function RadioToken({ selected, options, onSelect }: IRadioTokenProps) {
	const handleOnSelect = React.useCallback(
		(option: IToken) => {
			hapticFeedback('select');
			onSelect(option);
		},
		[onSelect]
	);

	return (
		<div className={css.radio}>
			{options.length === 0 && <OptionLoader />}
			{options.map((option, index) => (
				<Option
					key={index}
					selected={!!selected && selected.address === option.address}
					onClick={() => handleOnSelect(option)}
					value={option}
				/>
			))}
		</div>
	);
}
