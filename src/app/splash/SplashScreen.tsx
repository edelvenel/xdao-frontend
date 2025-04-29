import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { ScreenLoader } from 'pages/tech/sceen-loader';
import React from 'react';
import { store } from 'shared/store';
import css from './styles.module.scss';

export function SplashScreen() {
	const { isWalletConnected, isWalletChecked, setIsWalletChecked, connectWallet } = store.useWallet();
	const [tonConnectUI] = useTonConnectUI();
	const wallet = useTonWallet();

	const handleOnWalletConnect = React.useCallback(async () => {
		await tonConnectUI.openSingleWalletModal('telegram-wallet');
	}, [tonConnectUI]);

	React.useEffect(() => {
		if (wallet) {
			if (!isWalletConnected) {
				connectWallet(wallet);
			}
			setIsWalletChecked();
		} else {
			setInterval(setIsWalletChecked, 1000);
		}
	}, [connectWallet, isWalletConnected, setIsWalletChecked, wallet]);

	return (
		<>
			{isWalletChecked && (
				<div className={css.splash}>
					<div className={css.figures}>
						<div className={css.button} onClick={handleOnWalletConnect}>
							<span>Connect Wallet</span>
						</div>
					</div>
				</div>
			)}
			{!isWalletChecked && <ScreenLoader />}
		</>
	);
}
