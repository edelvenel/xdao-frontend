import { Formik } from 'formik';
import React from 'react';
import { useProposals } from 'shared/api/proposals';
import { ICreateTransferGPProposalPayload } from 'shared/api/proposals/payloads';
import { ProposalCreateLayout } from 'shared/layouts/proposal-create-layout';
import { store } from 'shared/store';
import { ProposalType } from 'shared/types';
import { Dropdown } from 'shared/ui/Dropdown';
import { Input } from 'shared/ui/Input';
import { InputNumber } from 'shared/ui/InputNumber';
import { Title } from 'shared/ui/Title';
import { ValidationError } from '../ValidationError';
import { VotingDuration } from '../VotingDuration';
import css from './styles.module.scss';
import { IForm, initialValues, validationSchema } from './types';

interface ITransferGPFormProps {
	onResponse: (value: boolean) => void;
}

export function TransferGPForm({ onResponse }: ITransferGPFormProps) {
	const { dao } = store.useFormType();
	const { createProposal } = useProposals();

	const listDaoGp: string[] = React.useMemo(() => {
		return dao ? dao.distributionRules.flatMap((rule) => rule.walletAddress) : [];
	}, [dao]);

	const handleOnSubmit = React.useCallback(
		async (values: IForm) => {
			const payload: ICreateTransferGPProposalPayload = {
				type: ProposalType.TransferGPTokens,
				name: values.name,
				description: values.description,
				votingDuration: Number(values.votingDuration),
				fromWalletAddress: values.fromWalletAddress,
				toWalletAddress: values.toWalletAddress,
				tokenAmount: Number(values.tokenAmount),
			};

			try {
				await createProposal(payload);
				onResponse(true);
			} catch {
				onResponse(false);
			}
		},
		[createProposal, onResponse]
	);

	return (
		<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleOnSubmit}>
			{(props) => (
				<ProposalCreateLayout disabled={false} onClick={props.handleSubmit}>
					<div className={css.form}>
						<div className={css.fields}>
							<div className={css.block}>
								<Title variant={'medium'} value="Transfer general partner" />
								<Input
									value={props.values.name}
									variant={props.errors.name && props.touched.name ? 'error' : 'primary'}
									fieldName="Proposal name"
									placeholder="Create proposal name"
									onChange={(e) => props.setValues({ ...props.values, name: e.target.value })}
								/>
								<Input
									value={props.values.description}
									variant={props.errors.description && props.touched.description ? 'error' : 'primary'}
									fieldName="Description"
									placeholder="Description"
									onChange={(e) => props.setValues({ ...props.values, description: e.target.value })}
								/>
								<VotingDuration
									value={props.values.votingDuration}
									variant={props.errors.votingDuration && props.touched.votingDuration ? 'error' : 'primary'}
									setValue={(value) => props.setValues({ ...props.values, votingDuration: value })}
								/>
								<Dropdown
									selected={props.values.fromWalletAddress}
									options={listDaoGp}
									variant={props.errors.fromWalletAddress && props.touched.fromWalletAddress ? 'error' : 'primary'}
									placeholder="From wallet address"
									onSelect={(value) => props.setValues({ ...props.values, fromWalletAddress: value })}
								/>
								<Dropdown
									placeholder="To wallet address"
									options={listDaoGp}
									variant={props.errors.toWalletAddress && props.touched.toWalletAddress ? 'error' : 'primary'}
									selected={props.values.toWalletAddress}
									onSelect={(value) => props.setValues({ ...props.values, toWalletAddress: value })}
								/>
								<InputNumber
									variant={props.errors.tokenAmount && props.touched.tokenAmount ? 'error' : 'primary'}
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
								{props.errors.fromWalletAddress && props.touched.fromWalletAddress ? (
									<ValidationError>{props.errors.fromWalletAddress}</ValidationError>
								) : null}
								{props.errors.toWalletAddress && props.touched.toWalletAddress ? (
									<ValidationError>{props.errors.toWalletAddress}</ValidationError>
								) : null}
								{props.errors.tokenAmount && props.touched.tokenAmount ? (
									<ValidationError>{props.errors.tokenAmount}</ValidationError>
								) : null}
							</div>
						</div>
					</div>
				</ProposalCreateLayout>
			)}
		</Formik>
	);
}
