import { Address } from '@ton/core';
import cn from 'classnames';
import React from 'react';
import { Icon } from 'shared/icons';
import { IHolder } from 'shared/types';
import { calculatePercents } from 'shared/utils/calculateHoldersPercent';
import { formatNumber } from 'shared/utils/formatters';
import css from './styles.module.scss';

interface IDistributionRulesProps {
	oldHolders: IHolder[];
	holders: IHolder[];
}

const getFriendlyAddress = (rawAddress: string): string => {
	if (Address.isRaw(rawAddress)) {
		return Address.parseRaw(rawAddress).toString({ bounceable: false });
	} else if (Address.isFriendly(rawAddress)) {
		return rawAddress;
	} else {
		return rawAddress;
	}
};

export function DistributionRules({ holders, oldHolders }: IDistributionRulesProps) {
	const distributionRules = React.useMemo(() => {
		return calculatePercents(
			holders.map((holder) => {
				return {
					walletAddress: holder.owner_address,
					tokens: Number(holder.balance),
					percent: 0,
				};
			})
		);
	}, [holders]);

	const distributionRulesOld = React.useMemo(() => {
		return calculatePercents(
			oldHolders.map((holder) => {
				return {
					walletAddress: holder.owner_address,
					tokens: Number(holder.balance),
					percent: 0,
				};
			})
		);
	}, [oldHolders]);

	return (
		<div className={css.distributionRules}>
			{distributionRules.map((rule, index) => (
				<div key={index} className={css.distributionRule}>
					<div className={cn(css.item, css.wallet)}>
						<span className={css.text}>{getFriendlyAddress(rule.walletAddress)}</span>
					</div>
					<div className={cn(css.item, css.gpTokens)}>{rule.tokens !== null ? rule.tokens / 10 ** 9 : 0}</div>
					<div className={cn(css.item, css.percent)}>
						{formatNumber(
							distributionRulesOld.find((oldRule) => oldRule.walletAddress === rule.walletAddress)?.percent ?? 0
						)}
						%
					</div>
					<div className={css.arrow}>
						<Icon.Common.Arrow />
					</div>
					<div className={cn(css.item, css.percent)}>{formatNumber(rule.percent ?? 0)}%</div>
				</div>
			))}
		</div>
	);
}
