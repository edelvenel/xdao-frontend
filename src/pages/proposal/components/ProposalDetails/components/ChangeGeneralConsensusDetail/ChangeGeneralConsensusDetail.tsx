import { format } from 'date-fns';
import { proposalNameMapper } from 'shared/constants';
import { IProposal } from 'shared/types';
import { Copy } from 'shared/ui/Copy';
import { formatNumber, getUserFriendlyAddress, shortenAddress } from 'shared/utils/formatters';
import css from '../../styles.module.scss';

interface IChangeGeneralConsensusDetailProps {
	proposal: IProposal;
}

export function ChangeGeneralConsensusDetail({ proposal }: IChangeGeneralConsensusDetailProps) {
	const formatedCreatedAt = format(new Date(proposal.createdAt), 'LLL dd, yyyy | HH:mm');
	const userFriendlyAddress = getUserFriendlyAddress(proposal.createdBy);

	return (
		<div className={css.card}>
			<div className={css.block}>
				<div className={css.column}>
					<div className={css.label}>Proposal type</div>
					<div className={css.value}>{proposalNameMapper[proposal.type]}</div>
				</div>
			</div>

			<div className={css.block}>
				<div className={css.column}>
					<div className={css.label}>Current consensus</div>
					<div className={css.value}>{formatNumber(proposal.dao.consensus)}%</div>
				</div>
			</div>

			<div className={css.block}>
				<div className={css.column}>
					<div className={css.label}>New consensus</div>
					<div className={css.value}>{formatNumber(proposal.data.success_percentage / 100)}%</div>
				</div>
			</div>
			<div className={css.block}>
				<div className={css.column}>
					<div className={css.label}>Created by</div>
					<div className={css.value}>{shortenAddress(userFriendlyAddress)}</div>
				</div>
				<Copy text={userFriendlyAddress} />
			</div>
			<div className={css.block}>
				<div className={css.column}>
					<div className={css.label}>Created at</div>
					<div className={css.value}>{formatedCreatedAt}</div>
				</div>
			</div>
		</div>
	);
}
