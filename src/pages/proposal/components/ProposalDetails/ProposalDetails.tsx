import React, { JSX } from 'react';
import { store } from 'shared/store';
import { IProposal, ProposalType } from 'shared/types';
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

	React.useEffect(() => {
		setIsBackground(false);
	}, [setIsBackground]);

	switch (proposal.type) {
		case ProposalType.AddGP:
			return <AddGPDetail proposal={proposal} onVote={onVote} />;

		case ProposalType.RemoveGP:
			return <RemoveGPDetail proposal={proposal} onVote={onVote} />;

		case ProposalType.TransferGPTokens:
			return <TransferGPDetail proposal={proposal} onVote={onVote} />;

		case ProposalType.ChangeGPTransferStatus:
			return <ChangeGPTransferStatusDetail proposal={proposal} onVote={onVote} />;

		case ProposalType.ChangeGeneralConsensus:
			return <ChangeGeneralConsensusDetail proposal={proposal} onVote={onVote} />;

		case ProposalType.SendDAOFunds:
			return <SendFundsDetail proposal={proposal} onVote={onVote} />;

		case ProposalType.ChangeDAOName:
			return <ChangeDAONameDetail proposal={proposal} onVote={onVote} />;

		// case 8:
		//   return <CustomProposalDetail proposal={proposal} onVote={onVote} />;
		default:
			return null;
	}
}
