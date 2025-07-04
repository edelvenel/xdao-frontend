import cn from 'classnames';
import { IDao } from 'shared/types';
import { Button } from 'shared/ui/Button';
import css from './styles.module.scss';

interface IDAOProps {
	dao: IDao;
	proposalsAmount: number;
	onOpen: () => void;
}

export function DAO({ dao, proposalsAmount, onOpen }: IDAOProps) {
	return (
		<div className={css.dao}>
			<div className={cn(css.block, css.header)}>
				<div className={css.logo} style={{ backgroundImage: `url(${dao.logo})` }} />
				<div className={css.name}>{dao.name}</div>
			</div>
			<div className={cn(css.block, css.field)}>
				<div className={css.name}>Active Proposals</div>
				<div className={css.value}>{proposalsAmount}</div>
			</div>
			<Button onClick={onOpen}>Open DAO</Button>
		</div>
	);
}
