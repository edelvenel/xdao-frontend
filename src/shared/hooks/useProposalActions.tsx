import { Address, Cell, toNano } from '@ton/core';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { ICreateProposalPayload, proposalsBuilders } from 'shared/api/proposals/payloads';
import { ElectionsBuilder } from 'shared/cell-builders/elections-builder';
import { tonClient } from 'shared/smartcontracts/client';
import { DAOJettonWallet } from 'shared/smartcontracts/DAOJettonWallet';
import { ElectionsMaster } from 'shared/smartcontracts/ElectionsMaster';
import { Master } from 'shared/smartcontracts/Master';
import { TonConnectSender } from 'shared/smartcontracts/sender';
import { IHolder, IProposal } from 'shared/types';

export const useProposalActions = () => {
	const [tonConnect] = useTonConnectUI();
	const sender = new TonConnectSender(tonConnect);

	const createProposalByType = async (payload: ICreateProposalPayload, daoAddress: string, holder: IHolder) => {
		const makeElectionsMsg = (body: Cell, name: string, description: string) =>
			Master.createElectionsMessage({
				start_time: Date.now() / 1000,
				expiration_time: Date.now() / 1000 + payload.votingDuration * 24 * 60 * 60,
				action_message_body: body,
				name: name,
				description: description,
			});

		const jettonWalletAddress = Address.parse(holder.jetton_wallet_address);

		const jettonWallet = tonClient.open(DAOJettonWallet.createFromAddress(jettonWalletAddress));
		const body: Cell = proposalsBuilders(payload);

		await jettonWallet.sendBalanceNotification(
			sender,
			toNano('0.25'),
			Address.parse(daoAddress),
			makeElectionsMsg(body, payload.name, payload.description),
			0n
		);
	};

	const makeVote = async (proposal: IProposal, holder: IHolder) => {
		const jettonWalletAddress = Address.parse(holder.jetton_wallet_address);
		const proposalAddress = Address.parse(proposal.address);
		const jettonWallet = tonClient.open(DAOJettonWallet.createFromAddress(jettonWalletAddress));
		const electionsMaster = tonClient.open(ElectionsMaster.createFromAddress(proposalAddress));
		const serviceFee: bigint = await electionsMaster.getEstimateServiceFee(BigInt(holder.balance));

		await jettonWallet.sendBalanceNotification(
			sender,
			toNano('0.1') + serviceFee,
			proposalAddress,
			ElectionsBuilder.buildVote(),
			0n
		);
	};

	return { createProposalByType, makeVote };
};
