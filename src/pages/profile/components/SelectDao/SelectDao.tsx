import cn from 'classnames';
import React, { PropsWithChildren } from 'react';
import { IDao } from 'shared/types';
import { Button } from 'shared/ui/Button';
import css from './styles.module.scss';

interface ISelectDaoProps {
	selected: number | null;
	options: IDao[];
	onApply: (index: number | null) => void;
	onClose: () => void;
}

export function SelectDao({ selected, options, onApply, onClose }: ISelectDaoProps) {
	const [selectedIdx, setSelectedIdx] = React.useState<number | null>(selected);

	const handleOnApply = React.useCallback(() => {
		onApply(selectedIdx);
		onClose();
	}, [onApply, onClose, selectedIdx]);

	return (
		<div className={css.selectDao}>
			<div className={css.daoList}>
				{options.map((option, index) => (
					<SelectDaoOption key={index} selected={index === selectedIdx} onClick={() => setSelectedIdx(index)}>
						<div className={css.logo} style={{ backgroundImage: `url(${option.logo})` }} />
						<div className={css.name}>{option.name}</div>
						<div className={css.slots}>
							{option.slots.total > option.slots.reserved && (
								<>
									<span>Slots:</span>
									<div className={css.reserved}>{option.slots.reserved}</div>
									<span>/{option.slots.total}</span>
								</>
							)}
							{option.slots.total === option.slots.reserved && <span>Full</span>}
						</div>
					</SelectDaoOption>
				))}
			</div>
			<div className={css.button}>
				<Button
					disabled={selectedIdx === null || options[selectedIdx].slots.reserved === options[selectedIdx].slots.total}
					onClick={handleOnApply}
				>
					Claim a spot
				</Button>
			</div>
		</div>
	);
}

interface ISelectDaoOptionProps extends PropsWithChildren {
	selected: boolean;
	onClick: () => void;
}

function SelectDaoOption({ selected, children, onClick }: ISelectDaoOptionProps) {
	return (
		<div className={cn(css.option, selected && css.selected)} onClick={onClick}>
			{children}
		</div>
	);
}
