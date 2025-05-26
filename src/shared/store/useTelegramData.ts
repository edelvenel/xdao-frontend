import { create } from 'zustand';

interface ITelegramData {
	telegramId: string | null;
	username: string | null;
	setTelegramId: (value: string | null) => void;
	setUsername: (value: string | null) => void;
}

export const useTelegramData = create<ITelegramData>((set) => ({
	telegramId: null,
	username: null,
	setTelegramId: (telegramId) => {
		set({ telegramId });
	},
	setUsername: (username) => {
		set({ username });
	},
}));
