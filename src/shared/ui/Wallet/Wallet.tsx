import { Address } from '@ton/core';

interface IWalletProps {
	raw?: string;
}

export function friendlyWallet(raw: string) {
	return raw ? Address.parseRaw(raw).toString({ bounceable: false }) : '';
}

export function Wallet({ raw }: IWalletProps) {
	return raw ? Address.parseRaw(raw).toString({ bounceable: false }) : '';
}
