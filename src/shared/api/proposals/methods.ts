import { api } from "app/api";
import { Proposal } from "app/api/codegen";
import { IProposal } from "shared/types";

export const proposalMapper = (proposal: Proposal): IProposal => {
    return {
        name: "",
        description: "",
        endDate: new Date(proposal.date_expire),
        consensus: proposal.success_amount,
        id: proposal.address,
        dao: proposal.dao_address,
        currentVotes: proposal.current_amount,
    };
};

export const getProposals = async (offset: number): Promise<IProposal[]> => {
    const response = await api.v1.getProposals({ limit: 100, offset: offset });
  
    return response.items.map(proposalMapper);
};
  