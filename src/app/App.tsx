import { TonConnectUIProvider } from '@tonconnect/ui-react';
import WebApp from '@twa-dev/sdk';
import React from 'react';
import { BrowserRouter } from 'react-router';
import { API } from 'shared/api';
import { store } from 'shared/store';
import { AppErrorBoundary } from './app-error-boundary';
import { NotificationLayer } from './notifications';
import { AppRouter } from './router/AppRouter';
import { SplashScreen } from './splash';
import './styles/root.scss';

export function App() {
	const { setToken } = store.useAuth();
	const { isWalletConnected } = store.useWallet();
	const { fetchMe } = store.useMe();

	React.useEffect(() => {
		if (WebApp.isVersionAtLeast('7.7')) {
			WebApp.disableVerticalSwipes();
			WebApp.lockOrientation();
		}
	}, []);

	React.useEffect(() => {
		fetchMe();
	}, [fetchMe]);

	React.useEffect(() => {
		const auth = async () => {
			const data = await API.Auth.login({
				initData: WebApp.initData,
				// initData:
				// "user=%7B%22id%22%3A412695732%2C%22first_name%22%3A%22Alex%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22strd0x%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2F16blGsH6CVS0WBbgJNTMQF1wE4Y2PQNXP66P9NWceRQ.svg%22%7D&chat_instance=-5291377078830732949&chat_type=private&auth_date=1732785422&signature=A_kr_72VKxW_qeraolJbBMa70Z6U3JM2TX6QOKQYgWUbIYqCrGm9lHS1pFjzOzwbA-xNwRuPjn2GkePmE74VDQ&hash=b7b743df6ed197e993ce5e82143faa383415a37da17ef05eb35e193b2c6d43df",
			});

			if (data) {
				localStorage.setItem('bearer_token', data.token);
				setToken(data.token);
			}
		};

		auth();
	}, [setToken]);

	// const isLoading = React.useMemo(() => {
	//   if (!token) {
	//     return true;
	//   }

	//   if (!me) {
	//     return true;
	//   }

	//   return false;
	// }, [me, token]);

	// if (isLoading) {
	//   return (
	//     <AppErrorBoundary>
	//       <ScreenLoader />
	//       <NotificationLayer />
	//     </AppErrorBoundary>
	//   );
	// }

	return (
		<TonConnectUIProvider
			manifestUrl={`https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json`}
			walletsListConfiguration={{
				includeWallets: [
					{
						appName: 'telegram-wallet',
						name: 'Wallet',
						imageUrl: 'https://wallet.tg/images/logo-288.png',
						aboutUrl: 'https://wallet.tg/',
						universalLink: 'https://t.me/wallet?attach=wallet',
						bridgeUrl: 'https://bridge.ton.space/bridge',
						platforms: ['ios', 'android', 'macos', 'windows', 'linux'],
					},
				],
			}}
			actionsConfiguration={{
				twaReturnUrl: 'https://t.me/Propeller_demo_bot/propeller/wallet',
			}}
		>
			{!isWalletConnected && <SplashScreen />}
			{isWalletConnected && (
				<AppErrorBoundary>
					<BrowserRouter>
						<AppRouter />
						<NotificationLayer />
					</BrowserRouter>
				</AppErrorBoundary>
			)}
		</TonConnectUIProvider>
	);
}
