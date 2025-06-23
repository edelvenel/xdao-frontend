import { IDao } from 'shared/types';
import css from './styles.module.scss';

interface ICrowdfundingTabProps {
	dao?: IDao;
}

export function CrowdfundingTab({ dao }: ICrowdfundingTabProps) {
	return (
		<div className={css.tab}>
			{dao && <></>}
			<div className={css.placeholder}>Coming soon</div>
		</div>
	);
}
