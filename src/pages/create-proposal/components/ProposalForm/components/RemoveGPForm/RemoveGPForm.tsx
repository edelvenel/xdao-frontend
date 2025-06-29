import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useProposals } from 'shared/api/proposals';
import { ICreateRemoveGPProposalPayload } from 'shared/api/proposals/payloads';
import { ProposalCreateLayout } from 'shared/layouts/proposal-create-layout';
import { store } from 'shared/store';
import { ProposalType } from 'shared/types';
import { Dropdown } from 'shared/ui/Dropdown';
import { Input } from 'shared/ui/Input';
import { Title } from 'shared/ui/Title';
import { getUserFriendlyAddress } from 'shared/utils/formatters';
import { DistributionRules } from '../DistributionRules';
import { ValidationError } from '../ValidationError';
import { VotingDuration } from '../VotingDuration';
import css from './styles.module.scss';
import { getInitialValues, IForm, validationSchema } from './types';
interface IRemoveGPFormProps {
	onResponse: (value: boolean) => void;
}

export function RemoveGPForm({ onResponse }: IRemoveGPFormProps) {
	const { dao, fetchHolders, holders, removingWallet, setRemovingWallet } = store.useFormType();
	const { token } = store.useAuth();
	const { createProposal } = useProposals();

	const navigate = useNavigate();

	useEffect(() => {
		if (dao && token) {
			fetchHolders(token, dao.address);
		}

		return () => {
			setRemovingWallet(null);
		};
	}, [dao, fetchHolders, setRemovingWallet, token]);

	const handleOnSubmit = React.useCallback(
		async (values: IForm) => {
			if (holders !== null) {
				const holder = holders.find(
					(holder) => getUserFriendlyAddress(holder.owner_address) === getUserFriendlyAddress(values.gpToRemove)
				);

				const jettonWalletAddressToRemove = holder?.jetton_wallet_address;
				const jettonWalletOwnerAddressToRemove = holder?.owner_address;
				const tokenAmount = holder?.balance ? holder?.balance : undefined;

				if (!dao?.address || !jettonWalletAddressToRemove || !jettonWalletOwnerAddressToRemove || !tokenAmount) return;

				const payload: ICreateRemoveGPProposalPayload = {
					type: ProposalType.RemoveGP,
					name: values.name,
					description: values.description,
					jettonWalletAddressToRemove,
					jettonWalletOwnerAddressToRemove,
					votingDuration: Number(values.votingDuration),
					tokenAmount,
				};

				try {
					await createProposal(payload, dao.address);
					onResponse(true);
				} catch {
					onResponse(false);
				}
			}
		},
		[holders, dao?.address, createProposal, onResponse]
	);

	const handleGetInitialValues = React.useCallback((): IForm => {
		const form = getInitialValues(removingWallet);
		return form;
	}, [removingWallet]);

	return (
		<Formik initialValues={handleGetInitialValues()} validationSchema={validationSchema} onSubmit={handleOnSubmit}>
			{(props) => (
				<ProposalCreateLayout
					onBack={() => {
						navigate(-1);
					}}
					onSubmit={props.handleSubmit}
				>
					<div className={css.form}>
						<div className={css.fields}>
							<div className={css.block}>
								<Title variant={'medium'} value="Remove general partner" />
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
									selected={props.values.gpToRemove}
									options={
										holders ? [...new Set(holders.map((holder) => getUserFriendlyAddress(holder.owner_address)))] : []
									}
									optionLabel={(option) => getUserFriendlyAddress(option)}
									variant={props.errors.gpToRemove !== undefined && props.touched.gpToRemove ? 'error' : 'primary'}
									placeholder="Select GP to remove"
									onSelect={(value) => props.setValues({ ...props.values, gpToRemove: value })}
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
								{props.errors.gpToRemove && props.touched.gpToRemove ? (
									<ValidationError>{props.errors.gpToRemove}</ValidationError>
								) : null}
							</div>
							{props.values.gpToRemove && dao && (
								<div className={css.block}>
									<Title variant={'medium'} value="Update GP distribution" />
									<DistributionRules
										holders={
											holders
												? [
														...holders.filter(
															(holder) =>
																getUserFriendlyAddress(holder.owner_address) !==
																getUserFriendlyAddress(props.values.gpToRemove)
														),
													]
												: []
										}
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
