import { IDao, IHashedData, IPendingDao } from 'shared/types';
import { create } from 'zustand';

interface IDaosStore {
	daos: IDao[] | null;
	pendingDaos: IPendingDao[] | null;
	oldDaos: IDao[] | null;
	setDaos: (value: IDao[] | null) => void;
	setPendingDaos: (value: Record<string, IHashedData<IPendingDao>> | null) => void;
	setOldDaos: (value: IDao[] | null) => void;
}

export const useDaos = create<IDaosStore>((set) => ({
	daos: null,
	pendingDaos: null,
	oldDaos: null,
	setDaos: (daos) => {
		set({ daos });
	},
	setPendingDaos: (daos) => {
		const pendingDaos: IPendingDao[] | null = daos === null ? null : Object.values(daos).map((dao) => dao.data);
		set({ pendingDaos });
	},
	setOldDaos: (daos) => {
		set({ oldDaos: daos });
	},
}));
