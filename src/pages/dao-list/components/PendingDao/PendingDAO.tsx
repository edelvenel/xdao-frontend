import exampleLogo from 'assets/images/logo-example.png';
import { IPendingDao } from 'shared/types';
import { Badge } from 'shared/ui/Badge';
import css from './styles.module.scss';

interface IPendingDaoProps {
	dao: IPendingDao;
}

export function PendingDAO({ dao }: IPendingDaoProps) {
	return (
		<div className={css.pendingDao}>
			<div className={css.block}>
				<div className={css.logo} style={{ backgroundImage: `url(${exampleLogo})` }} />
				<div className={css.name}>{dao.name}</div>
				<Badge variant="blue" text="pending" />
			</div>
		</div>
	);
}
