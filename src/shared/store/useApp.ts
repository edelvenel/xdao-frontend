import { create } from 'zustand';

export interface IAppStore {
	topContentElement: HTMLDivElement | null;
	isMenuShown: boolean;
	isHeaderShown: boolean;
	isBackground: boolean;
	isTopContent: boolean;
	setIsBackground: (value: boolean) => void;
	setTopContentElement: (element: HTMLDivElement | null) => void;
	setIsMenuShown: (isShown: boolean) => void;
	setIsHeaderShown: (isShown: boolean) => void;
	setIsTopContent: (value: boolean) => void;
}

export const useApp = create<IAppStore>((set) => ({
	topContentElement: null,
	isMenuShown: true,
	isHeaderShown: true,
	isBackground: false,
	isTopContent: false,
	setIsBackground: (value) => {
		set({ isBackground: value });
	},
	setTopContentElement: (element) => {
		set({ topContentElement: element });
	},
	setIsMenuShown(isShown) {
		set({ isMenuShown: isShown });
	},
	setIsHeaderShown(isShown) {
		set({ isHeaderShown: isShown });
	},
	setIsTopContent(value) {
		set({ isTopContent: value });
	},
}));
