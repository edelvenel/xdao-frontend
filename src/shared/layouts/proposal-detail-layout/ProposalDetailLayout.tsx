import cn from 'classnames';
import { PropsWithChildren } from 'react';
import { IUserVote } from 'shared/types';
import { Button } from 'shared/ui/Button';
import { Title } from 'shared/ui/Title';
import css from './styles.module.scss';

interface IProposalDetailProps extends PropsWithChildren {
	isVotingEnabled: boolean;
	userVote: IUserVote | null;
	onVote: () => void;
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
					<Button onClick={onVote}>Vote</Button>
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
							<span className={css.accent}>{`${userVote.label} (${userVote.impact}%)`}</span>
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
