import { useTonConnectModal, useTonWallet } from '@tonconnect/ui-react';
import { ScreenLoader } from 'pages/tech/sceen-loader';
import React from 'react';
import { store } from 'shared/store';
import { Svg } from 'shared/svg';
import css from './styles.module.scss';

export function SplashScreen() {
	const { isWalletConnected, isWalletChecked, setIsWalletChecked, connectWallet } = store.useWallet();
	const { open } = useTonConnectModal();
	const wallet = useTonWallet();

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
						<div className={css.background}>
							<Svg.Background.Splash />
						</div>
						<div className={css.button} onClick={open}>
							<span>Connect Wallet</span>
						</div>
					</div>
				</div>
			)}
			{!isWalletChecked && <ScreenLoader />}
		</>
	);
}
