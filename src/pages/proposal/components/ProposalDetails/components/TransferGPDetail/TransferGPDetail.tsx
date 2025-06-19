import { format } from 'date-fns';
import { proposalNameMapper } from 'shared/constants';
import { IProposal } from 'shared/types';
import { Copy } from 'shared/ui/Copy';
import { getUserFriendlyAddress, shortenAddress } from 'shared/utils/formatters';
import css from '../../styles.module.scss';

interface ITransferGPDetailProps {
	proposal: IProposal;
}

export function TransferGPDetail({ proposal }: ITransferGPDetailProps) {
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
					<div className={css.label}>Transfer GP tokens</div>
					<div className={css.value}>
						{proposal.data?.transfer_data?.amount ? Number(proposal.data.transfer_data.amount) / 10 ** 9 : 'NO DATA'}
					</div>
				</div>
			</div>
			<div className={css.block}>
				<div className={css.column}>
					<div className={css.label}>Transfer from</div>
					<div className={css.value}>{shortenAddress(proposal.data.from_jetton_wallet_owner)}</div>
				</div>
				<Copy text={getUserFriendlyAddress(proposal.data.from_jetton_wallet_owner)} />
			</div>
			<div className={css.block}>
				<div className={css.column}>
					<div className={css.label}>Transfer to</div>
					<div className={css.value}>
						{proposal.data?.transfer_data?.destination
							? shortenAddress(proposal.data.transfer_data.destination)
							: 'NO DATA'}
					</div>
				</div>
				<Copy
					text={
						proposal.data?.transfer_data?.destination
							? getUserFriendlyAddress(proposal.data.transfer_data.destination)
							: 'NO DATA'
					}
				/>
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
