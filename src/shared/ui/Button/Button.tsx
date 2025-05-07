import cn from 'classnames';
import { motion } from 'motion/react';
import React from 'react';
import { hapticFeedback } from 'shared/utils/haptic';
import css from './styles.module.scss';

interface IButtonProps
	extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	variant?: 'primary' | 'secondary' | 'accent' | 'tetriary';
}

export function Button({ variant = 'primary', children, className, disabled, onClick, ...props }: IButtonProps) {
	const handleOnClick = React.useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			hapticFeedback('press');
			if (onClick) {
				onClick(event);
			}
		},
		[onClick]
	);

	return (
		<motion.div
			className={cn(css.buttonBox, css[variant], disabled && css.disabled)}
			whileTap={{ scale: !disabled ? 0.98 : 1 }}
		>
			<button disabled={disabled} className={cn(css.button, className)} onClick={handleOnClick} {...props}>
				{children}
			</button>
		</motion.div>
	);
}
