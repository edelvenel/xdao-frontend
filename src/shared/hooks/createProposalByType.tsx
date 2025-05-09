import { Cell, toNano } from '@ton/core';
import { Address } from '@ton/core';
import { client } from 'shared/smartcontracts/sender';
import { ICreateProposalPayload, proposalsBuilders } from 'shared/api/proposals/payloads';
import { TonConnectSender } from 'shared/smartcontracts/sender';
import { IHolder, ProposalType } from 'shared/types';
import { DAOJettonWallet } from 'shared/smartcontracts/DAOJettonWallet';
import { Master } from 'shared/smartcontracts/masterWrapper';
import { useTonConnectUI } from '@tonconnect/ui-react';

export const useCreateProposalByType = () => {
	const [tonConnect] = useTonConnectUI();
	const sender = new TonConnectSender(tonConnect);

	const createProposalByType = async (
		payload: ICreateProposalPayload,
		daoAddress: string,
		holder: IHolder
	) => {
		const makeElectionsMsg = (body: Cell) =>
			Master.createElectionsMessage({
				start_time: Date.now(),
				expiration_time: Date.now() + payload.votingDuration * 24 * 60 * 60 * 1000,
				action_message_body: body,
			});

		const jettonWalletAddress = Address.parse(holder.jetton_wallet_address)
		console.log(jettonWalletAddress.toRawString())

		const jettonWallet = client.open(DAOJettonWallet.createFromAddress(jettonWalletAddress));

		switch (payload.type) {
			case ProposalType.AddGP: {
				const body = proposalsBuilders(Address.parseRaw(daoAddress))[payload.type](payload);

				await jettonWallet.sendBalanceNotification(
					sender,
					toNano('0.1'),
					Address.parse(daoAddress),
					makeElectionsMsg(body),
					0n
				);
				break;
			}

			case ProposalType.RemoveGP: {
				const body = proposalsBuilders(Address.parseRaw(daoAddress))[payload.type](payload);

				await jettonWallet.sendBalanceNotification(
					sender,
					toNano('0.1'),
					Address.parse(daoAddress),
					makeElectionsMsg(body),
					0n
				);
				break;
			}

			case ProposalType.ChangeDAOName: {
				break;
			}

			case ProposalType.ChangeGPTransferStatus: {
				break;
			}

			case ProposalType.ChangeGeneralConsensus: {
				break;
			}

			case ProposalType.CustomProposal: {
				break;
			}

			case ProposalType.SendDAOFunds: {
				break;
			}

			case ProposalType.TransferGPTokens: {
				break;
			}

			default:
				break;
		}
	};

	return { createProposalByType };
};
