import { format } from 'date-fns';
import { useNavigate } from 'react-router';
import { proposalNameMapper } from 'shared/constants';
import { Icon } from 'shared/icons';
import { ProposalDetailLayout } from 'shared/layouts/proposal-detail-layout';
import { IDao, IProposal, IVote } from 'shared/types';
import { Button } from 'shared/ui/Button';
import { Copy } from 'shared/ui/Copy';
import { Title } from 'shared/ui/Title';
import { getUserFriendlyAddress, shortenAddress } from 'shared/utils/formatters';
import css from '../../styles.module.scss';
import { FormHeader } from '../FormHeader';
import { SignaturesBlock } from '../SignaturesBlock';

interface IAddGPDetailProps {
	dao: IDao;
	votes: IVote[];
	proposal: IProposal;
	userVote: IVote | null;
	onVote: () => void;
}

export function AddGPDetail({ votes, dao, proposal, userVote, onVote }: IAddGPDetailProps) {
	const navigate = useNavigate();
	const formatedCreatedAt = format(new Date(proposal.createdAt), 'LLL dd, yyyy | HH:mm');

	if (proposal.data.receivers.length > 1) {
		return (
			<div className={css.page}>
				<div className={css.error}>
					<Icon.Special.Error />
				</div>
				<Title value="Error!" variant="large" />
				<div className={css.placeholder}>Proposal seems to be falsified</div>

				<div className={css.backButton}>
					<Button variant="secondary" onClick={() => navigate(-1)}>
						Back
					</Button>
				</div>
			</div>
		);
	}

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
							<div className={css.label}>Add GP tokens</div>
							<div className={css.value}>{proposal.data.receivers[0].amount / 10 ** 9 || 'Empty'}</div>
						</div>
					</div>
					<div className={css.block}>
						<div className={css.column}>
							<div className={css.label}>New GP Address</div>
							<div className={css.value}>
								{proposal.data.receivers[0].address
									? shortenAddress(getUserFriendlyAddress(proposal.data.receivers[0].address))
									: 'Empty'}
							</div>
						</div>
						{proposal.data.receivers[0].address && (
							<Copy text={getUserFriendlyAddress(proposal.data.receivers[0].address)} />
						)}
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

				<SignaturesBlock votes={votes} />
			</div>
		</ProposalDetailLayout>
	);
}
