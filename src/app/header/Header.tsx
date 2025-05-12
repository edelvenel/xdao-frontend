import { Address } from '@ton/core';
import { useTonAddress, useTonConnectModal, useTonConnectUI } from '@tonconnect/ui-react';
import { routes } from 'app/router/routes';
import React from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router';
import { Icon } from 'shared/icons';
import { store } from 'shared/store';
import { Button } from 'shared/ui/Button';
import { Modal } from 'shared/ui/Modal';
import { hapticFeedback } from 'shared/utils/haptic';
import css from './styles.module.scss';
import { shortenAddress } from 'shared/utils/formatters';

export function Header() {
	const [isConnectWalletOpen, setIsConnectWalletOpen] = React.useState<boolean>(false);
	const { walletAddress } = store.useWallet();

	const userFriendlyAddress = React.useMemo(() => {
		return walletAddress && Address.parseRaw(walletAddress).toString({ bounceable: false });
	}, [walletAddress]);

	const [tonConnectUI] = useTonConnectUI();
	const { open } = useTonConnectModal();
	const address = useTonAddress();

	const handleOnAddressClick = React.useCallback(() => {
		hapticFeedback('press');
		setIsConnectWalletOpen(true);
	}, []);

	const disconnectWallet = async () => {
		try {
			await tonConnectUI.disconnect();
			window.location.reload();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className={css.header}>
			<Link className={css.logo} to={routes.root}>
				<Icon.Special.Logo />
			</Link>
			<div className={css.info}>
				<div className={css.infoButton} onClick={() => toast.error('Unimplemented')}>
					<Icon.Common.Question />
				</div>
				<div className={css.user} onClick={handleOnAddressClick}>
					<div className={css.text}>{shortenAddress(userFriendlyAddress ?? '')}</div>
					<div className={css.icon}>
						<Icon.Common.User />
					</div>
				</div>
			</div>

			<Modal
				isOpen={isConnectWalletOpen}
				title="Connect wallet"
				titleAlign="center"
				onClose={() => setIsConnectWalletOpen(false)}
			>
				<div className={css.connectWalletModal}>
					<div className={css.currentWallet}>
						<div className={css.text}>{userFriendlyAddress}</div>
					</div>

					<div className={css.actions}>
						<Button variant="primary" onClick={address ? disconnectWallet : open}>
							{address ? 'Disconnect wallet' : 'Connect to TON'}
						</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
}
