import { IProposal } from 'shared/types';
import { ICreateProposalPayload } from './payloads';
import { useProposalActions } from 'shared/hooks/useProposalActions';
import { useState, useCallback } from 'react';
import { getDaoProposals, getProposals } from './methods';
import { FilterEnum1 } from 'app/api/codegen';
import { store } from 'shared/store';
import { useTonAddress } from '@tonconnect/ui-react';

export function useProposals() {
	const [proposals, setProposals] = useState<IProposal[]>([]);
	const { holders } = store.useFormType();
	const [hasMore, setHasMore] = useState(false);
	const { createProposalByType, makeVote } = useProposalActions();
	const { token } = store.useAuth();
	const address = useTonAddress(false);

	const holder = holders.find((h) => h.owner_address === address);

	const fetchDaoProposals = useCallback(async (daoAddress: string) => {
		const proposals = await getDaoProposals(token ?? '', daoAddress);
		setHasMore(proposals.length != 100);
		setProposals(proposals);
	}, []);

	const fetchProposals = useCallback(
		async (filter?: FilterEnum1) => {
			const proposals = await getProposals(token ?? '', filter);
			setHasMore(proposals.length != 100);
			setProposals(proposals);
		},
		[token]
	);

	const createProposal = useCallback(
		async (payload: ICreateProposalPayload, daoAddress: string): Promise<void> => {
			if (!holder) {
				throw new Error('Holder not found');
			}
			try {
				await createProposalByType(payload, daoAddress, holder);
			} catch (error) {
				console.error('Unable to create proposal', error);
				throw error;
			}
		},
		[createProposalByType, holder]
	);

	const submitVote = useCallback(async (proposal: IProposal): Promise<void> => {
		if (!holder) {
			throw new Error('Holder not found');
		}
		try {
			await makeVote(proposal, holder);
		} catch (error) {
			console.error('Unable to create proposal', error);
			throw error;
		}
	}, []);

	const updateProposal = useCallback(async (id: string, payload: unknown): Promise<void> => {
		// update proposal or throw error
		try {
			console.log('Proposal successfully updated', id, payload); // TODO: replace with real implementation
		} catch (error) {
			console.error('Unable to update proposal', error);
			throw error;
		}
	}, []);

	return { proposals, fetchDaoProposals, fetchProposals, createProposal, updateProposal, submitVote, hasMore };
}
