import { api } from "app/api";
import { Proposal } from "app/api/codegen";
import { IProposal } from "shared/types";

// TODO: discuss with backend about missing data
export const proposalMapper = (proposal: Proposal): IProposal => {
    return {
        name: "",
        description: "",
        endDate: new Date(proposal.date_expire),
        consensus: proposal.success_amount,
    };
};

export const getProposals = async (address: string): Promise<IProposal[]> => {
    const response = await api.v1.getAllProposals(address);
  
    return response.items.map(proposalMapper);
};
  