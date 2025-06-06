import { format } from 'date-fns';
import { proposalNameMapper } from 'shared/constants';
import { IProposal } from 'shared/types';
import { Copy } from 'shared/ui/Copy';
import { getUserFriendlyAddress, shortenAddress } from 'shared/utils/formatters';
import css from '../../styles.module.scss';

interface IAddGPDetailProps {
	proposal: IProposal;
}

export function AddGPDetail({ proposal }: IAddGPDetailProps) {
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
					<div className={css.label}>Add GP tokens</div>
					<div className={css.value}>{proposal.data.receivers[0].amount / 10 ** 9 || 'Empty'}</div>
				</div>
			</div>
			<div className={css.block}>
				<div className={css.column}>
					<div className={css.label}>New GP Address</div>
					<div className={css.value}>
						{proposal.data.receivers[0].address ? shortenAddress(proposal.data.receivers[0].address) : 'Empty'}
					</div>
				</div>
				{proposal.data.receivers[0].address && (
					<Copy text={getUserFriendlyAddress(proposal.data.receivers[0].address)} />
				)}
			</div>
			<div className={css.block}>
				<div className={css.column}>
					<div className={css.label}>Created by</div>
					<div className={css.value}>{shortenAddress(proposal.createdBy)}</div>
				</div>
				<Copy text={getUserFriendlyAddress(proposal.createdBy)} />
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
