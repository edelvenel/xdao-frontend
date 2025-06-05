import { Formik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router';
import { useProposals } from 'shared/api/proposals';
import { ICreateTransferGPProposalPayload } from 'shared/api/proposals/payloads';
import { ProposalCreateLayout } from 'shared/layouts/proposal-create-layout';
import { store } from 'shared/store';
import { ProposalType } from 'shared/types';
import { Dropdown } from 'shared/ui/Dropdown';
import { Input } from 'shared/ui/Input';
import { InputNumber } from 'shared/ui/InputNumber';
import { Title } from 'shared/ui/Title';
import { getUserFriendlyAddress, shortenAddress } from 'shared/utils/formatters';
import { ValidationError } from '../ValidationError';
import { VotingDuration } from '../VotingDuration';
import css from './styles.module.scss';
import { IForm, initialValues, validationSchema } from './types';

interface ITransferGPFormProps {
	onResponse: (value: boolean) => void;
}

export function TransferGPForm({ onResponse }: ITransferGPFormProps) {
	const [holderBalance, setHolderBalance] = React.useState<number | null>(null);
	const { dao, fetchHolders, holders } = store.useFormType();
	const { token } = store.useAuth();
	const { createProposal } = useProposals();

	const navigate = useNavigate();

	React.useEffect(() => {
		if (dao && token) {
			fetchHolders(token, dao.address);
		}
	}, [dao, fetchHolders, token]);

	const handleOnSubmit = React.useCallback(
		async (values: IForm) => {
			if (holders !== null) {
				const fromJettonWalletAddress = holders.find(
					(holder) => getUserFriendlyAddress(holder.owner_address) === getUserFriendlyAddress(values.fromWalletAddress)
				)?.jetton_wallet_address;

				const fromJettonWalletOwnerAddress = holders.find(
					(holder) => getUserFriendlyAddress(holder.owner_address) === getUserFriendlyAddress(values.fromWalletAddress)
				)?.jetton_wallet_address;

				if (!dao?.address || !fromJettonWalletAddress || !fromJettonWalletOwnerAddress) return;

				const payload: ICreateTransferGPProposalPayload = {
					type: ProposalType.TransferGPTokens,
					name: values.name,
					description: values.description,
					votingDuration: Number(values.votingDuration),
					fromJettonWalletAddress,
					fromJettonWalletOwnerAddress,
					toWalletAddress: values.toWalletAddress,
					tokenAmount: Number(values.tokenAmount),
				};

				try {
					await createProposal(payload, dao?.address ?? '');
					onResponse(true);
				} catch {
					onResponse(false);
				}
			}
		},
		[createProposal, dao?.address, holders, onResponse]
	);

	const getHolderBalance = React.useCallback(
		(walletAddress: string) => {
			const holder = holders?.find(
				(holder) => getUserFriendlyAddress(holder.owner_address) === getUserFriendlyAddress(walletAddress)
			);

			if (holder) {
				setHolderBalance(Number(holder.balance) / 10 ** 9);
			}
		},
		[holders]
	);

	return (
		<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleOnSubmit}>
			{(props) => (
				<ProposalCreateLayout onBack={() => navigate(-1)} onSubmit={props.handleSubmit}>
					<div className={css.form}>
						<div className={css.fields}>
							<div className={css.block}>
								<Title variant={'medium'} value="Transfer GP tokens" />
								<Input
									value={props.values.name}
									variant={props.errors.name !== undefined && props.touched.name ? 'error' : 'primary'}
									fieldName="Proposal name"
									placeholder="Create proposal name"
									onChange={(e) => props.setValues({ ...props.values, name: e.target.value })}
								/>
								<Input
									value={props.values.description}
									variant={props.errors.description !== undefined && props.touched.description ? 'error' : 'primary'}
									fieldName="Description"
									placeholder="Description"
									onChange={(e) => props.setValues({ ...props.values, description: e.target.value })}
								/>
								<VotingDuration
									value={props.values.votingDuration}
									variant={
										props.errors.votingDuration !== undefined && props.touched.votingDuration ? 'error' : 'primary'
									}
									setValue={(value) => props.setValues({ ...props.values, votingDuration: value })}
								/>
								<Dropdown
									selected={props.values.fromWalletAddress}
									options={
										holders ? [...new Set(holders.map((holder) => getUserFriendlyAddress(holder.owner_address)))] : []
									}
									optionLabel={(option) => shortenAddress(option)}
									variant={
										props.errors.fromWalletAddress !== undefined && props.touched.fromWalletAddress
											? 'error'
											: 'primary'
									}
									placeholder="From wallet address"
									onSelect={(value) => {
										props.setValues({ ...props.values, fromWalletAddress: value, tokenAmount: '' });
										getHolderBalance(value);
									}}
								/>
								<Dropdown
									placeholder="To wallet address"
									options={
										holders ? [...new Set(holders.map((holder) => getUserFriendlyAddress(holder.owner_address)))] : []
									}
									optionLabel={(option) => shortenAddress(option)}
									variant={
										props.errors.toWalletAddress !== undefined && props.touched.toWalletAddress ? 'error' : 'primary'
									}
									selected={props.values.toWalletAddress}
									onSelect={(value) => props.setValues({ ...props.values, toWalletAddress: value })}
								/>
								<InputNumber
									disabled={!holderBalance}
									variant={props.errors.tokenAmount !== undefined && props.touched.tokenAmount ? 'error' : 'primary'}
									value={String(props.values.tokenAmount ?? '')}
									max={holderBalance ?? 0}
									onMaxAmount={() =>
										props.setValues({
											...props.values,
											tokenAmount: (holderBalance ?? 0).toString(),
										})
									}
									fieldName="Token amount"
									placeholder="Add token amount"
									onUpdate={(value) =>
										props.setValues({
											...props.values,
											tokenAmount: Number(value) > holderBalance! ? holderBalance!.toString() : value,
										})
									}
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
