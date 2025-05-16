import { Formik } from 'formik';
import React from 'react';
import { useProposals } from 'shared/api/proposals';
import { ICreateChangeGPTransferStatusProposalPayload } from 'shared/api/proposals/payloads';
import { ProposalCreateLayout } from 'shared/layouts/proposal-create-layout';
import { store } from 'shared/store';
import { DaoStatus, ProposalType } from 'shared/types';
import { Badge } from 'shared/ui/Badge';
import { Dropdown } from 'shared/ui/Dropdown';
import { Input } from 'shared/ui/Input';
import { Title } from 'shared/ui/Title';
import { ValidationError } from '../ValidationError';
import { VotingDuration } from '../VotingDuration';
import css from './styles.module.scss';
import { getValidationSchema, IForm, initialValues } from './types';

interface IChangeGPTransferStatusFormProps {
	onResponse: (value: boolean) => void;
}

export function ChangeGPTransferStatusForm({ onResponse }: IChangeGPTransferStatusFormProps) {
	const { dao } = store.useFormType();
	const { createProposal } = useProposals();

	const handleOnSubmit = React.useCallback(
		async (values: IForm) => {
			const payload: ICreateChangeGPTransferStatusProposalPayload = {
				type: ProposalType.ChangeGPTransferStatus,
				name: values.name,
				description: values.description,
				votingDuration: Number(values.votingDuration),
				newStatus: String(values.newStatus),
			};

			try {
				await createProposal(payload, dao?.address ?? '');
				onResponse(true);
			} catch {
				onResponse(false);
			}
		},
		[createProposal, dao, onResponse]
	);

	if (!dao) {
		return null;
	}

	const validationSchema = getValidationSchema(dao.status);

	return (
		<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleOnSubmit}>
			{(props) => (
				<ProposalCreateLayout disabled={false} onClick={props.handleSubmit}>
					<div className={css.form}>
						<div className={css.fields}>
							<div className={css.block}>
								<Title variant={'medium'} value="Change GP transfer status" />
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
								<div className={css.currentStatus}>
									<span>Current status</span>
									<Badge capitalized text={dao.status} variant="blue" />
								</div>
								<Dropdown
									selected={props.values.newStatus}
									variant={props.errors.newStatus !== undefined && props.touched.newStatus ? 'error' : 'primary'}
									options={[DaoStatus.Transferable, DaoStatus.NonTransferable]}
									placeholder="Select new status"
									onSelect={(value) => props.setValues({ ...props.values, newStatus: value })}
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
								{props.errors.newStatus && props.touched.newStatus ? (
									<ValidationError>{props.errors.newStatus}</ValidationError>
								) : null}
							</div>
						</div>
					</div>
				</ProposalCreateLayout>
			)}
		</Formik>
	);
}
