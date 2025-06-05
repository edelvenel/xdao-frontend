import cn from 'classnames';
import React from 'react';
import { Icon } from 'shared/icons';
import { store } from 'shared/store';
import { IVote } from 'shared/types';
import { Title } from 'shared/ui/Title';
import { formatNumber, getUserFriendlyAddress, shortenAddress } from 'shared/utils/formatters';
import css from '../../styles.module.scss';

interface ISignaturesBlockProps {
	votes: IVote[];
}

export function SignaturesBlock({ votes }: ISignaturesBlockProps) {
	const { holders } = store.useFormType();

	const getImpact = React.useCallback(
		(impact: number): number => {
			const total = holders?.reduce((acc, curr) => acc + Number(curr.balance), 0);

			if (total) {
				return (impact / total) * 100;
			} else {
				return 0;
			}
		},
		[holders]
	);

	return (
		<div className={css.card}>
			<Title value="Signatures" variant="medium" />
			<div className={css.blockVote}>
				<div className={cn(css.agree, css.vote)}>
					<Icon.Common.Agree />
					<span>{formatNumber(votes.reduce((acc, curr) => acc + getImpact(curr.impact), 0))}%</span>
				</div>
			</div>
			{votes.map((vote, index) => (
				<div key={index} className={cn(css.block, css.vote)}>
					<div className={css.column}>
						<div className={css.value}>{shortenAddress(getUserFriendlyAddress(vote.walletAddress))}</div>
					</div>
					<div className={css.answer}>
						<span>Yes</span>
						<div className={css.placeholder}>({formatNumber(getImpact(vote.impact))}%)</div>
					</div>
				</div>
			))}
			{votes.length === 0 && <div className={css.placeholder}>No votes yet</div>}
		</div>
	);
}
