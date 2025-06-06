import cn from 'classnames';
import { PropsWithChildren } from 'react';
import { IVote, ProposalStatus } from 'shared/types';
import { Button } from 'shared/ui/Button';
import { Title } from 'shared/ui/Title';
import { formatNumber } from 'shared/utils/formatters';
import css from './styles.module.scss';

interface IProposalDetailProps extends PropsWithChildren {
	isVotingEnabled: boolean;
	userVote: IVote | null;
	status: ProposalStatus;
	onVote?: () => void;
	onBack: () => void;
}

export function ProposalDetailLayout({
	isVotingEnabled,
	userVote,
	status,
	onVote,
	onBack,
	children,
}: IProposalDetailProps) {
	return (
		<div
			className={cn(
				css.layout,
				isVotingEnabled && css.voteEnabled,
				(userVote !== null || status !== ProposalStatus.Active) && css.voted
			)}
		>
			<div className={css.content}>{children}</div>
			{isVotingEnabled && userVote === null && status === ProposalStatus.Active && (
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
							<span className={css.accent}>{`yes (${formatNumber(userVote.impact / 10000000)}%)`}</span>
						</div>
					</div>
					<Button onClick={onBack} variant="secondary">
						Back
					</Button>
				</div>
			)}
			{userVote === null && status !== ProposalStatus.Active && status !== ProposalStatus.Pending && (
				<div className={css.voted}>
					<div className={css.info}>
						<div className={css.title}>
							<Title variant="medium" value="Proposal is closed" />
						</div>
						<div className={css.row}>
							<span>Reason:</span>
							<span className={css.accent}>{status}</span>
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
