import { IProposal } from 'shared/types';
import { ICreateProposalPayload } from './payloads';
import { useCreateProposalByType } from 'shared/hooks/createProposalByType';
import { useState, useCallback } from 'react';
import { getDaoProposals, getProposals } from './methods';
import { FilterEnum1 } from 'app/api/codegen';
import { store } from 'shared/store';
import { useDaos } from '../daos/useDaos';
import { useTonAddress } from '@tonconnect/ui-react';

export function useProposals() {
  const [proposals, setProposals] = useState<IProposal[]>([]);
  const { createProposalByType } = useCreateProposalByType();
  const [hasMore, setHasMore] = useState(false);
  const { token } = store.useAuth();
  const { holders } = useDaos();
  const address = useTonAddress(false);
  
  const isWalletHolder = holders.find((holder) => holder.owner_address === address);

  if (!isWalletHolder) {
      throw new Error('Holder not found');
  }

  const fetchDaoProposals = useCallback(async (daoAddress: string) => {
    const proposals = await getDaoProposals(token ?? "", daoAddress);
    setHasMore(proposals.length != 100)
    setProposals(proposals);
  }, []);

  const fetchProposals = useCallback(async (filter?: FilterEnum1) => {
    const proposals = await getProposals(token ?? "", filter)
    setHasMore(proposals.length != 100)
    setProposals(proposals);
  }, [token]);

  const createProposal = useCallback(
    async (payload: ICreateProposalPayload, daoAddress: string): Promise<void> => {
      try {
        console.log('createProposal 1');
        await createProposalByType(payload, daoAddress, isWalletHolder);
        console.log('createProposal 3');
      } catch (error) {
        console.error('Unable to create proposal', error);
        throw error;
      }
    },
    [createProposalByType, isWalletHolder]
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
