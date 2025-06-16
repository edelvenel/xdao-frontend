import { Address } from '@ton/core';
import { IPendingDao, IPendingProposal, ProposalType } from 'shared/types';

export const shortenAddress = (str: string, partLength?: number): string => {
	const length = partLength ?? 5;
	const userFriendlyAddress = getUserFriendlyAddress(str);
	if (userFriendlyAddress.length <= 6) {
		return userFriendlyAddress;
	}
	return userFriendlyAddress.slice(0, length) + '…' + userFriendlyAddress.slice(-length);
};

export const getUserFriendlyAddress = (address: string): string => {
	try {
		const result = Address.isFriendly(address) ? address : Address.parseRaw(address).toString({ bounceable: false });
		return result;
	} catch (error) {
		console.log(error);
		return address;
	}
};

export const getDaoHash = async (daoName: string, ownerWalletAddress: string): Promise<string> => {
	const rawAddress = Address.isRaw(ownerWalletAddress)
		? ownerWalletAddress
		: Address.parseRaw(ownerWalletAddress).toString({ bounceable: false });
	const jsonObject: IPendingDao = { name: daoName, ownerRawAddress: rawAddress };
	const jsonString = JSON.stringify(jsonObject);
	try {
		const hash = await hashStringSHA256(jsonString);
		return hash;
	} catch (error) {
		console.log(error);
		return '';
	}
};

export const getProposalHash = async (
	name: string,
	type: ProposalType,
	description: string,
	ownerAddress: string
): Promise<string> => {
	const rawAddressOwner = Address.isRaw(ownerAddress)
		? ownerAddress
		: Address.parseRaw(ownerAddress).toString({ bounceable: false });
	const jsonObject: IPendingProposal = {
		name: name,
		type: type,
		description: description,
		ownerRawAddress: rawAddressOwner,
	};
	const jsonString = JSON.stringify(jsonObject);
	try {
		const hash = await hashStringSHA256(jsonString);
		return hash;
	} catch (error) {
		console.log(error);
		return '';
	}
};

export async function hashStringSHA256(str: string): Promise<string> {
	const encoder = new TextEncoder();
	const data = encoder.encode(str);
	const hashBuffer = await crypto.subtle.digest('SHA-256', data);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
	return hashHex;
}

export function formatNumber(value: number, fixed?: number): number {
	if (!fixed || fixed < 0) {
		return Number(value.toFixed(2));
	} else {
		return Number(value.toFixed(fixed));
	}
}
