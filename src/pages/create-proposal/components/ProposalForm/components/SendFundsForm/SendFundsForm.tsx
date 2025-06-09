import tonSymbol from 'assets/images/ton-symbol.png';
import { Formik } from 'formik';
import { ScreenLoader } from 'pages/tech/sceen-loader';
import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { useDaos } from 'shared/api/daos';
import { useProposals } from 'shared/api/proposals';
import { ICreateSendFundsProposalPayload } from 'shared/api/proposals/payloads';
import { Icon } from 'shared/icons';
import { ProposalCreateLayout } from 'shared/layouts/proposal-create-layout';
import { store } from 'shared/store';
import { IJetton, IToken, ProposalType } from 'shared/types';
import { Dropdown } from 'shared/ui/Dropdown';
import { Input } from 'shared/ui/Input';
import { InputNumber } from 'shared/ui/InputNumber';
import { RadioToken } from 'shared/ui/RadioToken';
import { Title } from 'shared/ui/Title';
import { ValidationError } from '../ValidationError';
import { VotingDuration } from '../VotingDuration';
import css from './styles.module.scss';
import { getInitialValues, IForm, validationSchema } from './types';

interface ISendFundsFormProps {
	onResponse: (value: boolean) => void;
}

export function SendFundsForm({ onResponse }: ISendFundsFormProps) {
	const { daos, fetchDaos } = useDaos();
	const { dao } = store.useFormType();
	const { createProposal } = useProposals();
	const [jettons, setJettons] = React.useState<IJetton[] | null>(null);
	const [tonBalance, setTonBalance] = React.useState<number | null>(null);
	const [tonRate, setTonRate] = React.useState<number | null>(null);
	const { getDAOJettons, getTONBalance, getTokenRates } = useDaos();

	const navigate = useNavigate();

	const handleOnSubmit = React.useCallback(
		async (values: IForm) => {
			const payload: ICreateSendFundsProposalPayload = {
				pluginAddress: dao?.plugins[0].address ?? 'native',
				type: ProposalType.SendDAOFunds,
				name: values.name,
				description: values.description,
				votingDuration: Number(values.votingDuration),
				fromDAO: values.fromDAO!,
				token: values.token!,
				recipientAddress: values.recipientAddress,
				tokenAmount: Number(values.tokenAmount),
				decimals: values.token!.decimals,
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

	React.useEffect(() => {
		fetchDaos();
	}, [fetchDaos]);

	React.useEffect(() => {
		const fetchJettons = async () => {
			if (dao) {
				const jettons = await getDAOJettons(dao.plugins[0].address);
				setJettons(jettons);
			}
		};

		const fetchTonBalance = async () => {
			if (dao) {
				const balance = await getTONBalance(dao.plugins[0].address);
				setTonBalance(balance);
			}
		};

		const fetchRates = async () => {
			const rate = await getTokenRates(['ton'], ['usd']);
			setTonRate(rate[0].rate);
		};

		fetchJettons();
		fetchTonBalance();
		fetchRates();
	}, [dao, getDAOJettons, getTONBalance, getTokenRates]);

	const tokens: IToken[] = React.useMemo(() => {
		if (jettons === null || tonBalance === null || tonRate === null) {
			return [];
		}
		const tonToken: IToken = {
			address: 'native',
			name: 'TON',
			amount: tonBalance,
			rate: tonRate * tonBalance,
			imgUrl: tonSymbol,
			decimals: 9,
		};
		const jettonsTokens: IToken[] = jettons.map((jetton) => {
			return {
				address: jetton.address,
				name: jetton.name,
				amount: jetton.amount,
				imgUrl: jetton.imgUrl,
				rate: jetton.rate,
				decimals: jetton.decimals,
			};
		});
		return [tonToken, ...jettonsTokens];
	}, [jettons, tonBalance, tonRate]);

	if (!dao) {
		return;
	}

	if (daos === null) {
		return <ScreenLoader />;
	}

	const initialValues = getInitialValues(dao, tokens);

	return (
		<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleOnSubmit}>
			{(props) => (
				<ProposalCreateLayout onBack={() => navigate(-1)} onSubmit={props.handleSubmit}>
					<div className={css.form}>
						<div className={css.fields}>
							<div className={css.block}>
								<Title variant={'medium'} value="Send DAO funds" />
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
								<Dropdown
									selected={props.values.fromDAO}
									options={daos}
									placeholder="From DAO"
									onSelect={(value) => props.setValues({ ...props.values, fromDAO: value })}
									optionLabel={(option) => option.name}
									optionLogo={(option) => option.logo}
									matcher={(a, b) => a.address === b.address}
								/>
								<Input
									value={props.values.recipientAddress}
									variant={
										props.errors.recipientAddress !== undefined && props.touched.recipientAddress ? 'error' : 'primary'
									}
									fieldName="Recipient address"
									placeholder="Enter recipient address"
									onChange={(e) => props.setValues({ ...props.values, recipientAddress: e.target.value })}
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
								{props.errors.fromDAO && props.touched.fromDAO ? (
									<ValidationError>{props.errors.fromDAO}</ValidationError>
								) : null}
								{props.errors.recipientAddress && props.touched.recipientAddress ? (
									<ValidationError>{props.errors.recipientAddress}</ValidationError>
								) : null}
							</div>
							<div className={css.block}>
								<Title variant={'medium'} value="Select token type" />
								<div className={css.tokenBlock}>
									<RadioToken
										selected={props.values.token}
										options={tokens}
										onSelect={(value) => {
											if (Number(props.values.tokenAmount) > value.amount) {
												props.setValues({ ...props.values, token: value, tokenAmount: String(value.amount) });
											} else {
												props.setValues({ ...props.values, token: value });
											}
										}}
									/>
									<div className={css.amountBlock}>
										<InputNumber
											variant={
												props.errors.tokenAmount !== undefined && props.touched.tokenAmount ? 'error' : 'primary'
											}
											disabled={props.values.token === null}
											value={props.values.tokenAmount}
											placeholder="Enter token amount"
											min={0}
											max={props.values.token?.amount}
											onMaxAmount={() => {
												console.log(props.values.token?.amount);
												props.setValues({ ...props.values, tokenAmount: String(props.values.token?.amount) });
											}}
											onUpdate={(value) => props.setValues({ ...props.values, tokenAmount: value })}
										/>
										{props.errors.tokenAmount && props.touched.tokenAmount ? (
											<ValidationError>{props.errors.tokenAmount}</ValidationError>
										) : null}
										<div className={css.link}>
											<span>Open link for more info</span>
											<div className={css.linkButton} onClick={() => toast.error('Unimplemented')}>
												<Icon.Common.Link />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</ProposalCreateLayout>
			)}
		</Formik>
	);
}
