import cn from 'classnames';
import React from 'react';
import { Icon } from 'shared/icons';
import { Dropdown } from 'shared/ui/Dropdown';
import { InputNumber } from 'shared/ui/InputNumber';
import css from './styles.module.scss';

const votingDurations = ['2 Days', '3 Days', '4 Days', 'Custom'];

interface IVotingDurationProps {
	variant?: 'primary' | 'error';
	value: number | null;
	setValue: (value: number | null) => void;
}

export function VotingDuration({ value, variant = 'primary', setValue }: IVotingDurationProps) {
	const [isCustom, setIsCustom] = React.useState<boolean>(false);
	const [selected, setSelected] = React.useState<string | null>(null);

	const handleOnSelect = React.useCallback(
		(option: string) => {
			setSelected(option);

			switch (option) {
				case '2 Days': {
					setValue(2);
					break;
				}
				case '3 Days': {
					setValue(3);
					break;
				}
				case '4 Days': {
					setValue(4);
					break;
				}
				default:
					break;
			}
		},
		[setValue]
	);

	const handleOnRestore = React.useCallback(() => {
		setSelected(null);
		setValue(null);
	}, [setValue]);

	React.useEffect(() => {
		setIsCustom(selected === 'Custom');
	}, [selected]);

	return (
		<div className={css.votingDuragion}>
			{!isCustom && (
				<Dropdown
					variant={variant}
					placeholder="Select voting duration"
					onSelect={handleOnSelect}
					options={votingDurations}
					selected={selected}
				/>
			)}
			{isCustom && (
				<div className={cn(css.custom, css[variant])}>
					<InputNumber
						variant={variant}
						className={css.inputNumber}
						value={value === null ? '' : value}
						min={0}
						fieldName="Voting duration"
						placeholder="Enter the number of voting duration"
						onUpdate={(value) => setValue(Number(value))}
					/>
					<div className={css.restoreButton} onClick={handleOnRestore}>
						<Icon.Common.Restore />
					</div>
				</div>
			)}
		</div>
	);
}
