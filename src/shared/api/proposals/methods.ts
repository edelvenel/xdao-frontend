import { api } from 'app/api';
import { FilterEnum1, Proposal } from 'app/api/codegen';
import { DAOS_MOCK, VOTING_TYPE } from 'app/mocks/constants';
import { proposalTypeMapper } from 'shared/constants';
import { DaoStatus, IProposal } from 'shared/types';

export const proposalMapper = (proposal: Proposal): IProposal => {
	return {
		name: proposal.name,
		description: proposal.description,
		endDate: new Date(proposal.date_expire),
		consensus: Number(proposal.success_amount),
		id: proposal.address,
		dao: {
			address: proposal.dao_address,
			jetton_address: proposal.jetton_master_address,
			id: '',
			logo: '',
			name: '',
			activeProposals: 0,
			LPTokens: '',
			social: [],
			status: DaoStatus.Transferable,
			consensus: 0,
			distributionRules: [],
			slots: {
				total: 0,
				reserved: 0,
			},
		},
		// currentVotes: proposal.current_amount,
		createdAt: new Date(proposal.date_start), //TODO: replace with real data
		status: {
			id: 1,
			label: 'active',
		},
		type: proposalTypeMapper[proposal.type],
		userVote: null,
		votingType: VOTING_TYPE[0],
		votes: {
			agree: [
				{ walletAddress: DAOS_MOCK[0].distributionRules[0].walletAddress, impact: 25 },
				{ walletAddress: DAOS_MOCK[0].distributionRules[1].walletAddress, impact: 25 },
			],
		},
	};
};

export const getDaoProposals = async (token: string, daoAddress: string): Promise<IProposal[]> => {
	const response = await api.v1.getDaoProposals(
		{ daoAddress },
		{ format: 'json', headers: { Authorization: `Bearer ${token}` } }
	);

	return response.items.map(proposalMapper);
};

export const getProposals = async (token: string, filter?: FilterEnum1): Promise<IProposal[]> => {
	const response = await api.v1.getProposals(
		{ filter: filter },
		{ format: 'json', headers: { Authorization: `Bearer ${token}` } }
	);

	return response.items.map(proposalMapper);
};

export const getDaoHolders = async (token: string, daoAddress: string): Promise<unknown> => {
	const response = await api.v1.getDaoHolders(
		{ daoAddress },
		{ format: 'json', headers: { Authorization: `Bearer ${token}` } }
	);

	return response.items;
};
