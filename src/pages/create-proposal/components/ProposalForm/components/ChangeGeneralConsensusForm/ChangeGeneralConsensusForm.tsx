import { Formik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router';
import { useProposals } from 'shared/api/proposals';
import { ICreateChangeGeneralConsensusProposalPayload } from 'shared/api/proposals/payloads';
import { Icon } from 'shared/icons';
import { ProposalCreateLayout } from 'shared/layouts/proposal-create-layout';
import { store } from 'shared/store';
import { ProposalType } from 'shared/types';
import { Badge } from 'shared/ui/Badge';
import { IconButton } from 'shared/ui/IconButton';
import { Input } from 'shared/ui/Input';
import { InputNumber } from 'shared/ui/InputNumber';
import { InputStep } from 'shared/ui/InputStep';
import { Modal } from 'shared/ui/Modal';
import { Title } from 'shared/ui/Title';
import { ValidationError } from '../ValidationError';
import { VotingDuration } from '../VotingDuration';
import css from './styles.module.scss';
import { getInitialValues, getValidationSchema, IForm } from './types';

const handleRenderLabel = (value: number): string => {
	return `${value}%`;
};

interface IChangeGeneralConsensusFormProps {
	onResponse: (value: boolean) => void;
}

export function ChangeGeneralConsensusForm({ onResponse }: IChangeGeneralConsensusFormProps) {
	const { dao } = store.useFormType();
	const [isInfoOpen, setIsInfoOpen] = React.useState<boolean>(false);
	const { createProposal } = useProposals();

	const navigate = useNavigate();

	const handleOnSubmit = React.useCallback(
		async (values: IForm) => {
			const payload: ICreateChangeGeneralConsensusProposalPayload = {
				type: ProposalType.ChangeGeneralConsensus,
				name: values.name,
				description: values.description,
				votingDuration: Number(values.votingDuration),
				currentConsensus: values.currentConsensus * 100,
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

	const initialValues: IForm = getInitialValues(dao.consensus);
	const validationSchema = getValidationSchema(dao.consensus);

	return (
		<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleOnSubmit}>
			{(props) => (
				<ProposalCreateLayout onBack={() => navigate(-1)} onSubmit={props.handleSubmit}>
					<div className={css.form}>
						<div className={css.fields}>
							<div className={css.block}>
								<Title variant={'medium'} value="Change general consensus" />
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
								<div className={css.currentConsensus}>
									<span>Current consensus</span>
									<Badge text={String(dao.consensus) + '%'} variant="blue" />
								</div>

								{props.errors.name && props.touched.name ? (
									<ValidationError>{props.errors.name}</ValidationError>
								) : null}
								{props.errors.description && props.touched.description ? (
									<ValidationError>{props.errors.description}</ValidationError>
								) : null}
								{props.errors.votingDuration && props.touched.votingDuration ? (
									<ValidationError>{props.errors.votingDuration}</ValidationError>
								) : null}
							</div>
							<div className={css.block}>
								<div className={css.setConsensusBlock}>
									<div className={css.title}>
										<div className={css.header}>
											<Title variant={'medium'} value="Current consensus" />
											<IconButton size="small" variant="secondary" onClick={() => setIsInfoOpen(true)}>
												<Icon.Common.QuestionSmall />
											</IconButton>
										</div>
									</div>
									<InputStep
										min={0}
										max={100}
										current={props.values.currentConsensus}
										onChange={(value) => {
											if (props.touched.currentConsensusManual) {
												props.setValues({
													...props.values,
													currentConsensus: value,
													currentConsensusManual: String(value),
												});
											} else {
												props.setValues({
													...props.values,
													currentConsensus: value,
												});
											}
										}}
										renderLabel={handleRenderLabel}
										step={10}
									/>

									<InputNumber
										max={100}
										min={0}
										onUpdate={(value) => {
											props.setTouched({ currentConsensusManual: true });
											props.setValues({
												...props.values,
												currentConsensusManual: value,
												currentConsensus: Number(value),
											});
										}}
										value={props.values.currentConsensusManual}
										placeholder="Enter amount manual"
									/>
									{props.errors.currentConsensus !== undefined && props.touched.currentConsensus ? (
										<ValidationError>{props.errors.currentConsensus}</ValidationError>
									) : null}
								</div>
							</div>
						</div>
					</div>

					<Modal isOpen={isInfoOpen} title="Current consensus" onClose={() => setIsInfoOpen(false)}>
						<div className={css.infoBlock}>
							<div className={css.textBlock}>
								This is the minimum percentage of GP token votes needed to approve a proposal.
							</div>
							<div className={css.textBlock}>
								Increasing the consensus makes decisions harder to pass, while lowering it makes them easier.
							</div>
						</div>
					</Modal>
				</ProposalCreateLayout>
			)}
		</Formik>
	);
}
