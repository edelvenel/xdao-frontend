import cn from 'classnames';
import { PropsWithChildren } from 'react';
import { IVote } from 'shared/types';
import { Button } from 'shared/ui/Button';
import { Title } from 'shared/ui/Title';
import css from './styles.module.scss';

interface IProposalDetailProps extends PropsWithChildren {
	isVotingEnabled: boolean;
	userVote: IVote | null;
	onVote?: () => void;
	onBack: () => void;
}

export function ProposalDetailLayout({ isVotingEnabled, userVote, onVote, onBack, children }: IProposalDetailProps) {
	return (
		<div className={cn(css.layout, isVotingEnabled && css.voteEnabled, userVote !== null && css.voted)}>
			<div className={css.content}>{children}</div>
			{isVotingEnabled && userVote === null && (
				<div className={css.actions}>
					<Button onClick={onBack} variant="secondary">
						Back
					</Button>
					{onVote !== undefined && <Button onClick={onVote}>Vote</Button>}
				</div>
			)}
			{userVote !== null && (
				<div className={css.voted}>
					<div className={css.info}>
						<div className={css.title}>
							<Title variant="medium" value="You have already voted" />
						</div>
						<div className={css.row}>
							<span>You vote:</span>
							<span className={css.accent}>{`yes (${(userVote.impact / 10000000).toFixed(2)}%)`}</span>
						</div>
					</div>
					<Button onClick={onBack} variant="secondary">
						Back
					</Button>
				</div>
			)}
			{!isVotingEnabled && (
				<div className={css.infoBlock}>Only GP token holders can vote on this on-chain proposal</div>
			)}
		</div>
	);
}
