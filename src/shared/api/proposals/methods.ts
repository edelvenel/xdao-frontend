import { api } from 'app/api';
import { Proposal, Vote } from 'app/api/codegen';
import { proposalFilterMapp, proposalTypeMapper } from 'shared/constants';
import { IHolder, IProposal, IVote, ProposalFilter } from 'shared/types';
import { parseDate } from 'shared/utils/formatters';
import { daoMapper } from '../daos/methods';

export const proposalMapper = (proposal: Proposal): IProposal => {
	return {
		name: proposal.name,
		description: proposal.description ?? '',
		endDate: parseDate(proposal.date_expire),
		consensus: Number(proposal.success_percentage) / 100,
		address: proposal.address,
		createdAt: parseDate(proposal.date_start),
		createdBy: proposal.initiated_by_address,
		status: proposal.status,
		type: proposalTypeMapper[proposal.type],
		data: proposal.data,
		dao: daoMapper(proposal.dao),
		currentAmount: Number(proposal.current_amount) / 10 ** 9,
		successAmount: Number(proposal.success_amount) / 10 ** 9,
		totalSupply: Number(proposal.total_supply) / 10 ** 9,
	};
};

export const voteMapper = (vote: Vote): IVote => {
	return {
		walletAddress: vote.voter_address,
		impact: Number(vote.amount) / 10 ** 9,
	};
};

export const getDaoProposals = async (
	token: string,
	offset: number,
	daoAddress: string
): Promise<{ proposals: IProposal[]; hasMore: boolean }> => {
	const response = await api.v1.getDaoProposals(
		{ limit: 100, offset: offset, daoAddress },
		{ format: 'json', headers: { Authorization: `Bearer ${token}` } }
	);

	return {
		proposals: response.items.map(proposalMapper),
		hasMore: response.total > offset + response.items.length,
	};
};

export const getProposals = async (
	token: string,
	offset: number,
	filter?: ProposalFilter,
	search?: string
): Promise<{ proposals: IProposal[]; hasMore: boolean; total: number }> => {
	const response = await api.v1.getProposals(
		{ limit: 100, offset: offset, filter: filter !== undefined ? proposalFilterMapp[filter] : undefined, search },
		{ format: 'json', headers: { Authorization: `Bearer ${token}` } }
	);

	return {
		proposals: response.items.map(proposalMapper),
		hasMore: response.total > offset + response.items.length,
		total: response.total,
	};
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

export const getDaoHolders = async (
	token: string,
	daoAddress: string,
	offset: number
): Promise<{ holders: IHolder[]; hasMore: boolean }> => {
	const response = await api.v1.getDaoHolders(
		{ daoAddress, offset },
		{ format: 'json', headers: { Authorization: `Bearer ${token}` } }
	);

	return {
		holders: response.items.map((item) => {
			return { ...item, balance: Number(item.balance) / 10 ** 9 };
		}),
		hasMore: response.total > offset + response.items.length,
	};
};
