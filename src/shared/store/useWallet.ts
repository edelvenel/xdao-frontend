import { Wallet, WalletInfoWithOpenMethod } from "@tonconnect/ui-react";
import { API } from "shared/api";
import { create } from "zustand";
interface IWalletProps {
  walletAddress: string | null;
  isWalletConnected: boolean;
  connectWallet: (
    wallet: Wallet | (Wallet & WalletInfoWithOpenMethod)
  ) => Promise<void>;
}

export const useWallet = create<IWalletProps>((set) => ({
  walletAddress: null,
  isWalletConnected: false,
  connectWallet: async (wallet) => {
    const response = await API.Me.linkWallet({
      walletAddress: wallet.account.address,
    });

    if (response) {
      set({ walletAddress: wallet.account.address });
    } else {
      set({ walletAddress: null });
    }

    set({ isWalletConnected: response });
  },
}));
