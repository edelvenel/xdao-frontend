import { format } from 'date-fns';
import { useNavigate } from 'react-router';
import { proposalNameMapper } from 'shared/constants';
import { ProposalDetailLayout } from 'shared/layouts/proposal-detail-layout';
import { IDao, IProposal, IVote } from 'shared/types';
import { Copy } from 'shared/ui/Copy';
import { friendlyWallet } from 'shared/ui/Wallet/Wallet';
import css from '../../styles.module.scss';
import { FormHeader } from '../FormHeader';
import { SignaturesBlock } from '../SignaturesBlock';

interface IChangeDAONameDetailProps {
	dao: IDao;
	votes: IVote[];
	proposal: IProposal;
	userVote: IVote | null;
	onVote: () => void;
}

export function ChangeDAONameDetail({ dao, votes, proposal, userVote, onVote }: IChangeDAONameDetailProps) {
	const navigate = useNavigate();
	const formatedCreatedAt = format(new Date(proposal.createdAt), 'LLL dd, yyyy | HH:mm');

	return (
		<ProposalDetailLayout isVotingEnabled={true} userVote={userVote} onBack={() => navigate(-1)} onVote={onVote}>
			<div className={css.page}>
				<FormHeader
					name={proposal.name}
					description={proposal.description}
					status={proposal.status}
					consensus={proposal.consensus}
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
							<div className={css.label}>Current name</div>
							<div className={css.value}>{dao.name}</div>
						</div>
					</div>

					<div className={css.block}>
						<div className={css.column}>
							<div className={css.label}>New name</div>
							<div className={css.value}>NO DATA</div>
						</div>
					</div>

					<div className={css.block}>
						<div className={css.column}>
							<div className={css.label}>Created by</div>
							<div className={css.value}>{friendlyWallet(proposal.createdBy)}</div>
						</div>
						<Copy text={friendlyWallet(proposal.createdBy)} />
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
