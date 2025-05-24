import React from 'react';
import { API } from '..';
import WebApp from '@twa-dev/sdk';
import { store } from 'shared/store';

export const useTelegramData = () => {
	const { telegramId, username: linkedTelegramUsername, setUsername, setTelegramId } = store.useTelegramData();
	const [isTelegramLinked, setIsTelegramLinked] = React.useState(!!telegramId);
	const [isTelegramDataLoading, setIsTelegramDataLoading] = React.useState(false);
	const fetchTelegramData = React.useCallback(async () => {
		try {
			setIsTelegramDataLoading(true);
			const data = await API.TelegramData.getTelegramData();
			setTelegramId(data.telegramId);
			setUsername(data.username);
		} catch (error) {
			setTelegramId(null);
			setUsername(null);
			console.error('Error fetching Telegram data:', error);
		} finally {
			setIsTelegramDataLoading(false);
		}
	}, [setTelegramId, setUsername]);

	React.useEffect(() => {
		if (telegramId) {
			setIsTelegramLinked(true);
		} else {
			setIsTelegramLinked(false);
		}
	}, [telegramId]);

	const toggleTelegramLink = React.useCallback(() => {
		if (isTelegramLinked) {
			API.TelegramData.unlinkWalletFromTelegram().then(() => {
				fetchTelegramData();
			});
		} else {
			API.TelegramData.linkWalletToTelegram(WebApp.initData).then(() => {
				fetchTelegramData();
			});
		}
	}, [isTelegramLinked, fetchTelegramData]);
	return {
		isTelegramLinked,
		toggleTelegramLink,
		fetchTelegramData,
		linkedTelegramUsername,
		isTelegramDataLoading,
	};
};
