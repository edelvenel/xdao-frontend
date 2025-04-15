import { Wallet, WalletInfoWithOpenMethod } from "@tonconnect/ui-react";
import { API } from "shared/api";
import { create } from "zustand";
interface IWalletProps {
  walletAddress: string | null;
  isWalletConnected: boolean;
  connectWallet: (
    wallet: Wallet | (Wallet & WalletInfoWithOpenMethod)
  ) => Promise<void>;
  setWalletAddress: (walletAddress: string | null) => void;
}

export const useWallet = create<IWalletProps>((set, get) => ({
  walletAddress: null,
  isWalletConnected: false,
  connectWallet: async (wallet) => {
    const { setWalletAddress } = get();
    setWalletAddress(wallet.account.address);
    API.Me.linkWallet({
      walletAddress: wallet.account.address,
    });
  },
  setWalletAddress: (walletAddress) => {
    set({ walletAddress });
    set({ isWalletConnected: !!walletAddress });
  },
}));
