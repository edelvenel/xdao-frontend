import React from 'react';
import { Icon } from 'shared/icons';
import { hapticFeedback } from 'shared/utils/haptic';
import { IconButton } from '../IconButton';
import css from './styles.module.scss';

const setLabel = (value: number): string => {
	return value.toString();
};

interface IInputStepProps {
	step?: number;
	min?: number;
	max?: number;
	current: number;
	renderLabel?: (value: number) => string;
	onChange: (value: number) => void;
}

export function InputStep({
	step = 1,
	min = 0,
	max = 100,
	current,
	renderLabel = setLabel,
	onChange,
}: IInputStepProps) {
	const isDecrementDisabled: boolean = React.useMemo(() => current - step < min, [current, min, step]);
	const isIncrementDisabled: boolean = React.useMemo(() => current + step > max, [current, max, step]);

	const handleOnChange = React.useCallback(
		(value: number) => {
			hapticFeedback('press');
			onChange(value);
		},
		[onChange]
	);

	return (
		<div className={css.inputStep}>
			<IconButton
				variant="secondary"
				type="button"
				size="large"
				disabled={isDecrementDisabled}
				onClick={() => handleOnChange(current - step)}
			>
				<Icon.Common.Minus />
			</IconButton>
			<div className={css.label}>{renderLabel(current)}</div>
			<IconButton
				variant="primary"
				type="button"
				size="large"
				disabled={isIncrementDisabled}
				onClick={() => handleOnChange(current + step)}
			>
				<Icon.Common.Plus />
			</IconButton>
		</div>
	);
}
