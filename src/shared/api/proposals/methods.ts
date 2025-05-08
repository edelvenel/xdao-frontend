import { api } from "app/api";
import { FilterEnum1, Proposal } from "app/api/codegen";
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

export const getDaoProposals = async (token: string, daoAddress: string): Promise<IProposal[]> => {
    const response = await api.v1.getDaoProposals({ daoAddress }, { format: "json", headers: { "Authorization": `Bearer ${token}` } });
  
    return response.items.map(proposalMapper);
};
  

export const getProposals = async (token: string, filter?: FilterEnum1): Promise<IProposal[]> => {
    const response = await api.v1.getProposals({ filter: filter }, { format: "json", headers: { "Authorization": `Bearer ${token}` } });
  
    return response.items.map(proposalMapper);
};
  