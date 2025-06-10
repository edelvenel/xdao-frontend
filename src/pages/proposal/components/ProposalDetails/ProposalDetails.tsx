import React, { JSX } from 'react';
import { useNavigate } from 'react-router';
import { getDaoProposalVotes } from 'shared/api/proposals/methods';
import { Icon } from 'shared/icons';
import { ProposalDetailLayout } from 'shared/layouts/proposal-detail-layout';
import { store } from 'shared/store';
import { IProposal, IVote, ProposalType } from 'shared/types';
import { Button } from 'shared/ui/Button';
import { Title } from 'shared/ui/Title';
import { getUserFriendlyAddress } from 'shared/utils/formatters';
import { ProposalPageLoader } from '../ProposalPageLoader';
import { AddGPDetail } from './components/AddGPDetail';
import { ChangeDAONameDetail } from './components/ChangeDAONameDetail';
import { ChangeGPTransferStatusDetail } from './components/ChangeGPTransferStatusDetail';
import { ChangeGeneralConsensusDetail } from './components/ChangeGeneralConsensusDetail';
import { FormHeader } from './components/FormHeader';
import { RemoveGPDetail } from './components/RemoveGPDetail';
import { SendFundsDetail } from './components/SendFundsDetail';
import { SignaturesBlock } from './components/SignaturesBlock';
import { TransferGPDetail } from './components/TransferGPDetail';
import css from './styles.module.scss';

interface IProposalDetailsProps {
	proposal: IProposal;
	onVote: () => void;
}

export function ProposalDetails({ proposal, onVote }: IProposalDetailsProps): JSX.Element | null {
	const { setIsBackground } = store.useApp();
	const [votes, setVotes] = React.useState<IVote[] | null>(null);
	const { token } = store.useAuth();
	const { walletAddress } = store.useWallet();

	const navigate = useNavigate();

	const getUserVote = React.useCallback(() => {
		if (!walletAddress) {
			return null;
		}
		if (!votes) {
			return null;
		}
		const vote = votes.find(
			(vote) => getUserFriendlyAddress(vote.walletAddress) === getUserFriendlyAddress(walletAddress)
		);
		if (vote) {
			return vote;
		}

		return null;
	}, [votes, walletAddress]);

	React.useEffect(() => {
		const fetchVotes = async () => {
			if (token !== null) {
				const votes = await getDaoProposalVotes(token, proposal.dao.address, proposal.address);
				setVotes(votes);
			}
		};

		fetchVotes();
	}, [proposal.address, token, proposal.dao.address]);

	React.useEffect(() => {
		setIsBackground(false);
	}, [setIsBackground]);

	if (!votes) {
		return <ProposalPageLoader />;
	}

	if (proposal.type === ProposalType.AddGP && proposal.data.receivers.length > 1) {
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
		<ProposalDetailLayout
			status={proposal.status}
			isVotingEnabled={true}
			userVote={getUserVote()}
			totalSupply={proposal.dao.totalSupply}
			onBack={() => navigate(-1)}
			onVote={onVote}
		>
			<div className={css.page}>
				<FormHeader proposal={proposal} />
				<ProposalForm proposal={proposal} votes={votes} />
				<SignaturesBlock votes={votes} totalSupply={proposal.dao.totalSupply} />
			</div>
		</ProposalDetailLayout>
	);
}

interface IProposalFormProps {
	proposal: IProposal;
	votes: IVote[];
}

function ProposalForm({ proposal }: IProposalFormProps): JSX.Element | null {
	switch (proposal.type) {
		case ProposalType.AddGP:
			return <AddGPDetail proposal={proposal} />;

		case ProposalType.RemoveGP:
			return <RemoveGPDetail proposal={proposal} />;

		case ProposalType.TransferGPTokens:
			return <TransferGPDetail proposal={proposal} />;

		case ProposalType.ChangeGPTransferStatus:
			return <ChangeGPTransferStatusDetail proposal={proposal} />;

		case ProposalType.ChangeGeneralConsensus:
			return <ChangeGeneralConsensusDetail proposal={proposal} />;

		case ProposalType.SendDAOFunds:
			return <SendFundsDetail proposal={proposal} />;

		case ProposalType.ChangeDAOName:
			return <ChangeDAONameDetail proposal={proposal} />;

		// case ProposalType.Custom:
		//   return <CustomProposalDetail proposal={proposal}  />;
		default:
			return null;
	}
}
