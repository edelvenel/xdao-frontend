import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import React from "react";
import { store } from "shared/store";
import css from "./styles.module.scss";

export function SplashScreen() {
  const { isWalletConnected, connectWallet } = store.useWallet();
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();

  const handleOnWalletConnect = React.useCallback(async () => {
    await tonConnectUI.openSingleWalletModal("telegram-wallet");
  }, [tonConnectUI]);

  if (wallet) {
    if (!isWalletConnected) {
      connectWallet(wallet);
    }
    return null;
  }

  return (
    <div className={css.splash}>
      <div className={css.figures}>
        <div className={css.button} onClick={handleOnWalletConnect}>
          <span>Connect Wallet</span>
        </div>
      </div>
    </div>
  );
}
