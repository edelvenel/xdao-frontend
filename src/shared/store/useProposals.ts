import { IHashedData, IPendingProposal, IProposal } from 'shared/types';
import { create } from 'zustand';

interface IProposalsStore {
	proposals: IProposal[] | null;
	pendingProposals: IPendingProposal[] | null;
	oldProposals: IProposal[] | null;
	setProposals: (value: IProposal[] | null) => void;
	setPendingProposals: (value: Record<string, IHashedData<IPendingProposal>> | null) => void;
	setOldProposals: (value: IProposal[] | null) => void;
}

export const useProposals = create<IProposalsStore>((set) => ({
	proposals: null,
	pendingProposals: null,
	oldProposals: null,
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
}));
