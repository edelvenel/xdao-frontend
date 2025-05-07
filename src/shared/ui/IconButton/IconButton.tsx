import cn from 'classnames';
import { motion } from 'framer-motion';
import React from 'react';
import { hapticFeedback } from 'shared/utils/haptic';
import css from './styles.module.scss';

interface IIconButtonProps
	extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	variant?: 'primary' | 'secondary';
	size?: 'large' | 'medium' | 'small' | 'tiny';
}

export function IconButton({
	variant = 'primary',
	size = 'medium',
	children,
	className,
	disabled,
	onClick,
	...props
}: IIconButtonProps) {
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
			className={cn(css.iconButton, css[variant], css[size], disabled && css.disabled)}
			whileTap={{ scale: !disabled ? 0.9 : 1 }}
		>
			<button disabled={disabled} className={cn(css.button, className)} onClick={handleOnClick} {...props}>
				{children}
			</button>
		</motion.div>
	);
}
