import { format } from 'date-fns';
import { useNavigate } from 'react-router';
import { proposalNameMapper } from 'shared/constants';
import { ProposalDetailLayout } from 'shared/layouts/proposal-detail-layout';
import { IDao, IProposal, IVote } from 'shared/types';
import { Copy } from 'shared/ui/Copy';
import css from '../../styles.module.scss';
import { FormHeader } from '../FormHeader';
import { SignaturesBlock } from '../SignaturesBlock';

interface IChangeGeneralConsensusDetailProps {
	dao: IDao;
	votes: IVote[];
	proposal: IProposal;
	onVote: () => void;
}

export function ChangeGeneralConsensusDetail({ dao, votes, proposal, onVote }: IChangeGeneralConsensusDetailProps) {
	const navigate = useNavigate();
	const formatedCreatedAt = format(new Date(proposal.createdAt), 'LLL dd, yyyy | HH:mm');

	return (
		<ProposalDetailLayout
			isVotingEnabled={false}
			userVote={proposal.userVote}
			onBack={() => navigate(-1)}
			onVote={onVote}
		>
			<div className={css.page}>
				<FormHeader
					name={proposal.name}
					description={proposal.description}
					status={proposal.status}
					consensus={(proposal.consensus / Number(dao?.LPTokens)) * 100}
					endDate={proposal.endDate}
				/>

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
							<div className={css.value}>{dao.consensus / 10000}%</div>
						</div>
					</div>

					<div className={css.block}>
						<div className={css.column}>
							<div className={css.label}>New consensus</div>
							<div className={css.value}>{proposal.data.success_percentage/100}%</div>
						</div>
					</div>
					<div className={css.block}>
						<div className={css.column}>
							<div className={css.label}>Created by</div>
							<div className={css.value}>{proposal.createdBy}</div>
						</div>
						<Copy text={proposal.createdBy} />
					</div>
					<div className={css.block}>
						<div className={css.column}>
							<div className={css.label}>Created at</div>
							<div className={css.value}>{formatedCreatedAt}</div>
						</div>
					</div>
				</div>

				<SignaturesBlock dao={dao} votes={votes} />
			</div>
		</ProposalDetailLayout>
	);
}
