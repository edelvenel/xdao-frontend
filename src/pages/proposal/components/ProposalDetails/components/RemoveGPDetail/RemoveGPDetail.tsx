import { format } from 'date-fns';
import React from 'react';
import { proposalNameMapper } from 'shared/constants';
import { store } from 'shared/store';
import { IProposal } from 'shared/types';
import { Copy } from 'shared/ui/Copy';
import { formatNumber, getUserFriendlyAddress, shortenAddress } from 'shared/utils/formatters';
import css from '../../styles.module.scss';

interface IRemoveGPDetailProps {
	proposal: IProposal;
}

export function RemoveGPDetail({ proposal }: IRemoveGPDetailProps) {
	const { holders } = store.useFormType();
	const formatedCreatedAt = format(new Date(proposal.createdAt), 'LLL dd, yyyy | HH:mm');

	const getOwnerAddressByJettonAddres = React.useCallback(
		(jettonAddress: string) => {
			const holder = holders?.find(
				(holder) => getUserFriendlyAddress(holder.jetton_wallet_address) === getUserFriendlyAddress(jettonAddress)
			);
			if (holder) {
				return getUserFriendlyAddress(holder.owner_address);
			}
			return '';
		},
		[holders]
	);

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
					<div className={css.label}>Remove GP tokens</div>
					<div className={css.value}>{formatNumber(proposal.data?.amount / 10 ** 9, 6)}</div>
				</div>
			</div>
			<div className={css.block}>
				<div className={css.column}>
					<div className={css.label}>GP Address</div>
					<div className={css.value}>
						{proposal.data?.address
							? shortenAddress(getOwnerAddressByJettonAddres(proposal.data?.address) ?? '')
							: 'NO DATA'}
					</div>
				</div>
				<Copy text={proposal.data?.address ? getOwnerAddressByJettonAddres(proposal.data?.address) : 'NO DATA'} />
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
