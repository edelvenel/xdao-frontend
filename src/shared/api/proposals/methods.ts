import { api } from 'app/api';
import { FilterEnum, Proposal, Vote } from 'app/api/codegen';
import { proposalTypeMapper } from 'shared/constants';
import { IHolder, IProposal, IVote } from 'shared/types';

export const proposalMapper = (proposal: Proposal): IProposal => {
	return {
		name: proposal.name,
		description: proposal.description,
		endDate: new Date(proposal.date_expire),
		consensus: Number(proposal.success_amount),
		id: proposal.address,
		daoAddress: proposal.dao_address,
		// currentVotes: proposal.current_amount,
		createdAt: new Date(proposal.date_start), //TODO: replace with real data
		createdBy: proposal.initiated_by_address,
		status: proposal.status,
		type: proposalTypeMapper[proposal.type],
		userVote: null,
		votingType: {
			id: 1,
			label: 'One wallet = one vote',
		},
		data: proposal.data,
	};
};

export const voteMapper = (vote: Vote): IVote => {
	return {
		walletAddress: vote.voter_address,
		impact: Number(vote.amount),
	};
};

export const getDaoProposals = async (token: string, offset: number, daoAddress: string): Promise<IProposal[]> => {
	const response = await api.v1.getDaoProposals(
		{ offset, daoAddress },
		{ format: 'json', headers: { Authorization: `Bearer ${token}` } }
	);

	return response.items.map(proposalMapper);
};

export const getProposals = async (token: string, offset: number, filter?: FilterEnum): Promise<IProposal[]> => {
	const response = await api.v1.getProposals(
		{ limit: 100, offset: offset, filter: filter },
		{ format: 'json', headers: { Authorization: `Bearer ${token}` } }
	);

	return response.items.map(proposalMapper);
};

export const getDaoProposalVotes = async (
	token: string,
	daoAddress: string,
	proposalAddress: string
): Promise<IVote[]> => {
	const response = await api.v1.getDaoProposalVotes(
		{ daoAddress, proposalAddress },
		{ format: 'json', headers: { Authorization: `Bearer ${token}` } }
	);

	return response.items.map(voteMapper);
};

export const getDaoHolders = async (token: string, daoAddress: string): Promise<IHolder[]> => {
	const response = await api.v1.getDaoHolders(
		{ daoAddress },
		{ format: 'json', headers: { Authorization: `Bearer ${token}` } }
	);

	return response.items;
};
