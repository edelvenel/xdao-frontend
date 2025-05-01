import { PROPOSALS } from 'app/mocks/constants';
import { IProposal } from 'shared/types';
import { ICreateProposalPayload } from './payloads';
import { useCreateProposalByType } from 'shared/hooks/createProposalByType';
import { useState, useCallback } from 'react';

export function useProposals() {
  const [proposals, setProposals] = useState<IProposal[]>([]);
  const { createProposalByType } = useCreateProposalByType();

  const mapper = useCallback((data: unknown[]): IProposal[] => {
    //TODO: write a mapper for specific data (if needed)
    const result = data as IProposal[];

    return result;
  }, []);

  const fetchProposals = useCallback(async () => {
    //TODO: get source data
    const sourceData = PROPOSALS;

    const formatedData: IProposal[] = mapper(sourceData);
    setProposals(formatedData);
  }, [mapper]);

  const createProposal = useCallback(
    async (payload: ICreateProposalPayload): Promise<void> => {
      try {
        console.log('createProposal 1');
        console.log(payload, 123);
        await createProposalByType(payload);
        console.log('createProposal 3');
      } catch (error) {
        console.error('Unable to create proposal', error);
        throw error;
      }
    },
    [createProposalByType]
  );

  const updateProposal = useCallback(
    async (id: string, payload: unknown): Promise<void> => {
      // update proposal or throw error
      try {
        console.log('Proposal successfully updated', id, payload); // TODO: replace with real implementation
      } catch (error) {
        console.error('Unable to update proposal', error);
        throw error;
      }
    },
    []
  );

  return { proposals, fetchProposals, createProposal, updateProposal };
}
