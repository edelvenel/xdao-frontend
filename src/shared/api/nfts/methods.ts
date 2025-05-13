import { tonApi } from 'app/api';
import { NftItem } from 'app/api/types';
import { INft } from 'shared/types';

export const nftsMapper = (nfts: NftItem[]): INft[] => {
	const mappedNfts: INft[] = nfts.map((nft) => {
		return {
			id: nft.index,
			imgUrl: nft.previews[0].url,
			tonScan: `https://tonviewer.com/${nft.address}`,
		};
	});

	return mappedNfts;
};

export const getAccountNftItems = async (
	token: string,
	accountId: string,
	offset: number
): Promise<{ nfts: INft[]; total: number; hasMore: boolean }> => {
	try {
		const response = await tonApi.v2.getAccountNftItems(
			{ limit: 100, offset: offset, accountId },
			{
				format: 'json',
				headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
			}
		);

		const mappedNfts = nftsMapper(response.nft_items);

		return { nfts: mappedNfts, total: response.total, hasMore: response.total > offset + response.nft_items.length };
	} catch (error) {
		console.error(error);
		throw error;
	}
};
