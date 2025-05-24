import { authAPI } from './auth';
import { meAPI } from './me';
import { telegramDataAPI } from './telegram-data';

export const API = {
	Auth: authAPI,
	Me: meAPI,
	TelegramData: telegramDataAPI,
};
