import { ICreateProposalPayload } from 'shared/api/proposals/payloads';
import { IDao, IProposalType } from 'shared/types';
import { create } from 'zustand';
interface IFormTypeStore {
	dao: IDao | null;
	proposalType: IProposalType | null;
	formData: ICreateProposalPayload | null;
	setFormData: (data: ICreateProposalPayload | null) => void;
	setDao: (dao: IDao | null) => void;
	setProposalType: (proposalType: IProposalType | null) => void;
}

export const useFormType = create<IFormTypeStore>((set) => ({
	dao: null,
	proposalType: null,
	formData: null,
	setFormData: (data) => {
		set({ formData: data });
	},
	setDao: (dao) => {
		set({ dao });
	},
	setProposalType: (proposalType) => {
		set({ proposalType });
	},
}));
