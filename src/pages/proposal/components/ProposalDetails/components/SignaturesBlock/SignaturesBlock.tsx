import cn from 'classnames';
import { Icon } from 'shared/icons';
import { IDao, IVote } from 'shared/types';
import { Title } from 'shared/ui/Title';
import css from '../../styles.module.scss';

interface ISignaturesBlockProps {
	dao: IDao;
	votes: IVote[];
}

export function SignaturesBlock({dao, votes }: ISignaturesBlockProps) {
	const impact = Number(dao.LPTokens) / Number(dao.LPTokens) * 100;
	return (
		<div className={css.card}>
			<Title value="Signatures" variant="medium" />
			<div className={css.blockVote}>
				<div className={cn(css.agree, css.vote)}>
					<Icon.Common.Agree />
					<span>{votes.reduce((acc, curr) => acc + curr.impact, 0)}%</span>
				</div>
			</div>
			{votes.map((vote) => (
				<div className={css.block}>
					<div className={css.column}>
						<div className={css.value}>{vote.walletAddress}</div>
					</div>
					<div className={css.answer}>
						<span>Yes</span>
						<div className={css.placeholder}>({impact.toFixed(2)}%)</div>
					</div>
				</div>
			))}
			{votes.length === 0 && <div className={css.placeholder}>No votes yet</div>}
		</div>
	);
}
