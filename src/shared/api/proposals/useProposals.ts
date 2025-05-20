import { useTonAddress } from '@tonconnect/ui-react';
import { useCallback, useState } from 'react';
import { useProposalActions } from 'shared/hooks/useProposalActions';
import { store } from 'shared/store';
import { IProposal, ProposalFilter } from 'shared/types';
import { getDaoProposals, getProposals } from './methods';
import { ICreateProposalPayload } from './payloads';

export function useProposals() {
	const [proposals, setProposals] = useState<IProposal[]>([]);
	const { holders } = store.useFormType();
	const [hasMore, setHasMore] = useState(false);
	const [currentOffset, setCurrentOffset] = useState(0);
	const { createProposalByType, makeVote } = useProposalActions();
	const { token } = store.useAuth();
	const address = useTonAddress(false);

	const holder = holders.find((h) => h.owner_address === address);

	const resetProposals = useCallback(() => {
		setHasMore(false);
		setCurrentOffset(0);
		setProposals([]);
	}, []);

	const fetchDaoProposals = useCallback(
		async (daoAddress: string) => {
			const { proposals, hasMore } = await getDaoProposals(token ?? '', currentOffset, daoAddress);
			if (proposals.length === 100) {
				setCurrentOffset((prevOffset) => prevOffset + proposals.length);
				setProposals((prev) => [...prev, ...proposals]);
			} else {
				setProposals([...proposals]);
			}
			setHasMore(hasMore);
		},
		[currentOffset, token]
	);

	const fetchProposals = useCallback(
		async (search?: string, filter?: ProposalFilter) => {
			const { proposals, hasMore } = await getProposals(
				token ?? '',
				currentOffset,
				filter === ProposalFilter.AllProposals ? undefined : filter,
				search
			);
			if (proposals.length === 100) {
				setCurrentOffset((prevOffset) => prevOffset + proposals.length);
				setProposals((prev) => [...prev, ...proposals]);
			} else {
				setProposals([...proposals]);
			}
			setHasMore(hasMore);
		},
		[currentOffset, token]
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

	return {
		proposals,
		resetProposals,
		fetchDaoProposals,
		fetchProposals,
		createProposal,
		updateProposal,
		submitVote,
		hasMore,
	};
}
