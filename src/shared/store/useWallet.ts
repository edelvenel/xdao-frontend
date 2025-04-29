import { Wallet, WalletInfoWithOpenMethod } from '@tonconnect/ui-react';
import { API } from 'shared/api';
import { create } from 'zustand';
interface IWalletProps {
	walletAddress: string | null;
	isWalletConnected: boolean;
	isWalletChecked: boolean;
	connectWallet: (wallet: Wallet | (Wallet & WalletInfoWithOpenMethod)) => Promise<void>;
	setWalletAddress: (walletAddress: string | null) => void;
	setIsWalletChecked: () => void;
}

export const useWallet = create<IWalletProps>((set, get) => ({
	walletAddress: null,
	isWalletConnected: false,
	isWalletChecked: false,
	connectWallet: async (wallet) => {
		const { setWalletAddress, setIsWalletChecked } = get();
		setIsWalletChecked();
		setWalletAddress(wallet.account.address);
		API.Me.linkWallet({
			walletAddress: wallet.account.address,
		});
	},
	setWalletAddress: (walletAddress) => {
		set({ walletAddress });
		set({ isWalletConnected: !!walletAddress });
	},
	setIsWalletChecked: () => {
		set({ isWalletChecked: true });
	},
}));
