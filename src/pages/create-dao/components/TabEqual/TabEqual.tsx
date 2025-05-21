import { FormikErrors } from 'formik';
import { IForm } from 'pages/create-dao/types';
import { ValidationError } from 'pages/create-proposal/components/ProposalForm/components/ValidationError';
import React from 'react';
import { Icon } from 'shared/icons';
import { Button } from 'shared/ui/Button';
import { IconButton } from 'shared/ui/IconButton';
import { Input } from 'shared/ui/Input';
import { InputStep } from 'shared/ui/InputStep';
import { Title } from 'shared/ui/Title';
import css from './styles.module.scss';

interface ITabEqualProps {
	walletAddresses: string[];
	consensus: number;
	errors: FormikErrors<IForm>;
	setWalletAddresses: (addresses: string[]) => void;
	setConsensus: (value: number) => void;
	onSetupInfo: () => void;
}

export function TabEqual({
	walletAddresses,
	consensus,
	errors,
	setWalletAddresses,
	setConsensus,
	onSetupInfo,
}: ITabEqualProps) {
	const handleOnDelete = React.useCallback(
		(idx: number) => {
			if (walletAddresses.length > 1) {
				const newWalletAddresses = walletAddresses.filter((_, index) => index !== idx);
				setWalletAddresses([...newWalletAddresses]);
			} else {
				setWalletAddresses(['']);
			}
		},
		[setWalletAddresses, walletAddresses]
	);

	return (
		<div className={css.tab}>
			<div className={css.block}>
				<Title value="Add General Partners" variant="medium" />
				{walletAddresses.map((waddr, index) => (
					<div className={css.field}>
						<Input
							key={index}
							value={waddr}
							className={css.input}
							placeholder="Wallet Address"
							variant={errors.walletAddresses && errors.walletAddresses[index] !== undefined ? 'error' : 'primary'}
							onChange={(e) =>
								setWalletAddresses([
									...walletAddresses.filter((_, idx) => idx < index),
									e.target.value,
									...walletAddresses.filter((_, idx) => idx > index),
								])
							}
						/>

						<div className={css.deleteButton} onClick={() => handleOnDelete(index)}>
							<Icon.Common.Cancel />
						</div>
					</div>
				))}

				<Button variant="primary" onClick={() => setWalletAddresses([...walletAddresses, ''])}>
					Add more
				</Button>

				{errors.walletAddresses
					? typeof errors.walletAddresses !== 'string' &&
					  errors.walletAddresses.map((error) => error && <ValidationError>{error}</ValidationError>)
					: null}
			</div>

			<div className={css.block}>
				<div className={css.header}>
					<Title value="Set-up consensus" variant="medium" />
					<IconButton size="small" variant="secondary" onClick={onSetupInfo}>
						<Icon.Common.QuestionSmall />
					</IconButton>
				</div>
				<InputStep
					current={consensus > walletAddresses.length ? 1 : consensus}
					onChange={setConsensus}
					max={walletAddresses.length}
					min={1}
					step={1}
					renderLabel={(value) => `${value} of ${walletAddresses.length}`}
				/>
			</div>
		</div>
	);
}
