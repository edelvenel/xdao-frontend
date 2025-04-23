import { useTonConnectUI } from "@tonconnect/ui-react";
import { routes } from "app/router/routes";
import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";
import { Icon } from "shared/icons";
import { store } from "shared/store";
import { Button } from "shared/ui/Button";
import { Modal } from "shared/ui/Modal";
import { hapticFeedback } from "shared/utils/haptic";
import css from "./styles.module.scss";

export function Header() {
  const [onConnectWallet, setOnConnectWallet] = React.useState<boolean>(false);
  const { walletAddress } = store.useWallet();

  const [tonConnectUI] = useTonConnectUI();

  const handleOnAddressClick = React.useCallback(() => {
    hapticFeedback("press");
    setOnConnectWallet(true);
  }, []);

  const handleOnWalletConnectTON = React.useCallback(async () => {
    await tonConnectUI.disconnect();
    await tonConnectUI.openSingleWalletModal("telegram-wallet");
  }, [tonConnectUI]);

  const handleOnWalletConnect = React.useCallback(async () => {
    await tonConnectUI.disconnect();
    await tonConnectUI.openModal();
  }, [tonConnectUI]);

  return (
    <div className={css.header}>
      <Link className={css.logo} to={routes.root}>
        <Icon.Special.Logo />
      </Link>
      <div className={css.info}>
        <div
          className={css.infoButton}
          onClick={() => toast.error("Unimplemented")}
        >
          <Icon.Common.Question />
        </div>
        <div className={css.user} onClick={handleOnAddressClick}>
          <div className={css.text}>{walletAddress}</div>
          <div className={css.icon}>
            <Icon.Common.User />
          </div>
        </div>
      </div>

      {onConnectWallet && (
        <Modal title="Connect wallet" onClose={() => setOnConnectWallet(false)}>
          <div className={css.connectWalletModal}>
            <div className={css.currentWallet}>
              <div className={css.text}>{walletAddress}</div>
            </div>

            <div className={css.actions}>
              <Button variant="primary" onClick={handleOnWalletConnectTON}>
                Connect to TON
              </Button>
              <Button variant="secondary" onClick={handleOnWalletConnect}>
                Connect another wallet
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
