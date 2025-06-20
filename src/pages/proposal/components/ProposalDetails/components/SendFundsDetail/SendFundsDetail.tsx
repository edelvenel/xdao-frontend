import tonSymbol from 'assets/images/ton-symbol.png';
import { format } from 'date-fns';
import React from 'react';
import { useDaos } from 'shared/api/daos';
import { proposalNameMapper } from 'shared/constants';
import { IProposal, IToken } from 'shared/types';
import { Copy } from 'shared/ui/Copy';
import { Option } from 'shared/ui/RadioToken/components/Option';
import { OptionLoader } from 'shared/ui/RadioToken/components/OptionLoader';
import { getUserFriendlyAddress, shortenAddress } from 'shared/utils/formatters';
import css from '../../styles.module.scss';

interface ISendFundsDetailProps {
	proposal: IProposal;
}

export function SendFundsDetail({ proposal }: ISendFundsDetailProps) {
	const [token, setToken] = React.useState<IToken | null>(null);
	const { getDAOJettons, getTokenRates } = useDaos();

	const formatedCreatedAt = format(new Date(proposal.createdAt), 'LLL dd, yyyy | HH:mm');

	// data.body.message.body.name = 'General_JettonTransfer' - jetton, else - ton
	// if ton, body.message.amount = amount, else -> body.message.body.amount = amount
	// if jetton, find jetton name by body.message.destination

	React.useEffect(() => {
		const fetchJetton = async () => {
			const jettons = await getDAOJettons(proposal.dao.plugins[0].address);
			const jetton = jettons.find(
				(jetton) =>
					getUserFriendlyAddress(jetton.jettonAddress) ===
					getUserFriendlyAddress(proposal.data.body.message.destination)
			);
			if (jetton) {
				const rate = await getTokenRates([jetton.symbol], ['usd']);
				setToken({
					address: jetton.address,
					amount: proposal.data.body.message.body.amount / 10 ** jetton.decimals,
					decimals: jetton.decimals,
					name: jetton.name,
					imgUrl: jetton.imgUrl,
					rate: rate.find((rate) => rate.jettonSymbol.toUpperCase() === jetton.symbol.toUpperCase())?.rate ?? 0,
					symbol: jetton.symbol,
				});
			}
		};

		const fetchTon = async () => {
			const rate = await getTokenRates(['ton'], ['usd']);
			setToken({
				address: 'native',
				amount: proposal.data.body.message.amount / 10 ** 9,
				decimals: 9,
				name: 'TON',
				imgUrl: tonSymbol,
				rate: rate.find((rate) => rate.jettonSymbol.toUpperCase() === 'TON')?.rate ?? 0,
				symbol: 'ton',
			});
		};

		if (proposal.data?.body?.message?.body?.name === 'General_JettonTransfer') {
			fetchJetton();
		} else {
			fetchTon();
		}
	}, [
		getDAOJettons,
		getTokenRates,
		proposal.dao.plugins,
		proposal.data.body?.message?.amount,
		proposal.data.body?.message?.body?.amount,
		proposal.data.body?.message?.body?.name,
		proposal.data.body?.message?.destination,
	]);

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
					<div className={css.label}>From</div>
					<div className={css.value}>{proposal.dao.name}</div>
				</div>
			</div>
			<div className={css.block}>
				<div className={css.column}>
					<div className={css.label}>To</div>
					<div className={css.value}>
						{proposal.data?.body?.message?.destination
							? shortenAddress(proposal.data.body.message.destination)
							: 'NO DATA'}
					</div>
				</div>
				<Copy
					text={
						proposal.data?.body?.message?.destination
							? getUserFriendlyAddress(proposal.data.body.message.destination)
							: 'NO DATA'
					}
				/>
			</div>

			{token && <Option selected={false} onClick={() => {}} value={token} />}
			{!token && <OptionLoader />}

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
