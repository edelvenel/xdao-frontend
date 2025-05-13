import React from 'react';
import toast from 'react-hot-toast';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate, useParams } from 'react-router';
import { getDao } from 'shared/api/daos/methods';
import { useNfts } from 'shared/api/nfts';
import { useBackButton } from 'shared/hooks/useBackButton';
import { store } from 'shared/store';
import { IDao } from 'shared/types';
import { Button } from 'shared/ui/Button';
import { Title } from 'shared/ui/Title';
import { NFTCard } from './components/NFTCard';
import css from './styles.module.scss';

export const NftPage = React.memo(function NftPage() {
	const { id } = useParams();
	const [dao, setDao] = React.useState<IDao | null>(null);
	const { setIsBackground, setIsHeaderShown, setIsMenuShown } = store.useApp();
	const { nfts, total, hasMore } = store.useNfts();
	const { getNfts } = useNfts();
	const { token } = store.useAuth();

	const navigate = useNavigate();
	useBackButton();

	const fetchNfts = React.useCallback(async () => {
		if (id) {
			await getNfts(id);
		}
	}, [getNfts, id]);

	React.useEffect(() => {
		const fetchDao = async () => {
			if (token !== null && id) {
				const dao = await getDao(token, id);
				setDao(dao);
			}
		};

		fetchNfts();
		fetchDao();
	}, [fetchNfts, id, token]);

	React.useEffect(() => {
		setIsBackground(true);
		setIsHeaderShown(true);
		setIsMenuShown(false);
	}, [setIsBackground, setIsHeaderShown, setIsMenuShown]);

	if (!nfts || !dao) {
		return null;
	}

	return (
		<div className={css.page}>
			<Title value="NFT collection" variant="large" />
			<div className={css.info}>
				<div className={css.currency}>Total NFTs:</div>
				<div className={css.amount}>{total ?? 0}</div>
			</div>
			<InfiniteScroll
				dataLength={nfts.length}
				next={fetchNfts}
				hasMore={hasMore}
				className={css.list}
				loader={<div>Loading...</div>}
			>
				{nfts.map((nft) => (
					<NFTCard dao={dao} nft={nft} />
				))}
			</InfiniteScroll>
			<div className={css.actions}>
				<Button variant="secondary" onClick={() => navigate(-1)}>
					Back
				</Button>
				<Button variant="primary" onClick={() => toast.error('Unimplemented')}>
					Receive QR
				</Button>
			</div>
		</div>
	);
});
