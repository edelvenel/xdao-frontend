import { PROPOSALS } from "app/mocks/constants";
import React from "react";
import { IProposal, ProposalType } from "shared/types";
import { ICreateProposalPayload, proposalsBuilders } from "./payloads";
import { Address } from "@ton/core";

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
    async (payload: ICreateProposalPayload): Promise<void> => {
      // create proposal or throw error
      try {
        switch (payload.type) {
          case ProposalType.AddGP: {
            // let body = proposalsBuilders(Address.parseRaw(DAOAddress))[payload.type]
            break;
          }

          case ProposalType.ChangeDAOName: {
            break;
          }

          case ProposalType.ChangeGPTransferStatus: {
            break;
          }

          case ProposalType.ChangeGeneralConsensus: {
            break;
          }

          case ProposalType.CustomProposal: {
            break;
          }

          case ProposalType.SendDAOFunds: {
            break;
          }

          case ProposalType.TransferGPTokens: {
            break;
          }

          default:
            break;
        }
      } catch (error) {
        console.error("Unable to create proposal", error);
        throw error;
      }
    },
    []
  );

  const updateProposal = React.useCallback(
    async (id: string, payload: unknown): Promise<void> => {
      // update proposal or throw error
      try {
        console.log("Proposal successfully updated", id, payload); // TODO: replace with real implementation
      } catch (error) {
        console.error("Unable to update proposal", error);
        throw error;
      }
    },
    []
  );

  return { proposals, fetchProposals, createProposal, updateProposal };
}
