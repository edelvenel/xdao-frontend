import { useTonConnectUI } from '@tonconnect/ui-react';

export function useTonWallet() {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = tonConnectUI.wallet;
  const isConnected = Boolean(wallet?.account.address);
  const connect = () => tonConnectUI.openModal();
  const disconnect = () => tonConnectUI.disconnect();

  return { wallet, isConnected, connect, disconnect };
}
