import { IHashedData, IPendingProposal, IProposal } from 'shared/types';
import { create } from 'zustand';

interface IProposalsStore {
	proposals: IProposal[] | null;
	pendingProposals: IPendingProposal[] | null;
	oldProposals: IProposal[] | null;
	votesInProcess: string[] | null;
	setProposals: (value: IProposal[] | null) => void;
	setPendingProposals: (value: Record<string, IHashedData<IPendingProposal>> | null) => void;
	setOldProposals: (value: IProposal[] | null) => void;
	setVotesInProcess: (proposalAddresses: string[]) => void;
	sendVote: (proposalAddress: string) => void;
}

export const useProposals = create<IProposalsStore>((set, get) => ({
	proposals: null,
	pendingProposals: null,
	oldProposals: null,
	votesInProcess: null,
	setProposals: (proposals) => {
		set({ proposals });
	},
	setPendingProposals: (proposals) => {
		const pendingProposals: IPendingProposal[] | null =
			proposals === null ? null : Object.values(proposals).map((proposal) => proposal.data);
		set({ pendingProposals });
	},
	setOldProposals: (proposals) => {
		set({ oldProposals: proposals });
	},
	setVotesInProcess: (proposalAddresses) => {
		set({ votesInProcess: proposalAddresses });
	},
	sendVote: (proposalAddress) => {
		const { votesInProcess } = get();
		set({ votesInProcess: [...(votesInProcess ?? []), proposalAddress] });
	},
}));
