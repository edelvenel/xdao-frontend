import cn from 'classnames';
import { Formik } from 'formik';
import React from 'react';
import { useProposals } from 'shared/api/proposals';
import { ICreateAddGPProposalPayload } from 'shared/api/proposals/payloads';
import { Icon } from 'shared/icons';
import { ProposalCreateLayout } from 'shared/layouts/proposal-create-layout';
import { store } from 'shared/store';
import { ProposalType } from 'shared/types';
import { Input } from 'shared/ui/Input';
import { InputNumber } from 'shared/ui/InputNumber';
import { Title } from 'shared/ui/Title';
import { ValidationError } from '../ValidationError';
import { VotingDuration } from '../VotingDuration';
import css from './styles.module.scss';
import { IForm, initialValues, validationSchema } from './types';

interface IAddGPFormProps {
	onResponse: (value: boolean) => void;
}

export function AddGPForm({ onResponse }: IAddGPFormProps) {
	const { dao } = store.useFormType();
	const { createProposal } = useProposals();

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

			try {
				await createProposal(payload, dao?.address ?? '');
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
				<ProposalCreateLayout onClick={props.handleSubmit} disabled={false}>
					<div className={css.form}>
						<div className={css.fields}>
							<div className={css.block}>
								<Title variant={'medium'} value="Add general partner" />
								<Input
									variant={props.errors.name && props.touched.name ? 'error' : 'primary'}
									value={props.values.name}
									fieldName="Proposal name"
									placeholder="Create proposal name"
									onChange={(e) => props.setValues({ ...props.values, name: e.target.value })}
								/>
								<Input
									variant={props.errors.description && props.touched.description ? 'error' : 'primary'}
									value={props.values.description}
									fieldName="Description"
									placeholder="Description"
									onChange={(e) => props.setValues({ ...props.values, description: e.target.value })}
								/>
								<VotingDuration
									variant={props.errors.votingDuration && props.touched.votingDuration ? 'error' : 'primary'}
									value={props.values.votingDuration}
									setValue={(value) => props.setValues({ ...props.values, votingDuration: value })}
								/>
								<Input
									variant={props.errors.walletAddress && props.touched.walletAddress ? 'error' : 'primary'}
									value={props.values.walletAddress}
									fieldName="Wallet address"
									placeholder="Add wallet address"
									onChange={(e) => props.setValues({ ...props.values, walletAddress: e.target.value })}
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
								{props.errors.walletAddress && props.touched.walletAddress ? (
									<ValidationError>{props.errors.walletAddress}</ValidationError>
								) : null}
								{props.errors.tokenAmount && props.touched.tokenAmount ? (
									<ValidationError>{props.errors.tokenAmount}</ValidationError>
								) : null}
							</div>
							{props.values.tokenAmount && props.values.walletAddress && dao && (
								<div className={css.block}>
									<Title variant={'medium'} value="Update GP distribution" />
									{dao.distributionRules.map((rule) => (
										<div className={css.distributionRule}>
											<div className={cn(css.item, css.wallet)}>
												<span className={css.text}>{rule.walletAddress}</span>
											</div>
											<div className={cn(css.item, css.gpTokens)}>{rule.tokens}</div>
											<div className={cn(css.item, css.percent)}>{rule.percent}%</div>
											<Icon.Common.Arrow />
											<div className={cn(css.item, css.percent)}>30%</div> {/*TODO: calc and replace */}
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				</ProposalCreateLayout>
			)}
		</Formik>
	);
}
