import { TopContent } from 'app/navigation/components/top-content';
import { routes } from 'app/router/routes';
import React from 'react';
import toast from 'react-hot-toast';
import { generatePath, Link } from 'react-router';
import { useDaos } from 'shared/api/daos/useDaos';
import { Icon } from 'shared/icons';
import { IDao, IJetton } from 'shared/types';
import { Button } from 'shared/ui/Button';
import { IconButton } from 'shared/ui/IconButton';
import css from './styles.module.scss';

interface IDAOBalanceProps {
	dao: IDao;
	onInfo: () => void;
}

export function DAOBalanceTab({ dao, onInfo }: IDAOBalanceProps) {
	const [jettons, setJettons] = React.useState<IJetton[]>([]);
	const { getDAOJettons } = useDaos();

	React.useEffect(() => {
		const fetchJettons = async () => {
			const jettons = await getDAOJettons(dao.plugins[0].address);
			setJettons(jettons);
		};

		fetchJettons();
	}, [dao.plugins, getDAOJettons]);

	//TODO: get data with dao
	if (!dao) {
		return null;
	}

	return (
		<div className={css.tab}>
			<div className={css.block}>
				<div className={css.title}>Main account</div>
				<div className={css.amount}>
					<div className={css.dollar}>$</div>
					<span>500 000</span>
				</div>
			</div>
			<div className={css.block}>
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
			</div>
			<div className={css.card}>
				{jettons.map((jetton) => (
					<div className={css.wallet}>
						<div className={css.info}>
							<div className={css.logo} style={{ backgroundImage: `url(${jetton.imgUrl})` }} />
							<div className={css.currency}>{jetton.name}</div>
							<div className={css.amount}>{jetton.amount}</div>
						</div>
						<div className={css.link} onClick={() => toast.error('Unimplemented')}>
							<Icon.Common.LittleLink />
						</div>
					</div>
				))}

				{/* <div className={css.wallet}>
					<div className={css.info}>
						<div className={css.logo} />
						<div className={css.currency}>TON</div>
						<div className={css.amount}>20,000.00</div>
					</div>
					<div className={css.link} onClick={() => toast.error('Unimplemented')}>
						<Icon.Common.LittleLink />
					</div>
				</div> */}
				<div className={css.wallet}>
					<div className={css.info}>
						<div className={css.currency}>NFTs</div>
						<div className={css.amount}>5</div>
					</div>
					<Link to={generatePath(routes.nft, { id: '1' })} className={css.link}>
						<Icon.Common.Eye />
					</Link>
				</div>
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
