import { IDao } from 'shared/types';
import css from './styles.module.scss';

interface ICrowdfundingTabProps {
	dao?: IDao;
}

export function CrowdfundingTab({ dao }: ICrowdfundingTabProps) {
	//TODO: get data with dao
	if (!dao) {
		return null;
	}

	return (
		<div className={css.tab}>
			<div className={css.placeholder}>Crowdfunding is unimplemented</div>
		</div>
	);
}
