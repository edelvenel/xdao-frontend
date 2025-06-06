import { format } from 'date-fns';
import { proposalNameMapper } from 'shared/constants';
import { IProposal } from 'shared/types';
import { Copy } from 'shared/ui/Copy';
import { getUserFriendlyAddress, shortenAddress } from 'shared/utils/formatters';
import css from '../../styles.module.scss';

interface IChangeGPTransferStatusDetailProps {
	proposal: IProposal;
}

export function ChangeGPTransferStatusDetail({ proposal }: IChangeGPTransferStatusDetailProps) {
	const formatedCreatedAt = format(new Date(proposal.createdAt), 'LLL dd, yyyy | HH:mm');

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
					<div className={css.label}>Current status</div>
					<div className={css.value}>NO DATA</div>
				</div>
			</div>

			<div className={css.block}>
				<div className={css.column}>
					<div className={css.label}>New status</div>
					<div className={css.value}>NO DATA</div>
				</div>
			</div>
			<div className={css.block}>
				<div className={css.column}>
					<div className={css.label}>Created by</div>
					<div className={css.value}>{shortenAddress(getUserFriendlyAddress(proposal.createdBy))}</div>
				</div>
				<Copy text={proposal.createdBy} />
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
