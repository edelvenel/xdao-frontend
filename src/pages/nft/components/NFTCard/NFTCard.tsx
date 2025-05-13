import WebApp from '@twa-dev/sdk';
import { routes } from 'app/router/routes';
import React from 'react';
import { useNavigate } from 'react-router';
import { Icon } from 'shared/icons';
import { store } from 'shared/store';
import { IDao, INft, ProposalType } from 'shared/types';
import { hapticFeedback } from 'shared/utils/haptic';
import css from './styles.module.scss';

interface INFTCardProps {
	dao: IDao;
	nft: INft;
}

export function NFTCard({ nft, dao }: INFTCardProps) {
	const { setProposalType, setDao } = store.useFormType();
	const navigate = useNavigate();

	const handleOnScan = React.useCallback(() => {
		hapticFeedback('press');
		WebApp.openLink(nft.tonScan);
	}, [nft.tonScan]);

	const handleOnSendNFT = React.useCallback(() => {
		hapticFeedback('press');
		setProposalType(ProposalType.SendDAOFunds);
		setDao(dao);
		navigate(routes.createProposal);
	}, [dao, navigate, setDao, setProposalType]);

	return (
		<div className={css.nftCard}>
			<div className={css.content}>
				<div className={css.leftColumn}>
					<div className={css.hash}>NFT</div>
					<div className={css.image} style={{ backgroundImage: `url(${nft.imgUrl})` }} />
				</div>
				<div className={css.rightColumn}>
					<div className={css.id}>ID:{nft.id}</div>
					<div className={css.block} onClick={handleOnScan}>
						TON Scan
						<div className={css.icon}>
							<Icon.Common.Chain />
						</div>
					</div>
					<div className={css.block} onClick={handleOnSendNFT}>
						Send NFT
						<div className={css.icon}>
							<Icon.Common.TinyLink />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
