import cn from 'classnames';
import { AnimatePresence, motion } from 'motion/react';
import React from 'react';
import css from './styles.module.scss';

interface IInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	variant?: 'primary' | 'secondary' | 'error';
	fieldName?: string;
}

export function Input({ fieldName, value, placeholder, variant = 'primary', className, ...props }: IInputProps) {
	const [isFocused, setIsFocused] = React.useState<boolean>(false);

	return (
		<div className={cn(css.inputField, fieldName && css.withName, css[variant], className)}>
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
					value={value}
					{...props}
				/>
			</motion.div>
		</div>
	);
}
