import { TopContent } from 'app/navigation/components/top-content';
import { routes } from 'app/router/routes';
import { Formik, FormikErrors, FormikProps } from 'formik';
import { ValidationError } from 'pages/create-proposal/components/ProposalForm/components/ValidationError';
import React from 'react';
import { generatePath, useNavigate } from 'react-router';
import { useDaos } from 'shared/api/daos';
import { ICreateDaoEqualPayload, ICreateDaoProportionalPayload } from 'shared/api/daos/payloads';
import { useBackButton } from 'shared/hooks/useBackButton';
import { store } from 'shared/store';
import { DaoType, IDistributionRule } from 'shared/types';
import { Button } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input';
import { Modal } from 'shared/ui/Modal';
import { Title } from 'shared/ui/Title';
import { DaoCreateLoader } from './components/DaoCreateLoader';
import { DaoCreateResult } from './components/DaoCreateResult';
import { TabEqual } from './components/TabEqual';
import { TabProportional } from './components/TabProportional';
import { Tabs } from './components/Tabs';
import { ITab } from './components/Tabs/types';
import css from './styles.module.scss';
import { getInitialValues, getValidationSchema, IForm } from './types';

const getErrors = (errors: string | string[] | FormikErrors<IDistributionRule>[]) => {
	switch (typeof errors) {
		case 'string': {
			return [errors];
		}
		case 'object': {
			if (Array.isArray(errors)) {
				return Array.from(
					errors.flatMap((e, idx) => {
						if (typeof e === 'string') {
							return e;
						} else {
							return idx === 0 ? [e.walletAddress, e.tokens, e.percent].join('; ') : [];
						}
					})
				);
			}
		}
	}
};

export const CreateDAOPage = React.memo(function CreateDAOPage() {
	const [selectedTabIdx, setSelectedTabIdx] = React.useState<number>(0);
	const [validationSchema, setValidationSchema] = React.useState(getValidationSchema(0));
	const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
	const [isResultOpen, setIsResultOpen] = React.useState<boolean>(false);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [isOpenSetupInfoModal, setIsOpenSetupInfoModal] = React.useState<boolean>(false);
	const [isInfoOpen, setIsInfoOpen] = React.useState<boolean>(false);
	const [createdDaoId, setCreatedDaoId] = React.useState<string>('');
	const { setIsHeaderShown, setIsMenuShown, setIsBackground } = store.useApp();
	const { createDao } = useDaos();
	const { walletAddress } = store.useWallet();

	const navigate = useNavigate();

	useBackButton();

	const getTabs = React.useCallback(
		(props: FormikProps<IForm>): ITab[] => {
			return [
				{
					title: 'Equal',
					content: (
						<TabEqual
							walletAddresses={props.values.walletAddresses}
							setWalletAddresses={(value) => {
								props.setValues({ ...props.values, walletAddresses: value });
								setValidationSchema(getValidationSchema(selectedTabIdx));
							}}
							consensus={props.values.consensus}
							setConsensus={(value) => props.setValues({ ...props.values, consensus: value })}
							onSetupInfo={() => setIsOpenSetupInfoModal(true)}
						/>
					),
				},
				{
					title: 'Proportional',
					content: (
						<TabProportional
							isManualConsensus={props.touched.currentConsensusManual ?? false}
							setIsManualConsensus={() => props.setTouched({ currentConsensusManual: true })}
							onInfo={() => setIsInfoOpen(true)}
							currentConsensus={props.values.consensusPercent}
							setCurrentConsensus={(value) => props.setValues({ ...props.values, consensusPercent: value })}
							distributionRules={props.values.distributionRules}
							setDistributionRules={(value) => props.setValues({ ...props.values, distributionRules: value })}
						/>
					),
				},
			];
		},
		[selectedTabIdx]
	);

	const handleOnSubmit = React.useCallback(
		async (values: IForm) => {
			if (selectedTabIdx === 0) {
				const payload: ICreateDaoEqualPayload = {
					type: DaoType.Equal,
					daoName: values.name,
					daoTokenName: values.tokenName,
					daoTokenSymbol: values.tokenSymbol,
					consensus: values.consensus,
					walletAddresses: values.walletAddresses,
				};
				try {
					await createDao(payload);
					setIsSuccess(true);
					setIsResultOpen(true);
				} catch {
					setIsSuccess(false);
					setIsResultOpen(true);
				}
			} else if (selectedTabIdx === 1) {
				const payload: ICreateDaoProportionalPayload = {
					type: DaoType.Proportional,
					daoName: values.name,
					daoTokenName: values.tokenName,
					daoTokenSymbol: values.tokenSymbol,
					distributionRules: values.distributionRules,
					consensusPercent: values.consensusPercent,
				};
				try {
					setIsLoading(true);
					await createDao(payload);
				} catch {
					setIsSuccess(false);
					setIsResultOpen(true);
				}
			}
		},
		[createDao, selectedTabIdx]
	);

	React.useEffect(() => {
		setIsHeaderShown(true);
		setIsMenuShown(true);
		setIsBackground(false);
	}, [setIsBackground, setIsHeaderShown, setIsMenuShown]);

	React.useEffect(() => {
		setValidationSchema(getValidationSchema(selectedTabIdx));
	}, [selectedTabIdx]);

	return (
		<Formik
			initialValues={getInitialValues(walletAddress)}
			validationSchema={validationSchema}
			onSubmit={handleOnSubmit}
		>
			{(props) => (
				<div className={css.page}>
					<div className={css.block}>
						<Title value="Create DAO" variant="medium" />
						<Input
							value={props.values.name}
							variant={props.touched.name && props.errors.name ? 'error' : 'primary'}
							fieldName="DAO name"
							placeholder="Create DAO name"
							onChange={(e) => props.setValues({ ...props.values, name: e.target.value })}
						/>
						<Input
							value={props.values.tokenName}
							variant={props.touched.tokenName && props.errors.tokenName ? 'error' : 'primary'}
							fieldName="DAO token name"
							placeholder="Create DAO token name"
							onChange={(e) => props.setValues({ ...props.values, tokenName: e.target.value })}
						/>
						<Input
							value={props.values.tokenSymbol}
							variant={props.touched.tokenSymbol && props.errors.tokenSymbol ? 'error' : 'primary'}
							fieldName="DAO token symbol"
							placeholder="Create DAO token symbol"
							onChange={(e) => props.setValues({ ...props.values, tokenSymbol: e.target.value })}
						/>
						{props.errors.name && props.touched.name ? <ValidationError>{props.errors.name}</ValidationError> : null}
						{props.errors.tokenName && props.touched.tokenName ? (
							<ValidationError>{props.errors.tokenName}</ValidationError>
						) : null}
						{props.errors.tokenSymbol && props.touched.tokenSymbol ? (
							<ValidationError>{props.errors.tokenSymbol}</ValidationError>
						) : null}
					</div>

					<Tabs selectedTabIdx={selectedTabIdx} onSelect={setSelectedTabIdx} tabs={getTabs(props)} />
					{selectedTabIdx === 0 && props.errors.consensus && props.touched.consensus ? (
						<ValidationError>{props.errors.consensus}</ValidationError>
					) : null}
					{selectedTabIdx === 0 && props.errors.walletAddresses && props.touched.walletAddresses ? (
						<ValidationError>{props.errors.walletAddresses[0]}</ValidationError>
					) : null}
					{selectedTabIdx === 1 && props.errors.consensusPercent && props.touched.consensusPercent ? (
						<ValidationError>{props.errors.consensusPercent}</ValidationError>
					) : null}
					{selectedTabIdx === 1 && props.errors.distributionRules && props.touched.distributionRules ? (
						<ValidationError>{'Distribution rule error: ' + getErrors(props.errors.distributionRules)}</ValidationError>
					) : null}

					<TopContent>
						<div className={css.actions}>
							<Button variant="secondary" onClick={() => navigate(-1)}>
								Back
							</Button>
							<Button variant="primary" onClick={() => props.handleSubmit()}>
								Create
							</Button>
						</div>
					</TopContent>

					<Modal isOpen={isOpenSetupInfoModal} title="Set-up consensus" onClose={() => setIsOpenSetupInfoModal(false)}>
						<div className={css.infoBlock}>
							<div className={css.textBlock}>Defines how many GP holders must approve a proposal for it to pass.</div>
							<div className={css.textBlock}>
								For example, “2 of 3” means that out of 3 total GPs, at least 2 must vote in favor.
							</div>
							<div className={css.textBlock}>
								You can adjust this number depending on how decentralized or strict the decision-making should be.
							</div>
						</div>
					</Modal>

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

					<Modal isOpen={isLoading}>
						<DaoCreateLoader
							onDone={(value) => {
								setIsSuccess(true);
								setIsResultOpen(true);
								setCreatedDaoId(value);
							}}
							onTimeOut={() => {
								setIsLoading(false);
								setIsSuccess(false);
								setIsResultOpen(true);
							}}
						/>
					</Modal>

					<Modal isOpen={isResultOpen} onClose={() => navigate(-1)} isBackgroundOn={isSuccess}>
						<DaoCreateResult
							success={isSuccess}
							onDone={() => navigate(generatePath(routes.dao, { id: createdDaoId, tab: 'overview' }))}
							onRetry={() => setIsResultOpen(false)}
						/>
					</Modal>
				</div>
			)}
		</Formik>
	);
});
