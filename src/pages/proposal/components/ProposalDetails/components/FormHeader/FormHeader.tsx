import { compareAsc, formatDistance } from 'date-fns';
import React from 'react';
import { IProposal, ProposalStatus } from 'shared/types';
import { Badge } from 'shared/ui/Badge';
import { formatNumber } from 'shared/utils/formatters';
import { getStatusVariant } from 'shared/utils/getStatusVariant';
import css from '../../styles.module.scss';

interface IFormHeaderProps {
	proposal: IProposal;
	status: ProposalStatus;
}

export function FormHeader({ proposal, status }: IFormHeaderProps) {
	const formatDate = React.useMemo(
		() =>
			compareAsc(new Date(), proposal.endDate) === -1
				? formatDistance(new Date(), proposal.endDate, { includeSeconds: false })
				: 'expired',
		[proposal.endDate]
	);
	return (
		<div className={css.card}>
			<div className={css.block}>
				<div className={css.column}>
					<div className={css.label}>Proposal name</div>
					<div className={css.value}>{proposal.name}</div>
				</div>
				<Badge text={status} variant={getStatusVariant(status)} />
			</div>
			<div className={css.block}>
				<div className={css.column}>
					<div className={css.label}>Description</div>
					<div className={css.description}>{proposal.description}</div>
				</div>
			</div>
			<div className={css.block}>
				<div className={css.row}>
					<div className={css.label}>Consensus:</div>
					<div className={css.value}>{`${formatNumber(proposal.dao.consensus)}%`}</div>
				</div>

				<div className={css.row}>
					<div className={css.label}>Ends:</div>
					<div className={css.value}>{formatDate}</div>
				</div>
			</div>
		</div>
	);
}
