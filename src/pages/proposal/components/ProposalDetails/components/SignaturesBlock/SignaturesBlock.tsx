import cn from 'classnames';
import { Icon } from 'shared/icons';
import { IVote } from 'shared/types';
import { Title } from 'shared/ui/Title';
import { formatNumber, shortenAddress } from 'shared/utils/formatters';
import css from '../../styles.module.scss';

interface ISignaturesBlockProps {
	votes: IVote[];
	currentAmount: number;
	totalSupply: number;
}

export function SignaturesBlock({ votes, currentAmount, totalSupply }: ISignaturesBlockProps) {
	return (
		<div className={css.card}>
			<Title value="Signatures" variant="medium" />
			<div className={css.blockVote}>
				<div className={cn(css.agree, css.vote)}>
					<Icon.Common.Agree />
					<span>{formatNumber((currentAmount / totalSupply) * 100)}%</span>
				</div>
			</div>
			{votes.map((vote, index) => (
				<div key={index} className={cn(css.block, css.vote)}>
					<div className={css.column}>
						<div className={css.value}>{shortenAddress(vote.walletAddress)}</div>
					</div>
					<div className={css.answer}>
						<span>Yes</span>
						<div className={css.placeholder}>({formatNumber((vote.impact / totalSupply) * 100)}%)</div>
					</div>
				</div>
			))}
			{votes.length === 0 && <div className={css.placeholder}>No votes yet</div>}
		</div>
	);
}
