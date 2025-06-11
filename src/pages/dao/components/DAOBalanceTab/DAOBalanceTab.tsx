import WebApp from '@twa-dev/sdk';
import { TopContent } from 'app/navigation/components/top-content';
import { routes } from 'app/router/routes';
import React from 'react';
import toast from 'react-hot-toast';
import { generatePath, Link } from 'react-router';
import { useDaos } from 'shared/api/daos/useDaos';
import { useNfts } from 'shared/api/nfts';
import { Icon } from 'shared/icons';
import { store } from 'shared/store';
import { IDao, IJetton, IRate } from 'shared/types';
import { Button } from 'shared/ui/Button';
import { TextLoader } from 'shared/ui/TextLoader';
import { JettonLoader } from './components/JettonLoader';
import css from './styles.module.scss';

interface IDAOBalanceProps {
	dao?: IDao;
	onInfo: () => void;
}

export function DAOBalanceTab({ dao }: IDAOBalanceProps) {
	const [jettons, setJettons] = React.useState<IJetton[] | null>(null);
	const [tonBalance, setTonBalance] = React.useState<number | null>(null);
	const [jettonRates, setJettonRates] = React.useState<IRate[] | null>(null);
	const { getDAOJettons, getTONBalance, getTokenRates } = useDaos();
	const { total } = store.useNfts();
	const { getNfts } = useNfts();

	React.useEffect(() => {
		const fetchJettons = async () => {
			if (dao) {
				const jettons = await getDAOJettons(dao.plugins[0].address);
				setJettons(jettons);
			}
		};

		const fetchTonBalance = async () => {
			if (dao) {
				const balance = await getTONBalance(dao.plugins[0].address);
				setTonBalance(balance);
			}
		};

		const fetchNfts = async () => {
			if (dao) {
				await getNfts(dao.plugins[0].address);
			}
		};

		fetchJettons();
		fetchTonBalance();
		fetchNfts();
	}, [dao, getDAOJettons, getNfts, getTONBalance, getTokenRates]);

	React.useEffect(() => {
		const fetchRates = async () => {
			const rates = await getTokenRates(
				[
					'ton',
					...(jettons?.map((jetton) => {
						return jetton.symbol;
					}) ?? ''),
				],
				['usd']
			);
			setJettonRates(rates);
		};

		fetchRates();
	}, [getTokenRates, jettons]);

	const mainAccountTotal = React.useMemo(() => {
		if (jettonRates === null || tonBalance === null || jettons === null) {
			return null;
		} else {
			const toneRate = jettonRates.find((rate) => rate.jettonSymbol.toUpperCase() === 'TON')?.rate;

			if (toneRate === undefined) {
				return null;
			}

			let jettonsSum: number = 0;
			for (const jetton of jettons) {
				const jettonRate =
					jettonRates.find((rate) => rate.jettonSymbol.toUpperCase() === jetton.symbol.toUpperCase())?.rate ?? 0;
				jettonsSum += jettonRate * jetton.amount;
			}

			return toneRate * tonBalance + jettonsSum;
		}
	}, [jettonRates, jettons, tonBalance]);

	return (
		<div className={css.tab}>
			{mainAccountTotal !== null && (
				<div className={css.block}>
					<div className={css.title}>Main account</div>
					<div className={css.amount}>
						<div className={css.dollar}>$</div>
						<span>{mainAccountTotal}</span>
					</div>
				</div>
			)}
			{!mainAccountTotal && (
				<div>
					<TextLoader lineHeight={108} />
				</div>
			)}
			{/* <div className={css.block}>
				<div className={css.title}>
					Future $DAO tokens
					<IconButton size="tiny" variant="secondary" onClick={onInfo}>
						<Icon.Common.QuestionTiny />
					</IconButton>
				</div>
				<div className={css.amount}>
					<div className={css.currency}>$DAO</div>
					48,750,000
				</div>
			</div> */}
			<div className={css.card}>
				{dao && tonBalance !== null && (
					<div className={css.wallet}>
						<div className={css.info}>
							<div className={css.logo}>
								<Icon.Crypto.Ton />
							</div>
							<div className={css.currency}>TON</div>
							<div className={css.amount}>{tonBalance}</div>
						</div>
						<div
							className={css.link}
							onClick={() => WebApp.openLink(`https://tonviewer.com/${dao.plugins[0].address}`)}
						>
							<Icon.Common.LittleLink />
						</div>
					</div>
				)}
				{tonBalance === null && <JettonLoader />}
				{dao &&
					jettons &&
					jettons.map((jetton) => (
						<div key={jetton.symbol} className={css.wallet}>
							<div className={css.info}>
								<div className={css.logo} style={{ backgroundImage: `url(${jetton.imgUrl})` }} />
								<div className={css.currency}>{jetton.name}</div>
								<div className={css.amount}>{jetton.amount}</div>
							</div>
							<div
								className={css.link}
								onClick={() => WebApp.openLink(`https://tonviewer.com/${dao.plugins[0].address}`)}
							>
								<Icon.Common.LittleLink />
							</div>
						</div>
					))}
				{dao && total !== null && (
					<div className={css.wallet}>
						<div className={css.info}>
							<div className={css.currency}>NFTs</div>
							<div className={css.amount}>{total ?? 0}</div>
						</div>
						<Link to={generatePath(routes.nft, { id: dao.plugins[0].address })} className={css.link}>
							<Icon.Common.Eye />
						</Link>
					</div>
				)}
				{total === null && <JettonLoader />}
			</div>
			<TopContent>
				<div className={css.actions}>
					<Button variant="primary" onClick={() => toast.error('Unimplemented')}>
						Send
					</Button>
					<Button variant="secondary" onClick={() => toast.error('Unimplemented')}>
						Receive QR
					</Button>
				</div>
			</TopContent>
		</div>
	);
}
