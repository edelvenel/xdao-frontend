import { getDaoHolders } from 'shared/api/proposals/methods';
import { ICreateProposalPayload } from 'shared/api/proposals/payloads';
import { IDao, IHolder, ProposalType } from 'shared/types';
import { create } from 'zustand';
interface IFormTypeStore {
	dao: IDao | null;
	proposalType: ProposalType | null;
	formData: ICreateProposalPayload | null;
	holders: IHolder[] | null;
	oldHolders: IHolder[] | null;
	holdersOffset: number;
	holdersHasMore: boolean;
	resetHolders: () => void;
	setFormData: (data: ICreateProposalPayload | null) => void;
	setDao: (dao: IDao | null) => void;
	setProposalType: (proposalType: ProposalType | null) => void;
	setOldHolders: () => void;
	fetchHolders: (token: string, daoAddress: string) => Promise<void>;
}

export const useFormType = create<IFormTypeStore>((set, get) => ({
	dao: null,
	holders: null,
	oldHolders: null,
	proposalType: null,
	formData: null,
	holdersOffset: 0,
	holdersHasMore: false,
	resetHolders: () => {
		set({ holders: null, oldHolders: null, holdersOffset: 0, holdersHasMore: false });
	},
	fetchHolders: async (token: string, daoAddress: string) => {
		const { fetchHolders } = get();
		const { holdersOffset, oldHolders, setOldHolders } = get();
		const { holders, hasMore } = await getDaoHolders(token, daoAddress, holdersOffset);

		set({
			holders: [...(oldHolders ?? []), ...holders],
			holdersOffset: hasMore ? holdersOffset + holders.length : holdersOffset,
			holdersHasMore: hasMore,
		});

		setOldHolders();
		if (hasMore) {
			fetchHolders(token, daoAddress);
		} else {
			set({ holdersOffset: 0, holdersHasMore: false, oldHolders: null });
		}
	},

	setFormData: (data) => {
		set({ formData: data });
	},
	setDao: (dao) => {
		const { resetHolders } = get();
		set({ dao });
		resetHolders();
	},
	setProposalType: (proposalType) => {
		set({ proposalType });
	},
	setOldHolders: () => {
		const { holders } = get();
		set({ oldHolders: holders });
	},
}));
