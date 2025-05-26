import { tgDataApi } from 'app/api';
export * from './useTelegramData';

export const telegramDataAPI = {
	linkWalletToTelegram: (telegramInitData: string) =>
		tgDataApi.v1.linkWalletToTelegram(
			{ telegramInitData },
			{ headers: { Authorization: `Bearer ${localStorage.getItem('bearer_token')}` } }
		),
	unlinkWalletFromTelegram: () =>
		tgDataApi.v1.unlinkWalletFromTelegram({
			headers: { Authorization: `Bearer ${localStorage.getItem('bearer_token')}` },
		}),
	getTelegramData: () =>
		tgDataApi.v1.getTelegramData({
			headers: { Authorization: `Bearer ${localStorage.getItem('bearer_token')}` },
		}),
};
