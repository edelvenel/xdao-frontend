import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { PropsWithChildren } from 'react';
import { Icon } from 'shared/icons';
import css from './styles.module.scss';

interface ICollapseProps extends PropsWithChildren {
	label: string;
	isOpen: boolean;
	onClick: () => void;
}

export function Collapse({ label, isOpen, children, onClick }: ICollapseProps) {
	return (
		<div className={css.collapse}>
			<div className={css.title} onClick={onClick}>
				{label}
				<motion.div
					transition={{ ease: 'easeOut', duration: 0.2 }}
					animate={{
						rotate: isOpen ? 180 : 0,
					}}
					className={cn(css.icon)}
				>
					<Icon.Common.ChevronDown />
				</motion.div>
			</div>
			<AnimatePresence initial={false}>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0, paddingTop: 0 }}
						animate={{ opacity: 1, height: 'auto', paddingTop: 9 }}
						exit={{ opacity: 0, height: 0, paddingTop: 0 }}
					>
						<div className={css.content}>{children}</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
