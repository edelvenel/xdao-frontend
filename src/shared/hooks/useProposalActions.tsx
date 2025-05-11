import { Cell, toNano } from '@ton/core';
import { Address } from '@ton/core';
import { tonClient } from 'shared/smartcontracts/client';
import { ICreateProposalPayload, proposalsBuilders } from 'shared/api/proposals/payloads';
import { TonConnectSender } from 'shared/smartcontracts/sender';
import { IHolder, IProposal } from 'shared/types';
import { DAOJettonWallet } from 'shared/smartcontracts/DAOJettonWallet';
import { Master } from 'shared/smartcontracts/masterWrapper';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { ElectionsBuilder } from 'shared/cell-builders/elections-builder';

export const useProposalActions = () => {
	const [tonConnect] = useTonConnectUI();
	const sender = new TonConnectSender(tonConnect);

	const createProposalByType = async (
		payload: ICreateProposalPayload,
		daoAddress: string,
		holder: IHolder
	) => {
		const makeElectionsMsg = (body: Cell, name: string, description: string) =>
			Master.createElectionsMessage({
				start_time: Date.now() / 1000,
				expiration_time: Date.now() / 1000 + payload.votingDuration * 24 * 60 * 60,
				action_message_body: body,
				name: name,
				description: description,
			});

		const jettonWalletAddress = Address.parse(holder.jetton_wallet_address)

		const jettonWallet = tonClient.open(DAOJettonWallet.createFromAddress(jettonWalletAddress));
		const body = proposalsBuilders()[payload.type](payload);

		await jettonWallet.sendBalanceNotification(
			sender,
			toNano('0.1'),
			Address.parse(daoAddress),
			makeElectionsMsg(body, payload.name, payload.description),
			0n
		);
	};

	const makeVote = async (proposal: IProposal, holder: IHolder) => {
		const jettonWalletAddress = Address.parse(holder.jetton_wallet_address)
		const jettonWallet = tonClient.open(DAOJettonWallet.createFromAddress(jettonWalletAddress));
		
		await jettonWallet.sendBalanceNotification(
			sender,
			toNano('0.1'),
			Address.parse(proposal.id),
			ElectionsBuilder.buildVote(),
			0n
		  );
	}

	return { createProposalByType, makeVote };
};
