import React from "react";
import { IProposal, PROPOSALS } from "shared/types";

export function useProposals() {
  const [proposals, setProposals] = React.useState<IProposal[]>([]);

  const mapper = React.useCallback((data: unknown[]): IProposal[] => {
    //TODO: write a mapper for specific data (if needed)
    const result = data as IProposal[];

    return result;
  }, []);

  const fetchProposals = React.useCallback(async () => {
    //TODO: get source data
    const sourceData = PROPOSALS;

    const formatedData: IProposal[] = mapper(sourceData);
    setProposals(formatedData);
  }, [mapper]);

  const createProposal = React.useCallback(
    async (proposal: IProposal): Promise<void> => {
      // create proposal or throw error
      try {
        console.log("Proposal successfully created", proposal); // TODO: replace with real implementation
      } catch (error) {
        console.error("Unable to create proposal", error);
        throw error;
      }
    },
    []
  );

  const updateProposal = React.useCallback(
    async (id: string, proposal: IProposal): Promise<void> => {
      // update proposal or throw error
      try {
        console.log("Proposal successfully updated", id, proposal); // TODO: replace with real implementation
      } catch (error) {
        console.error("Unable to update proposal", error);
        throw error;
      }
    },
    []
  );

  return { proposals, fetchProposals, createProposal, updateProposal };
}
