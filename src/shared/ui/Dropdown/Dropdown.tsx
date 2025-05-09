import { autoPlacement, autoUpdate, offset, size, useDismiss, useFloating, useInteractions } from '@floating-ui/react';
import cn from 'classnames';
import { AnimatePresence, motion } from 'motion/react';
import React, { ReactNode } from 'react';
import { Icon } from 'shared/icons';
import { hapticFeedback } from 'shared/utils/haptic';
import css from './styles.module.scss';

const DEFAULT_DROPDOWN_MATCHER = (a: unknown, b: unknown) => a === b;

const DEFAULT_DROPDOWN_OPTION_LABEL = (option: unknown) => String(option);

interface IDropdownProps<T> {
	selected: T | null;
	options: T[];
	label?: string;
	placeholder?: string;
	className?: string;
	variant?: 'primary' | 'error';
	optionLogo?: (option: T) => string;
	matcher?: (a: T, b: T) => boolean;
	optionLabel?: (option: T) => string | ReactNode;
	onSelect: (option: T) => void;
}

export function Dropdown<T>({
	selected,
	options,
	label,
	placeholder,
	className,
	variant = 'primary',
	optionLogo,
	matcher = DEFAULT_DROPDOWN_MATCHER,
	optionLabel = DEFAULT_DROPDOWN_OPTION_LABEL,
	onSelect,
}: IDropdownProps<T>) {
	const [isOpen, setIsOpen] = React.useState<boolean>(false);

	const { refs, floatingStyles, context } = useFloating({
		middleware: [
			offset(8),
			size({
				apply({ rects, elements }) {
					Object.assign(elements.floating.style, {
						minWidth: `${rects.reference.width}px`,
						maxWidth: `${rects.reference.width}px`,
					});
				},
			}),
			autoPlacement({ alignment: 'end' }),
		],
		open: isOpen,
		onOpenChange: setIsOpen,
		whileElementsMounted: autoUpdate,
	});

	const dismiss = useDismiss(context);

	const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

	const handleOnClick = React.useCallback(
		(option: T) => {
			hapticFeedback('select');
			setIsOpen(false);
			onSelect(option);
		},
		[onSelect]
	);

	const handleOnOpen = React.useCallback(() => {
		hapticFeedback('press');
		setIsOpen(!isOpen);
	}, [isOpen]);

	return (
		<div className={cn(css.dropdown, className)}>
			<div
				ref={refs.setReference}
				className={cn(css.selected, css[variant])}
				onClick={handleOnOpen}
				{...getReferenceProps()}
			>
				<span className={cn(css.option, !selected && css.placeholder, css[variant])}>
					{!selected && placeholder && <span>{placeholder}</span>}
					{optionLogo && selected && (
						<div className={css.logo} style={{ backgroundImage: `url(${optionLogo(selected)})` }} />
					)}
					{label && <span className={css.text}>{label}: </span>}
					{selected && <span className={css.text}>{optionLabel(selected)}</span>}
				</span>
				<motion.div
					transition={{ ease: 'easeOut', duration: 0.2 }}
					animate={{
						rotate: isOpen ? 180 : 0,
					}}
					className={cn(css.icon)}
				>
					<Icon.Common.ChevronDown className={css.icon} />
				</motion.div>
			</div>
			<AnimatePresence initial={false}>
				{isOpen && (
					<motion.div
						ref={refs.setFloating}
						className={css.options}
						style={floatingStyles}
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						{...getFloatingProps()}
					>
						<div className={css.optionsPadding}>
							{options.map((option, index) => {
								return (
									<div
										key={index}
										className={cn(
											css.option,
											selected && matcher(option, selected) && css.active,
											optionLogo ? css.paddingWithLogo : css.paddingWithoutLogo
										)}
										onClick={() => handleOnClick(option)}
									>
										<div className={css.optionInfo}>
											{optionLogo && (
												<div className={css.logo} style={{ backgroundImage: `url(${optionLogo(option)})` }} />
											)}
											<span className={css.label}>{optionLabel(option)}</span>
										</div>
										{selected && matcher(option, selected) && <Icon.Common.Check />}
									</div>
								);
							})}
							{options.length === 0 && <div className={css.placeholder}>No options</div>}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
