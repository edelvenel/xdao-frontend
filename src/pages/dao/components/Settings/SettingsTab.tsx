import WebApp from '@twa-dev/sdk';
import { routes } from 'app/router/routes';
import cn from 'classnames';
import React from 'react';
import { useNavigate } from 'react-router';
import { Icon } from 'shared/icons';
import { store } from 'shared/store';
import { IDao, IDistributionRule, ProposalType } from 'shared/types';
import { Button } from 'shared/ui/Button';
import { TextLoader } from 'shared/ui/TextLoader';
import { calculatePercents } from 'shared/utils/calculateHoldersPercent';
import { formatNumber, shortenAddress } from 'shared/utils/formatters';
import { DistributionRuleLoader } from './components/DistributionRuleLoader';
import css from './styles.module.scss';

interface ISettingsTabProps {
	dao?: IDao;
}

export function SettingsTab({ dao }: ISettingsTabProps) {
	const ref = React.useRef<HTMLDivElement>(null);
	const [consensus, setConsensus] = React.useState<number | null>(dao ? dao.consensus : null);
	const { setDao, setProposalType, setRemovingWallet, holders } = store.useFormType();

	const navigate = useNavigate();

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
				setRemovingWallet(walletAddress);
				navigate(routes.createProposalForm);
			}
		},
		[dao, navigate, setDao, setProposalType, setRemovingWallet]
	);

	const handleOnAdd = React.useCallback(() => {
		if (dao) {
			setDao(dao);
			setProposalType(ProposalType.AddGP);
			navigate(routes.createProposalForm);
		}
	}, [dao, navigate, setDao, setProposalType]);

	const handleOnEditConsensus = React.useCallback(() => {
		if (dao) {
			setDao(dao);
			setProposalType(ProposalType.ChangeGeneralConsensus);
			navigate(routes.createProposalForm);
		}
	}, [dao, navigate, setDao, setProposalType]);

	const distributionRules: IDistributionRule[] = React.useMemo(() => {
		const rules: IDistributionRule[] = holders
			? holders.map((holder) => {
					return { walletAddress: holder.owner_address, tokens: holder.balance, percent: 0 };
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
						<div className={css.value}>{consensus}%</div>
					</div>

					<div className={css.textButton} onClick={handleOnEditConsensus}>
						Edit
					</div>
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
								<div className={css.text}>{shortenAddress(rule.walletAddress)}</div>
							</div>
							<div className={cn(css.item, css.gpTokens)}>{formatNumber(rule.tokens ?? 0, 6)}</div>
							<div className={cn(css.item, css.percent)}>{formatNumber(rule.percent ?? 0)}%</div>
							<div
								className={cn(css.item, css.link)}
								onClick={() => WebApp.openLink(`https://tonviewer.com/${rule.walletAddress}`)}
							>
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
				</div>
			</div>
		</div>
	);
}
