import { routes } from 'app/router/routes';
import { generatePath, Link } from 'react-router';
import { IDao } from 'shared/types';
import css from './styles.module.scss';

interface IDaoCardProps {
	dao: IDao;
}

export function DaoCard({ dao }: IDaoCardProps) {
	return (
		<Link to={generatePath(routes.dao, { id: dao.address, tab: 'overview' })} className={css.daoCard}>
			<div className={css.logo} style={{ backgroundImage: `url(${dao.logo})` }} />
			<div className={css.name}>{dao.name}</div>
		</Link>
	);
}
