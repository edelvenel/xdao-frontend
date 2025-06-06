import { format } from 'date-fns';
import { useNavigate } from 'react-router';
import { proposalNameMapper } from 'shared/constants';
import { ProposalDetailLayout } from 'shared/layouts/proposal-detail-layout';
import { IProposal, IVote } from 'shared/types';
import { Copy } from 'shared/ui/Copy';
import { formatNumber, getUserFriendlyAddress, shortenAddress } from 'shared/utils/formatters';
import css from '../../styles.module.scss';
import { FormHeader } from '../FormHeader';
import { SignaturesBlock } from '../SignaturesBlock';

interface IChangeGeneralConsensusDetailProps {
	votes: IVote[];
	proposal: IProposal;
	userVote: IVote | null;
	onVote: () => void;
}

export function ChangeGeneralConsensusDetail({
	votes,
	proposal,
	userVote,
	onVote,
}: IChangeGeneralConsensusDetailProps) {
	const navigate = useNavigate();
	const formatedCreatedAt = format(new Date(proposal.createdAt), 'LLL dd, yyyy | HH:mm');
	const userFriendlyAddress = getUserFriendlyAddress(proposal.createdBy);

	return (
		<ProposalDetailLayout
			status={proposal.status}
			isVotingEnabled={true}
			userVote={userVote}
			onBack={() => navigate(-1)}
			onVote={onVote}
		>
			<div className={css.page}>
				<FormHeader proposal={proposal} />

				<div className={css.card}>
					<div className={css.block}>
						<div className={css.column}>
							<div className={css.label}>Proposal type</div>
							<div className={css.value}>{proposalNameMapper[proposal.type]}</div>
						</div>
					</div>

					<div className={css.block}>
						<div className={css.column}>
							<div className={css.label}>Current consensus</div>
							<div className={css.value}>{formatNumber(proposal.dao.consensus)}%</div>
						</div>
					</div>

					<div className={css.block}>
						<div className={css.column}>
							<div className={css.label}>New consensus</div>
							<div className={css.value}>{formatNumber(proposal.data.success_percentage / 100)}%</div>
						</div>
					</div>
					<div className={css.block}>
						<div className={css.column}>
							<div className={css.label}>Created by</div>
							<div className={css.value}>{shortenAddress(userFriendlyAddress)}</div>
						</div>
						<Copy text={userFriendlyAddress} />
					</div>
					<div className={css.block}>
						<div className={css.column}>
							<div className={css.label}>Created at</div>
							<div className={css.value}>{formatedCreatedAt}</div>
						</div>
					</div>
				</div>

				<SignaturesBlock votes={votes} />
			</div>
		</ProposalDetailLayout>
	);
}
