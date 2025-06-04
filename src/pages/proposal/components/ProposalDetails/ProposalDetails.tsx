import { ScreenLoader } from 'pages/tech/sceen-loader';
import React, { JSX } from 'react';
import { getDao } from 'shared/api/daos/methods';
import { getDaoProposalVotes } from 'shared/api/proposals/methods';
import { store } from 'shared/store';
import { IDao, IProposal, IVote, ProposalType } from 'shared/types';
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
	setDao: (dao: IDao) => void;
	onVote: () => void;
}

export function ProposalDetails({ proposal, onVote }: IProposalDetailsProps): JSX.Element | null {
	const { setIsBackground } = store.useApp();
	const [votes, setVotes] = React.useState<IVote[] | null>(null);
	const [dao, setDaoState] = React.useState<IDao | null>(null);
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
				const votes = await getDaoProposalVotes(token, proposal.daoAddress, proposal.address);
				setVotes(votes);
			}
		};
		const fetchDao = async () => {
			if (token !== null) {
				const dao = await getDao(token, proposal.daoAddress);
				setDaoState(dao);
			}
		};
		fetchVotes();
		fetchDao();
	}, [proposal.daoAddress, proposal.address, token]);

	React.useEffect(() => {
		setIsBackground(false);
	}, [setIsBackground]);

	if (votes === null || dao === null) {
		return <ScreenLoader />;
	}

	switch (proposal.type) {
		case ProposalType.AddGP:
			return <AddGPDetail dao={dao} proposal={proposal} userVote={getUserVote()} votes={votes} onVote={onVote} />;

		case ProposalType.RemoveGP:
			return <RemoveGPDetail dao={dao} proposal={proposal} userVote={getUserVote()} votes={votes} onVote={onVote} />;

		case ProposalType.TransferGPTokens:
			return <TransferGPDetail dao={dao} proposal={proposal} userVote={getUserVote()} votes={votes} onVote={onVote} />;

		case ProposalType.ChangeGPTransferStatus:
			return (
				<ChangeGPTransferStatusDetail
					dao={dao}
					proposal={proposal}
					userVote={getUserVote()}
					votes={votes}
					onVote={onVote}
				/>
			);

		case ProposalType.ChangeGeneralConsensus:
			return (
				<ChangeGeneralConsensusDetail
					dao={dao}
					proposal={proposal}
					userVote={getUserVote()}
					votes={votes}
					onVote={onVote}
				/>
			);

		case ProposalType.SendDAOFunds:
			return <SendFundsDetail dao={dao} proposal={proposal} votes={votes} userVote={getUserVote()} onVote={onVote} />;

		case ProposalType.ChangeDAOName:
			return (
				<ChangeDAONameDetail dao={dao} proposal={proposal} userVote={getUserVote()} votes={votes} onVote={onVote} />
			);

		// case 8:
		//   return <CustomProposalDetail proposal={proposal} onVote={onVote} />;
		default:
			return null;
	}
}
