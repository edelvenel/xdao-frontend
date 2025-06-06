import cn from 'classnames';
import { IDao } from 'shared/types';
import { Button } from 'shared/ui/Button';
import css from './styles.module.scss';

interface IDAOProps {
	dao: IDao;
	onOpen: () => void;
}

export function DAO({ dao, onOpen }: IDAOProps) {
	return (
		<div className={css.dao}>
			<div className={cn(css.block, css.header)}>
				<div className={css.logo} style={{ backgroundImage: `url(${dao.logo})` }} />
				<div className={css.name}>{dao.name}</div>
			</div>
			<div className={cn(css.block, css.field)}>
				<div className={css.name}>Active Proposals</div>
				<div className={css.value}>{dao.activeProposals}</div>
			</div>
			<div className={cn(css.block, css.field)}>
				<div className={css.name}>LP Tokens</div>
				<div className={css.value}>{dao.totalSupply}</div>
			</div>
			<Button onClick={onOpen}>Open DAO</Button>
		</div>
	);
}
