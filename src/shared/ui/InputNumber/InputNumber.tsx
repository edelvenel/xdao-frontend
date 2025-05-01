import cn from 'classnames';
import { AnimatePresence, motion } from 'motion/react';
import React from 'react';
import { hapticFeedback } from 'shared/utils/haptic';
import css from './styles.module.scss';

interface IInputAmountProps
	extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	fieldName?: string;
	variant?: 'primary' | 'error';
	onMaxAmount?: () => void;
	onUpdate: (value: string) => void;
}

export function InputNumber({
	onMaxAmount,
	onUpdate,
	className,
	fieldName,
	value,
	variant = 'primary',
	placeholder,
	max,
	min,
	...props
}: IInputAmountProps) {
	const [isFocused, setIsFocused] = React.useState<boolean>(false);

	const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
		(e) => {
			const chars: string[] = [];
			let dotCount = 0;
			let index = 0;
			for (const char of e.target.value) {
				if (char === '.') {
					if (index === 0) {
						chars.push('0');
					}
					dotCount++;
					if (dotCount <= 1) {
						chars.push(char);
						dotCount++;
					}
				} else if (/\d/.test(char)) {
					chars.push(char);
				}
				index++;
			}

			const result = chars.join('');

			if (max && Number(result) > Number(max)) {
				onUpdate(String(max));
				return;
			}

			if (min && Number(result) < Number(min)) {
				onUpdate(String(min));
				return;
			}

			onUpdate(result);
		},
		[max, min, onUpdate]
	);

	const handleOnMaxAmount = React.useCallback(() => {
		if (onMaxAmount) {
			hapticFeedback('press');
			onMaxAmount();
		}
	}, [onMaxAmount]);

	return (
		<div className={cn(css.inputNumber, className)}>
			<AnimatePresence initial={false}>
				{!isFocused && !value && (
					<motion.div
						key={'placeholder'}
						className={cn(css.placeholder, css[variant])}
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						transition={{ type: 'twin', ease: 'anticipate' }}
					>
						<div className={css.text}>{placeholder}</div>
					</motion.div>
				)}
			</AnimatePresence>

			<motion.div
				className={css.field}
				animate={{
					opacity: isFocused || value ? 1 : 0,
				}}
			>
				{(isFocused || value) && !!fieldName && <div className={css.fieldName}>{fieldName}</div>}
				<input
					className={cn(css.input, !!fieldName && css.withName, css[variant])}
					onBlur={() => setIsFocused(false)}
					onFocus={() => setIsFocused(true)}
					onChange={handleOnChange}
					value={value}
					{...props}
				/>
			</motion.div>

			{onMaxAmount && (
				<div className={css.maxButton} onClick={handleOnMaxAmount}>
					MAX
				</div>
			)}
		</div>
	);
}
