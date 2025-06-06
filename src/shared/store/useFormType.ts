import { getDaoHolders } from 'shared/api/proposals/methods';
import { IDao, IHolder, ProposalType } from 'shared/types';
import { getUserFriendlyAddress } from 'shared/utils/formatters';
import { create } from 'zustand';
interface IFormTypeStore {
	dao: IDao | null;
	proposalType: ProposalType | null;
	removingWallet: string | null;
	holders: IHolder[] | null;
	oldHolders: IHolder[] | null;
	holdersOffset: number;
	holdersHasMore: boolean;
	resetHolders: () => void;
	setDao: (dao: IDao | null) => void;
	setProposalType: (proposalType: ProposalType | null) => void;
	setOldHolders: () => void;
	fetchHolders: (token: string, daoAddress: string) => Promise<void>;
	setRemovingWallet: (walletAddress: string | null) => void;
}

export const useFormType = create<IFormTypeStore>((set, get) => ({
	dao: null,
	holders: null,
	oldHolders: null,
	proposalType: null,
	removingWallet: null,
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
	setRemovingWallet: (walletAddress) => {
		set({ removingWallet: walletAddress !== null ? getUserFriendlyAddress(walletAddress) : null });
	},
}));
