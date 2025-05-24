import { API } from 'shared/api';
import { create } from 'zustand';

interface ITelegramData {
	telegramId: string | null;
	username: string | null;
	setTelegramId: (value: string | null) => void;
	setUsername: (value: string | null) => void;
	fetch: () => Promise<void>;
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
	fetch: async () => {
		try {
			const response = await API.TelegramData.getTelegramData();
			const data = response;
			set({ telegramId: data.telegramId, username: data.username });
		} catch (error) {
			set({ telegramId: null, username: null });
			console.error(error);
		}
	},
}));
