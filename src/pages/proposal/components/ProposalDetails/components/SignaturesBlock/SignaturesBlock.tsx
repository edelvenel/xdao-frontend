import cn from 'classnames';
import { Icon } from 'shared/icons';
import { IVote } from 'shared/types';
import { Title } from 'shared/ui/Title';
import css from '../../styles.module.scss';

interface ISignaturesBlockProps {
	votes: IVote;
}

export function SignaturesBlock({ votes }: ISignaturesBlockProps) {
	return (
		<div className={css.card}>
			<Title value="Signatures" variant="medium" />
			<div className={css.blockVote}>
				<div className={cn(css.agree, css.vote)}>
					<Icon.Common.Agree />
					<span>{votes.agree.reduce((acc, curr) => acc + curr.impact, 0)}%</span>
				</div>
				<div className={cn(css.disagree, css.vote)}>
					<Icon.Common.Disagree />
					<span>{100 - votes.agree.reduce((acc, curr) => acc + curr.impact, 0)}%</span>
				</div>
			</div>
			{votes.agree.map((vote) => (
				<div className={css.block}>
					<div className={css.column}>
						<div className={css.value}>{vote.walletAddress}</div>
					</div>
					<div className={css.answer}>
						<span>Yes</span>
						<div className={css.placeholder}>({vote.impact}%)</div>
					</div>
				</div>
			))}
		</div>
	);
}
