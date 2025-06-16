import { Address } from '@ton/core';
import { useTonAddress } from '@tonconnect/ui-react';
import { compareAsc } from 'date-fns';
import React, { useCallback, useState } from 'react';
import { PENDING_EXPIRATION_DURATION } from 'shared/constants';
import { useProposalActions } from 'shared/hooks/useProposalActions';
import { store } from 'shared/store';
import { IHashedData, IPendingProposal, IPendingVote, IProposal, ProposalFilter } from 'shared/types';
import { getProposalHash, getRawAddress, getUserFriendlyAddress, getVoteHash } from 'shared/utils/formatters';
import { getDaoProposals, getDaoProposalVotes, getProposals } from './methods';
import { ICreateProposalPayload } from './payloads';

export function useProposals() {
	const [proposals, setProposals] = useState<IProposal[] | null>(null);
	const [pendingProposals, setPendingProposals] = useState<IPendingProposal[] | null>(null);
	const [pendingVotes, setPendingVotes] = useState<IPendingVote[] | null>(null);
	const { holders } = store.useFormType();
	const [hasMore, setHasMore] = useState(false);
	const [currentOffset, setCurrentOffset] = useState(0);
	const { createProposalByType, makeVote } = useProposalActions();
	const { token } = store.useAuth();
	const { walletAddress } = store.useWallet();
	const address = useTonAddress(false);

	const holder = React.useMemo(() => holders?.find((h) => h.owner_address === address), [address, holders]);

	const resetProposals = useCallback(() => {
		setHasMore(false);
		setCurrentOffset(0);
		setProposals([]);
	}, []);

	const getAllPendingProposals = (): Record<string, IHashedData<IPendingProposal>> => {
		const jsonString = localStorage.getItem('pending_proposals');

		if (jsonString === null) {
			return {};
		}

		return JSON.parse(jsonString);
	};

	const getAllPendingVotes = (): Record<string, IHashedData<IPendingVote>> => {
		const jsonString = localStorage.getItem('pending_votes');

		if (jsonString === null) {
			return {};
		}

		return JSON.parse(jsonString);
	};

	const fetchDaoProposals = useCallback(
		async (daoAddress: string) => {
			const { proposals, hasMore } = await getDaoProposals(token ?? '', currentOffset, daoAddress);

			const votesInProcess = getAllPendingVotes();
			setPendingVotes(Object.values(votesInProcess).map((vote) => vote.data));
			if (proposals.length === 100) {
				setCurrentOffset((prevOffset) => prevOffset + proposals.length);
				setProposals((prev) => [...(prev ?? []), ...proposals]);
			} else {
				setProposals([...proposals]);
			}
			setHasMore(hasMore);
		},
		[currentOffset, token]
	);

	const fetchProposalVotes = useCallback(
		async (token: string, daoAddress: string, proposalAddress: string) => {
			const votes = await getDaoProposalVotes(token, daoAddress, proposalAddress);

			if (walletAddress !== null) {
				const vote = votes.find(
					(vote) => getUserFriendlyAddress(vote.walletAddress) === getUserFriendlyAddress(walletAddress)
				);
				if (vote) {
					const votesInProcess = getAllPendingVotes();
					const hash = await getVoteHash(proposalAddress, vote.walletAddress);
					delete votesInProcess[hash];
					setPendingVotes(Object.values(votesInProcess).map((vote) => vote.data));

					const filteredHashedVotes = Object.values(votesInProcess).filter(
						(vote) => compareAsc(new Date(), new Date(vote.expiresAt)) === 1
					);

					filteredHashedVotes.forEach((filter) => {
						delete votesInProcess[filter.hash];
					});

					if (Object.keys(votesInProcess).length === 0) {
						localStorage.removeItem('pending_votes');
					} else {
						const jsonString = JSON.stringify(votesInProcess);
						localStorage.setItem('pending_votes', jsonString);
					}
				}
			}

			return votes;
		},
		[walletAddress]
	);

	const fetchProposals = useCallback(
		async (search?: string, filter?: ProposalFilter) => {
			const { proposals, hasMore, total } = await getProposals(
				token ?? '',
				currentOffset,
				filter === ProposalFilter.AllProposals ? undefined : filter,
				search
			);

			const votesInProcess = getAllPendingVotes();
			setPendingVotes(Object.values(votesInProcess).map((vote) => vote.data));

			if (total > 100) {
				if (hasMore) {
					setCurrentOffset((prevOffset) => prevOffset + proposals.length);
				}
				setProposals((prev) => [...(prev ?? []), ...proposals]);
			} else {
				setProposals([...proposals]);
			}

			setHasMore(hasMore);

			const hashedProposals = getAllPendingProposals();

			if (proposals !== null && hashedProposals !== null && walletAddress !== null) {
				for (const proposal of proposals) {
					const hash = await getProposalHash(proposal.name, proposal.type, proposal.description, walletAddress);
					delete hashedProposals[hash];
				}

				const filteredHashedProposals = Object.values(hashedProposals).filter(
					(proposal) => compareAsc(new Date(), new Date(proposal.expiresAt)) === 1
				);

				filteredHashedProposals.forEach((filter) => {
					delete hashedProposals[filter.hash];
				});

				setPendingProposals(Object.values(hashedProposals).map((proposal) => proposal.data));
				if (Object.keys(hashedProposals).length === 0) {
					localStorage.removeItem('pending_proposals');
				} else {
					const jsonString = JSON.stringify(hashedProposals);
					localStorage.setItem('pending_proposals', jsonString);
				}
			}
		},
		[currentOffset, token, walletAddress]
	);

	const createProposal = useCallback(
		async (payload: ICreateProposalPayload, daoAddress: string): Promise<void> => {
			if (!holder) {
				throw new Error('Holder not found');
			}
			try {
				await createProposalByType(payload, daoAddress, holder);

				if (walletAddress) {
					const proposalObject: IPendingProposal = {
						name: payload.name,
						description: payload.description,
						type: payload.type,
						ownerRawAddress: Address.isFriendly(walletAddress)
							? Address.parseRaw(walletAddress).toString()
							: walletAddress,
					};

					const hash = await getProposalHash(
						proposalObject.name,
						proposalObject.type,
						proposalObject.description,
						proposalObject.ownerRawAddress
					);

					const hashedProposals = getAllPendingProposals();

					hashedProposals[hash] = {
						hash: hash,
						expiresAt: Date.now() + PENDING_EXPIRATION_DURATION,
						data: proposalObject,
					};
					localStorage.setItem('pending_proposals', JSON.stringify(hashedProposals));
				}
			} catch (error) {
				console.error('Unable to create proposal', error);
				throw error;
			}
		},
		[createProposalByType, holder, walletAddress]
	);

	const submitVote = useCallback(
		async (proposal: IProposal): Promise<void> => {
			if (!holder) {
				throw new Error('Holder not found');
			}
			try {
				await makeVote(proposal, holder);
				if (walletAddress) {
					const voteObject: IPendingVote = {
						proposalAddress: getRawAddress(proposal.address),
						voterAddress: getRawAddress(holder.owner_address),
					};

					const hash = await getVoteHash(voteObject.proposalAddress, voteObject.voterAddress);

					const hashedVotes = getAllPendingVotes();

					hashedVotes[hash] = {
						hash: hash,
						expiresAt: Date.now() + PENDING_EXPIRATION_DURATION,
						data: voteObject,
					};
					localStorage.setItem('pending_votes', JSON.stringify(hashedVotes));
				}
			} catch (error) {
				console.error('Unable to sumbit vote', error);
				throw error;
			}
		},
		[holder, makeVote, walletAddress]
	);

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
		fetchProposalVotes,
		submitVote,
		hasMore,
		pendingProposals,
		pendingVotes,
	};
}
