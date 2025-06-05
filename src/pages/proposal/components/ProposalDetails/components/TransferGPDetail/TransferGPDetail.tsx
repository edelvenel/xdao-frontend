import { format } from 'date-fns';
import { useNavigate } from 'react-router';
import { proposalNameMapper } from 'shared/constants';
import { ProposalDetailLayout } from 'shared/layouts/proposal-detail-layout';
import { IDao, IProposal, IVote } from 'shared/types';
import { Copy } from 'shared/ui/Copy';
import { getUserFriendlyAddress, shortenAddress } from 'shared/utils/formatters';
import css from '../../styles.module.scss';
import { FormHeader } from '../FormHeader';
import { SignaturesBlock } from '../SignaturesBlock';

interface ITransferGPDetailProps {
	dao: IDao;
	votes: IVote[];
	proposal: IProposal;
	userVote: IVote | null;
	onVote: () => void;
}

export function TransferGPDetail({ dao, votes, proposal, userVote, onVote }: ITransferGPDetailProps) {
	const navigate = useNavigate();
	const formatedCreatedAt = format(new Date(proposal.createdAt), 'LLL dd, yyyy | HH:mm');

	return (
		<ProposalDetailLayout isVotingEnabled={true} userVote={userVote} onBack={() => navigate(-1)} onVote={onVote}>
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
					{proposal.votingType && (
						<div className={css.block}>
							<div className={css.column}>
								<div className={css.label}>Voting type</div>
								<div className={css.value}>{proposal.votingType.label}</div>
							</div>
						</div>
					)}
					<div className={css.block}>
						<div className={css.column}>
							<div className={css.label}>Transfer GP tokens</div>
							<div className={css.value}>{proposal.data.transfer_data ?? 'NO DATA'}</div>
						</div>
					</div>
					<div className={css.block}>
						<div className={css.column}>
							<div className={css.label}>Transfer from</div>
							<div className={css.value}>
								{shortenAddress(getUserFriendlyAddress(proposal.data.from_jetton_wallet_owner))}
							</div>
						</div>
						<Copy text={getUserFriendlyAddress(proposal.data.from_jetton_wallet_owner)} />
					</div>
					<div className={css.block}>
						<div className={css.column}>
							<div className={css.label}>Transfer to</div>
							<div className={css.value}>NO DATA</div>
						</div>
						<Copy text="NO DATA" />
					</div>
					<div className={css.block}>
						<div className={css.column}>
							<div className={css.label}>Created by</div>
							<div className={css.value}>{shortenAddress(getUserFriendlyAddress(proposal.createdBy))}</div>
						</div>
						<Copy text={getUserFriendlyAddress(proposal.createdBy)} />
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
