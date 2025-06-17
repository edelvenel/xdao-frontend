import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { BrowserRouter } from 'react-router';
import { TonProof } from 'shared/components/TonProof';
import { store } from 'shared/store';
import { AppErrorBoundary } from './app-error-boundary';
import { NotificationLayer } from './notifications';
import { AppRouter } from './router/AppRouter';
import { SplashScreen } from './splash';
import './styles/root.scss';

export function App() {
	// const { token } = store.useAuth();
	const { isWalletConnected } = store.useWallet();

	return (
		<TonConnectUIProvider
			manifestUrl={import.meta.env.VITE_MANIFEST_URL}
			actionsConfiguration={{
				twaReturnUrl: 'https://t.me/Propeller_demo_bot/propeller/wallet',
			}}
		>
			{!isWalletConnected && (
				<>
					<SplashScreen />
					<TonProof />
				</>
			)}
			{isWalletConnected && (
				<BrowserRouter>
					<AppErrorBoundary>
						<AppRouter />
						<NotificationLayer />
					</AppErrorBoundary>
				</BrowserRouter>
			)}
		</TonConnectUIProvider>
	);
}
