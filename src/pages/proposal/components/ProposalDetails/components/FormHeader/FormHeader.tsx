import { formatDistance } from 'date-fns';
import { ProposalStatus } from 'shared/types';
import { Badge } from 'shared/ui/Badge';
import { getStatusVariant } from 'shared/utils/getStatusVariant';
import css from '../../styles.module.scss';

interface IFormHeaderProps {
	name: string;
	description: string;
	status: ProposalStatus;
	consensus: number;
	endDate: Date;
}

export function FormHeader({ name, description, status, consensus, endDate }: IFormHeaderProps) {
	const formatDate = formatDistance(new Date(), endDate, { includeSeconds: false });

	return (
		<div className={css.card}>
			<div className={css.block}>
				<div className={css.column}>
					<div className={css.label}>Proposal name</div>
					<div className={css.value}>{name}</div>
				</div>
				<Badge text={status} variant={getStatusVariant(status)} />
			</div>
			<div className={css.block}>
				<div className={css.column}>
					<div className={css.label}>Description</div>
					<div className={css.description}>{description}</div>
				</div>
			</div>
			<div className={css.block}>
				<div className={css.row}>
					<div className={css.label}>Consensus:</div>
					<div className={css.value}>{`${consensus}%`}</div>
				</div>

				<div className={css.row}>
					<div className={css.label}>Ends:</div>
					<div className={css.value}>{formatDate}</div>
				</div>
			</div>
		</div>
	);
}
