import { Formik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router';
import { useProposals } from 'shared/api/proposals';
import { ICreateChangeDAONameProposalPayload } from 'shared/api/proposals/payloads';
import { ProposalCreateLayout } from 'shared/layouts/proposal-create-layout';
import { store } from 'shared/store';
import { ProposalType } from 'shared/types';
import { Badge } from 'shared/ui/Badge';
import { Input } from 'shared/ui/Input';
import { Title } from 'shared/ui/Title';
import { ValidationError } from '../ValidationError';
import { VotingDuration } from '../VotingDuration';
import css from './styles.module.scss';
import { IForm, initialValues, validationSchema } from './types';

interface IChangeDAONameFormProps {
	onResponse: (value: boolean) => void;
}

export function ChangeDAONameForm({ onResponse }: IChangeDAONameFormProps) {
	const { dao } = store.useFormType();
	const { createProposal } = useProposals();

	const navigate = useNavigate();

	const handleOnSubmit = React.useCallback(
		async (values: IForm) => {
			const payload: ICreateChangeDAONameProposalPayload = {
				type: ProposalType.ChangeDAOName,
				name: values.name,
				description: values.description,
				votingDuration: Number(values.votingDuration),
				newName: values.newName,
			};

			try {
				await createProposal(payload, dao?.address ?? '');
				onResponse(true);
			} catch {
				onResponse(false);
			}
		},
		[createProposal, onResponse, dao]
	);

	if (!dao) {
		return;
	}

	return (
		<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleOnSubmit}>
			{(props) => (
				<ProposalCreateLayout onBack={() => navigate(-1)} onSubmit={props.handleSubmit}>
					<div className={css.form}>
						<div className={css.fields}>
							<div className={css.block}>
								<Title variant={'medium'} value="Change DAO name" />
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
									value={props.values.votingDuration}
									variant={
										props.errors.votingDuration !== undefined && props.touched.votingDuration ? 'error' : 'primary'
									}
									setValue={(value) => props.setValues({ ...props.values, votingDuration: value })}
								/>
								<div className={css.currentName}>
									<span>Current name</span>
									<Badge text={dao.name} variant="blue" />
								</div>
								<Input
									value={props.values.newName}
									variant={props.errors.newName !== undefined && props.touched.newName ? 'error' : 'primary'}
									fieldName="New name"
									placeholder="New name"
									onChange={(e) => props.setValues({ ...props.values, newName: e.target.value })}
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
								{props.errors.newName && props.touched.newName ? (
									<ValidationError>{props.errors.newName}</ValidationError>
								) : null}
							</div>
						</div>
					</div>
				</ProposalCreateLayout>
			)}
		</Formik>
	);
}
