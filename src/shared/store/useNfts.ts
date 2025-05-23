import { INft } from 'shared/types';
import { create } from 'zustand';

interface INftsStore {
	nfts: INft[] | null;
	oldNfts: INft[] | null;
	hasMore: boolean;
	offset: number;
	total: number | null;
	setNfts: (value: INft[] | null) => void;
	setOldNfts: (value: INft[] | null) => void;
	setHasMore: (value: boolean) => void;
	setOffset: (value: number) => void;
	setTotal: (value: number) => void;
}

export const useNfts = create<INftsStore>((set) => ({
	nfts: null,
	oldNfts: null,
	hasMore: false,
	offset: 0,
	total: null,
	setNfts: (nfts) => {
		set({ nfts });
	},
	setOldNfts: (nfts) => {
		set({ oldNfts: nfts });
	},
	setHasMore: (value) => {
		set({ hasMore: value });
	},
	setOffset: (value) => {
		set({ offset: value });
	},
	setTotal: (value) => {
		set({ total: value });
	},
}));
