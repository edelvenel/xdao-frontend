import { Formik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router';
import { useProposals } from 'shared/api/proposals';
import { ICreateAddGPProposalPayload } from 'shared/api/proposals/payloads';
import { ProposalCreateLayout } from 'shared/layouts/proposal-create-layout';
import { store } from 'shared/store';
import { IHolder, ProposalType } from 'shared/types';
import { Input } from 'shared/ui/Input';
import { InputNumber } from 'shared/ui/InputNumber';
import { Title } from 'shared/ui/Title';
import { getUserFriendlyAddress } from 'shared/utils/formatters';
import { DistributionRules } from '../DistributionRules';
import { ValidationError } from '../ValidationError';
import { VotingDuration } from '../VotingDuration';
import css from './styles.module.scss';
import { IForm, initialValues, validationSchema } from './types';

interface IAddGPFormProps {
	onResponse: (value: boolean) => void;
}

export function AddGPForm({ onResponse }: IAddGPFormProps) {
	const { dao, holders } = store.useFormType();
	const { createProposal } = useProposals();

	const navigate = useNavigate();

	const getHolders = React.useCallback(
		(walletAddress: string, tokenAmount: string): IHolder[] => {
			const userFriendlyAddress = getUserFriendlyAddress(walletAddress);
			if (holders) {
				const addresses = holders.map((holder) => getUserFriendlyAddress(holder.owner_address));
				if (addresses.includes(userFriendlyAddress)) {
					const holder = holders.find((holder) => getUserFriendlyAddress(holder.owner_address) === userFriendlyAddress);
					if (holder) {
						return [
							...holders.filter((hold) => hold.owner_address !== holder.owner_address),
							{
								...holder,
								balance: String(Number(holder.balance) + Number(tokenAmount) * 10 ** 9),
							},
						];
					}
				}
			}
			return [];
		},
		[holders]
	);

	const handleOnSubmit = React.useCallback(
		async (values: IForm) => {
			const payload: ICreateAddGPProposalPayload = {
				type: ProposalType.AddGP,
				name: values.name,
				description: values.description,
				votingDuration: Number(values.votingDuration),
				walletAddress: values.walletAddress,
				tokenAmount: Number(values.tokenAmount),
			};
			if (!dao?.address) return;

			try {
				await createProposal(payload, dao?.address);
				onResponse(true);
			} catch {
				onResponse(false);
			}
		},
		[createProposal, dao?.address, onResponse]
	);

	return (
		<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleOnSubmit}>
			{(props) => (
				<ProposalCreateLayout onSubmit={props.handleSubmit} onBack={() => navigate(-1)}>
					<div className={css.form}>
						<div className={css.fields}>
							<div className={css.block}>
								<Title variant={'medium'} value="Add general partner" />
								<Input
									variant={props.errors.name !== undefined && props.touched.name ? 'error' : 'primary'}
									value={props.values.name}
									fieldName="Proposal name"
									placeholder="Create proposal name"
									onChange={(e) => props.setValues({ ...props.values, name: e.target.value })}
								/>
								<Input
									variant={props.errors.description !== undefined && props.touched.description ? 'error' : 'primary'}
									value={props.values.description}
									fieldName="Description"
									placeholder="Description"
									onChange={(e) => props.setValues({ ...props.values, description: e.target.value })}
								/>
								<VotingDuration
									variant={
										props.errors.votingDuration !== undefined && props.touched.votingDuration ? 'error' : 'primary'
									}
									value={props.values.votingDuration}
									setValue={(value) => props.setValues({ ...props.values, votingDuration: value })}
								/>
								<Input
									variant={
										props.errors.walletAddress !== undefined && props.touched.walletAddress ? 'error' : 'primary'
									}
									value={props.values.walletAddress}
									fieldName="Wallet address"
									placeholder="Add wallet address"
									onChange={(e) => props.setValues({ ...props.values, walletAddress: e.target.value })}
								/>
								<InputNumber
									variant={props.errors.tokenAmount !== undefined && props.touched.tokenAmount ? 'error' : 'primary'}
									value={String(props.values.tokenAmount ?? '')}
									fieldName="Token amount"
									placeholder="Add token amount"
									onUpdate={(value) => props.setValues({ ...props.values, tokenAmount: value })}
								/>

								{props.errors.name && props.touched.name ? (
									<ValidationError>{props.errors.name}</ValidationError>
								) : null}
								{props.errors.description && props.touched.description ? (
									<ValidationError>{props.errors.description}</ValidationError>
								) : null}
								{props.errors.votingDuration && props.touched.votingDuration ? (
									<ValidationError>{props.errors.votingDuration}</ValidationError>
								) : null}
								{props.errors.walletAddress && props.touched.walletAddress ? (
									<ValidationError>{props.errors.walletAddress}</ValidationError>
								) : null}
								{props.errors.tokenAmount && props.touched.tokenAmount ? (
									<ValidationError>{props.errors.tokenAmount}</ValidationError>
								) : null}
							</div>
							{props.values.tokenAmount && props.values.walletAddress && !props.errors.walletAddress && dao && (
								<div className={css.block}>
									<Title variant={'medium'} value="Update GP distribution" />
									<DistributionRules
										holders={getHolders(props.values.walletAddress, props.values.tokenAmount)}
										oldHolders={holders ? [...holders] : []}
									/>
								</div>
							)}
						</div>
					</div>
				</ProposalCreateLayout>
			)}
		</Formik>
	);
}
