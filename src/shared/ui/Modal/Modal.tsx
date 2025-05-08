import cn from 'classnames';
import { AnimatePresence, motion } from 'motion/react';
import React from 'react';
import { createPortal } from 'react-dom';
import { Icon } from 'shared/icons';
import { Svg } from 'shared/svg';
import { hapticFeedback } from 'shared/utils/haptic';
import { IconButton } from '../IconButton';
import { Title } from '../Title';
import css from './styles.module.scss';

interface IModalProps extends React.HTMLAttributes<HTMLDivElement> {
	isOpen: boolean;
	isBackgroundOn?: boolean;
	title?: string;
	titleAlign?: 'left' | 'center';
	onClose: () => void;
}

export function Modal({
	isOpen,
	children,
	title,
	titleAlign = 'left',
	className,
	isBackgroundOn = false,
	onClose,
}: IModalProps) {
	const ref = React.useRef<HTMLDivElement>(null);
	const handleOnClose = React.useCallback(() => {
		hapticFeedback('press');
		onClose();
	}, [onClose]);

	React.useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				onClose();
			}
		};
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}
		return () => {
			if (isOpen) {
				document.removeEventListener('mousedown', handleClickOutside);
			}
		};
	}, [isOpen, onClose]);

	return createPortal(
		<AnimatePresence>
			{isOpen && (
				<motion.div className={css.overlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
					<AnimatePresence propagate>
						<motion.div
							transition={{ duration: 0.3, type: 'tween' }}
							initial={{ opacity: 0, y: '100%' }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: '100%' }}
							className={cn(css.modal, className)}
							ref={ref}
						>
							<div className={css.closeButton}>
								<IconButton variant="secondary" onClick={handleOnClose}>
									<Icon.Common.Cancel />
								</IconButton>
							</div>

							<div className={css.header}>
								{title && (
									<div className={cn(css.title, css[titleAlign])}>
										<Title variant="large" value={title} />
									</div>
								)}
							</div>
							<div className={css.content}>{children}</div>
							{isBackgroundOn && <div className={css.background}>{<Svg.Background.Common />}</div>}
						</motion.div>
					</AnimatePresence>
				</motion.div>
			)}
		</AnimatePresence>,
		document.body
	);
}
