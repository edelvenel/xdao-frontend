import { IProposal } from 'shared/types';
import { ICreateProposalPayload } from './payloads';
import { useCreateProposalByType } from 'shared/hooks/createProposalByType';
import { useState, useCallback } from 'react';
import { getDaoProposals, getMyProposals } from './methods';
import { FilterEnum1 } from 'app/api/codegen';

export function useProposals() {
  const [proposals, setProposals] = useState<IProposal[]>([]);
  const { createProposalByType } = useCreateProposalByType();
  const [hasMore, setHasMore] = useState(false);

  const fetchDaoProposals = useCallback(async (daoAddress: string) => {
    let proposals = await getDaoProposals(daoAddress);
    setHasMore(proposals.length != 100)
    setProposals(proposals);
  }, []);

  const fetchProposals = useCallback(async (filter?: FilterEnum1) => {
    let proposals = await getMyProposals(filter)
    setHasMore(proposals.length != 100)
    setProposals(proposals);
  }, []);

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

  return { proposals, fetchDaoProposals, fetchProposals, createProposal, updateProposal, hasMore };
}
