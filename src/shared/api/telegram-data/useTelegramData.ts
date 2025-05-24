import React from 'react';
import { store } from 'shared/store';
import { API } from '..';
import WebApp from '@twa-dev/sdk';

export const useTelegramData = () => {
	const { telegramId, username: linkedTelegramUsername, fetch: fetchTelegramData } = store.useTelegramData();

	const [isTelegramLinked, setIsTelegramLinked] = React.useState(!!telegramId);
	React.useEffect(() => {
		if (telegramId) {
			setIsTelegramLinked(true);
		} else {
			setIsTelegramLinked(false);
		}
	}, [telegramId]);

	const toggleTelegramLink = React.useCallback(() => {
		if (isTelegramLinked) {
			API.TelegramData.unlinkWalletFromTelegram().then((res) => {
				fetchTelegramData();
			});
		} else {
			API.TelegramData.linkWalletToTelegram(WebApp.initData).then((res) => {
				fetchTelegramData();
			});
		}
	}, [isTelegramLinked, fetchTelegramData]);
	return {
		isTelegramLinked,
		toggleTelegramLink,
		fetchTelegramData,
		linkedTelegramUsername,
	};
};
