import { IDao } from 'shared/types';
import { create } from 'zustand';

interface IDaosStore {
	daos: IDao[] | null;
	oldDaos: IDao[] | null;
	setDaos: (value: IDao[] | null) => void;
	setOldDaos: (value: IDao[] | null) => void;
}

export const useDaos = create<IDaosStore>((set) => ({
	daos: null,
	oldDaos: null,
	setDaos: (daos) => {
		set({ daos });
	},
	setOldDaos: (daos) => {
		set({ oldDaos: daos });
	},
}));
