import { ScreenLoader } from 'pages/tech/sceen-loader';
import React, { JSX } from 'react';
import { getDaoProposalVotes } from 'shared/api/proposals/methods';
import { store } from 'shared/store';
import { IProposal, IVote, ProposalType } from 'shared/types';
import { getUserFriendlyAddress } from 'shared/utils/formatters';
import { AddGPDetail } from './components/AddGPDetail';
import { ChangeDAONameDetail } from './components/ChangeDAONameDetail';
import { ChangeGPTransferStatusDetail } from './components/ChangeGPTransferStatusDetail';
import { ChangeGeneralConsensusDetail } from './components/ChangeGeneralConsensusDetail';
import { RemoveGPDetail } from './components/RemoveGPDetail';
import { SendFundsDetail } from './components/SendFundsDetail';
import { TransferGPDetail } from './components/TransferGPDetail';

interface IProposalDetailsProps {
	proposal: IProposal;
	onVote: () => void;
}

export function ProposalDetails({ proposal, onVote }: IProposalDetailsProps): JSX.Element | null {
	const { setIsBackground } = store.useApp();
	const [votes, setVotes] = React.useState<IVote[] | null>(null);
	const { token } = store.useAuth();
	const { walletAddress } = store.useWallet();

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

	if (votes === null) {
		return <ScreenLoader />;
	}

	switch (proposal.type) {
		case ProposalType.AddGP:
			return <AddGPDetail proposal={proposal} userVote={getUserVote()} votes={votes} onVote={onVote} />;

		case ProposalType.RemoveGP:
			return <RemoveGPDetail proposal={proposal} userVote={getUserVote()} votes={votes} onVote={onVote} />;

		case ProposalType.TransferGPTokens:
			return <TransferGPDetail proposal={proposal} userVote={getUserVote()} votes={votes} onVote={onVote} />;

		case ProposalType.ChangeGPTransferStatus:
			return (
				<ChangeGPTransferStatusDetail proposal={proposal} userVote={getUserVote()} votes={votes} onVote={onVote} />
			);

		case ProposalType.ChangeGeneralConsensus:
			return (
				<ChangeGeneralConsensusDetail proposal={proposal} userVote={getUserVote()} votes={votes} onVote={onVote} />
			);

		case ProposalType.SendDAOFunds:
			return <SendFundsDetail proposal={proposal} votes={votes} userVote={getUserVote()} onVote={onVote} />;

		case ProposalType.ChangeDAOName:
			return <ChangeDAONameDetail proposal={proposal} userVote={getUserVote()} votes={votes} onVote={onVote} />;

		// case 8:
		//   return <CustomProposalDetail proposal={proposal} onVote={onVote} />;
		default:
			return null;
	}
}
