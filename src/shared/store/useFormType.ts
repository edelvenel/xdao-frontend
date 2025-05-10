import { getDaoHolders } from 'shared/api/proposals/methods';
import { ICreateProposalPayload } from 'shared/api/proposals/payloads';
import { IDao, IHolder, ProposalType } from 'shared/types';
import { create } from 'zustand';
interface IFormTypeStore {
	dao: IDao | null;
	proposalType: ProposalType | null;
	formData: ICreateProposalPayload | null;
	holders: IHolder[];
	setFormData: (data: ICreateProposalPayload | null) => void;
	setDao: (dao: IDao | null) => void;
	setProposalType: (proposalType: ProposalType | null) => void;
	setHolders: (holders: IHolder[]) => void;
	fetchHolders: (token: string, daoAddress: string) => Promise<void>;
}

export const useFormType = create<IFormTypeStore>((set) => ({
	dao: null,
	holders: [],
	proposalType: null,
	formData: null,

	fetchHolders: async (token: string, daoAddress: string) => {
		const holders = await getDaoHolders(token, daoAddress);
		set({ holders });
	},

	setFormData: (data) => {
		set({ formData: data });
	},
	setDao: (dao) => {
		set({ dao });
	},
	setProposalType: (proposalType) => {
		set({ proposalType });
	},
	setHolders: (holders) => {
		set({ holders });
	},
}));
