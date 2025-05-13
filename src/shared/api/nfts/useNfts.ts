import React from 'react';
import { TON_API_TOKEN } from 'shared/constants';
import { store } from 'shared/store';
import { INft } from 'shared/types';
import { getAccountNftItems } from './methods';

export function useNfts() {
	const getNfts = React.useCallback(async (walletAddress: string): Promise<{ nfts: INft[]; total: number }> => {
		const { offset, setOffset } = store.useNfts.getState();
		try {
			const { nfts, hasMore, total } = await getAccountNftItems(TON_API_TOKEN, walletAddress, offset);

			const { setNfts, oldNfts, setOldNfts, setHasMore, setTotal } = store.useNfts.getState();
			setNfts([...(oldNfts ?? []), ...(nfts ?? [])]);
			setTotal(total);
			setOldNfts([...(nfts ?? [])]);
			setOffset((oldNfts !== null ? oldNfts.length : 0) + (nfts !== null ? nfts.length : 0));
			setHasMore(hasMore);

			return { nfts, total };
		} catch (error) {
			console.error('Unable to get NFTs', error);
			throw error;
		}
	}, []);

	return {
		getNfts,
	};
}
