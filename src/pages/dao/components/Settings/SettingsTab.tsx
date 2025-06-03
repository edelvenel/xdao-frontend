import { routes } from 'app/router/routes';
import cn from 'classnames';
import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { Icon } from 'shared/icons';
import { store } from 'shared/store';
import { IDao, IDistributionRule, ProposalType } from 'shared/types';
import { Button } from 'shared/ui/Button';
import { TextLoader } from 'shared/ui/TextLoader';
import { calculatePercents } from 'shared/utils/calculateHoldersPercent';
import { getUserFriendlyAddress } from 'shared/utils/formatters';
import { DistributionRuleLoader } from './components/DistributionRuleLoader';
import css from './styles.module.scss';

interface ISettingsTabProps {
	dao?: IDao;
}

export function SettingsTab({ dao }: ISettingsTabProps) {
	const ref = React.useRef<HTMLDivElement>(null);
	const [consensus, setConsensus] = React.useState<number | null>(dao ? dao.consensus : null);
	const [isConsensusEdit, setIsConsensusEdit] = React.useState<boolean>(false);
	const { setDao, setProposalType } = store.useFormType();
	const { holders } = store.useFormType();

	const navigate = useNavigate();

	const handleOnConsensusSave = React.useCallback(() => {
		setIsConsensusEdit(false);
		toast.error('Save unimplemented');
	}, []);

	React.useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dao && ref.current && !ref.current.contains(event.target as Node) && isConsensusEdit) {
				setIsConsensusEdit(false);
				setConsensus(dao.consensus);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [dao, dao?.consensus, isConsensusEdit]);

	React.useEffect(() => {
		if (dao) {
			setConsensus(dao.consensus);
		}
	}, [dao]);

	const handleOnRemove = React.useCallback(
		(walletAddress: string) => {
			if (dao && walletAddress) {
				setDao(dao);
				setProposalType(ProposalType.RemoveGP);
				navigate(routes.createProposalForm);
			}
		},
		[dao, navigate, setDao, setProposalType]
	);

	const handleOnAdd = React.useCallback(() => {
		if (dao) {
			setDao(dao);
			setProposalType(ProposalType.AddGP);
			navigate(routes.createProposalForm);
		}
	}, [dao, navigate, setDao, setProposalType]);

	const handleOnChangeTransferStatus = React.useCallback(() => {
		if (dao) {
			setDao(dao);
			setProposalType(ProposalType.ChangeGPTransferStatus);
			navigate(routes.createProposalForm);
		}
	}, [dao, navigate, setDao, setProposalType]);

	const handleSetConsensus = React.useCallback((value: string) => {
		const numberValue = Number(value !== '' ? value : 0);
		if (numberValue < 0) {
			setConsensus(0);
		} else if (numberValue > 100) {
			setConsensus(100);
		}
		setConsensus(numberValue);
	}, []);

	const distributionRules: IDistributionRule[] = React.useMemo(() => {
		const rules: IDistributionRule[] = holders
			? holders.map((holder) => {
					return { walletAddress: holder.jetton_wallet_address, tokens: Number(holder.balance) / 10 ** 9, percent: 0 };
				})
			: [];
		return calculatePercents(rules);
	}, [holders]);

	return (
		<div className={css.tab}>
			{consensus !== null && (
				<div ref={ref} className={css.field}>
					<div className={css.info}>
						<div className={css.name}>Current consensus</div>
						{!isConsensusEdit && <div className={css.value}>{consensus}%</div>}
						{isConsensusEdit && (
							<div className={css.inputBox}>
								<input
									autoFocus
									type="number"
									className={css.input}
									value={consensus > 0 ? consensus : ''}
									onChange={(e) => handleSetConsensus(e.target.value)}
								/>
							</div>
						)}
					</div>
					{!isConsensusEdit && (
						<div className={css.textButton} onClick={() => setIsConsensusEdit(true)}>
							Confirm
						</div>
					)}
					{isConsensusEdit && (
						<div className={css.confirmButton} onClick={handleOnConsensusSave}>
							Confirm
						</div>
					)}
				</div>
			)}
			{consensus === null && (
				<div>
					<TextLoader lineHeight={108} />
				</div>
			)}
			<div className={css.block}>
				<div className={css.title}>GP holders:</div>
				{dao &&
					distributionRules &&
					distributionRules.map((rule, index) => (
						<div key={index} className={css.distributionRule}>
							<div className={cn(css.item, css.wallet)}>
								<div className={css.text}>{getUserFriendlyAddress(rule.walletAddress)}</div>
							</div>
							<div className={cn(css.item, css.gpTokens)}>{rule.tokens}</div>
							<div className={cn(css.item, css.percent)}>{rule.percent?.toFixed(2)}%</div>
							<div className={cn(css.item, css.link)} onClick={() => toast.error('Unimplemented')}>
								<Icon.Common.LittleLink />
							</div>
							<div className={cn(css.item, css.cancel)} onClick={() => handleOnRemove(rule.walletAddress)}>
								<Icon.Common.Cancel />
							</div>
						</div>
					))}
				{dao && holders && holders.length === 0 && <div className={css.placeholder}>No holders yet</div>}

				{!dao && (
					<>
						<DistributionRuleLoader />
						<DistributionRuleLoader />
						<DistributionRuleLoader />
					</>
				)}

				<div className={css.actions}>
					<Button variant="primary" onClick={handleOnAdd}>
						Add more
					</Button>
					<Button variant="secondary" onClick={handleOnChangeTransferStatus}>
						Change transfer status
					</Button>
				</div>
			</div>
		</div>
	);
}
