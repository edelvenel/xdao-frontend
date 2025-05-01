import { Formik } from 'formik';
import React from 'react';
import { useProposals } from 'shared/api/proposals';
import { ICreateCustomProposalPayload } from 'shared/api/proposals/payloads';
import { TOKENS, VOTING_TYPES } from 'shared/constants';
import { ProposalCreateLayout } from 'shared/layouts/proposal-create-layout';
import { ProposalType } from 'shared/types';
import { Input } from 'shared/ui/Input';
import { Radio } from 'shared/ui/Radio';
import { Title } from 'shared/ui/Title';
import { SelectOptions } from '../SelectOptions';
import { ValidationError } from '../ValidationError';
import { VotingDuration } from '../VotingDuration';
import { LpPool } from './components/LpPool';
import { TokenRequired } from './components/TokenRequired';
import css from './styles.module.scss';
import { getValidationSchema, IForm, initialValues } from './types';

interface ICustomProposalFormProps {
	onResponse: (value: boolean) => void;
}

export function CustomProposalForm({ onResponse }: ICustomProposalFormProps) {
	// const { dao } = store.useFormType();
	const [validationSchema, setValidationSchema] = React.useState(getValidationSchema(initialValues.token));
	const { createProposal } = useProposals();

	const handleOnSubmit = React.useCallback(
		async (values: IForm) => {
			const payload: ICreateCustomProposalPayload = {
				type: ProposalType.CustomProposal,
				name: values.name,
				description: values.description,
				votingDuration: Number(values.votingDuration),
				newName: values.newName,
				votingType: values.votingType,
				token: TOKENS[values.token].value,
				lpPool: values.lpPool,
				tokenAddress: values.tokenAddress,
				tokenSymbol: values.tokenSymbol,
				minTokens: values.minTokens === null ? 0 : values.minTokens,
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
								<Title variant={'medium'} value="Custom proposal" />
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
									variant={props.errors.question && props.touched.question ? 'error' : 'primary'}
									value={props.values.question}
									fieldName="Question"
									placeholder="Question"
									onChange={(e) => props.setValues({ ...props.values, question: e.target.value })}
								/>
								<Input
									variant={props.errors.newName && props.touched.newName ? 'error' : 'primary'}
									value={props.values.newName}
									fieldName="New name"
									placeholder="New name"
									onChange={(e) => props.setValues({ ...props.values, newName: e.target.value })}
								/>
								<SelectOptions
									value={props.values.selectOptions}
									setValue={(value) => props.setValues({ ...props.values, selectOptions: value })}
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
								{props.errors.question && props.touched.question ? (
									<ValidationError>{props.errors.question}</ValidationError>
								) : null}
								{props.errors.newName && props.touched.newName ? (
									<ValidationError>{props.errors.newName}</ValidationError>
								) : null}
								{props.errors.selectOptions && props.touched.selectOptions ? (
									<ValidationError>{props.errors.selectOptions}</ValidationError>
								) : null}
							</div>

							<div className={css.block}>
								<Title variant="medium" value="Select voting type" />
								<div className={css.radio}>
									<Radio
										selected={props.values.votingType}
										options={VOTING_TYPES}
										onSelect={(value) => props.setValues({ ...props.values, votingType: value })}
										matcher={(a, b) => a === b}
										renderLabel={(option) => <span>{option}</span>}
									/>
								</div>
								{props.errors.votingType && props.touched.votingType ? (
									<ValidationError>{props.errors.votingType}</ValidationError>
								) : null}
							</div>

							<div className={css.block}>
								<Title variant="medium" value="Token selection" />
								<div className={css.radio}>
									<Radio
										selected={TOKENS.find((token) => token.id === props.values.token) ?? TOKENS[0]}
										options={TOKENS}
										onSelect={(value) => {
											props.setValues({ ...props.values, token: value.id });
											setValidationSchema(getValidationSchema(value.id));
										}}
										renderLabel={(option) => (
											<div key={option.id} className={css.radioLabel}>
												<span>{option.value}</span>
												<div className={css.note}>{option.note}</div>
											</div>
										)}
									/>
								</div>
								{props.values.token === 2 && (
									<LpPool
										value={props.values.lpPool}
										setValue={(value) => props.setValues({ ...props.values, lpPool: value })}
									/>
								)}

								{props.values.token === 3 && (
									<>
										<Input
											variant={props.errors.tokenAddress && props.touched.tokenAddress ? 'error' : 'primary'}
											value={props.values.tokenAddress}
											fieldName="Token address"
											placeholder="Paste token address"
											onChange={(e) => props.setValues({ ...props.values, tokenAddress: e.target.value })}
										/>
										<Input
											variant={props.errors.tokenSymbol && props.touched.tokenSymbol ? 'error' : 'primary'}
											value={props.values.tokenSymbol}
											fieldName="Token symbol"
											placeholder="Write token symbol"
											onChange={(e) => props.setValues({ ...props.values, tokenSymbol: e.target.value })}
										/>
									</>
								)}

								<TokenRequired
									value={props.values.minTokens}
									setValue={(value) => props.setValues({ ...props.values, minTokens: value })}
								/>

								{props.errors.token && props.touched.token ? (
									<ValidationError>{props.errors.token}</ValidationError>
								) : null}
								{props.errors.lpPool && props.touched.lpPool ? (
									<ValidationError>{props.errors.lpPool}</ValidationError>
								) : null}
								{props.errors.tokenAddress && props.touched.tokenAddress ? (
									<ValidationError>{props.errors.tokenAddress}</ValidationError>
								) : null}
								{props.errors.tokenSymbol && props.touched.tokenSymbol ? (
									<ValidationError>{props.errors.tokenSymbol}</ValidationError>
								) : null}
								{props.errors.minTokens && props.touched.minTokens ? (
									<ValidationError>{props.errors.minTokens}</ValidationError>
								) : null}
							</div>
						</div>
					</div>
				</ProposalCreateLayout>
			)}
		</Formik>
	);
}
