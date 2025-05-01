import { Cell, toNano } from '@ton/core';
import { Address } from '@ton/core';
import { client } from 'shared/smartcontracts/sender';
import {
  ICreateProposalPayload,
  proposalsBuilders,
} from 'shared/api/proposals/payloads';
import { clientOpen } from 'shared/smartcontracts/sender';
import { TonConnectSender } from 'shared/smartcontracts/sender';
import { ProposalType } from 'shared/types';
import { DAOJettonWallet } from 'shared/smartcontracts/DAOJettonWallet';
import { Master } from 'shared/smartcontracts/masterWrapper';
import { useTonAddress } from '@tonconnect/ui-react';
import { useTonConnectUI } from '@tonconnect/ui-react';

export const useCreateProposalByType = () => {
  const [tonConnect] = useTonConnectUI();
  const sender = new TonConnectSender(tonConnect);
  const address = useTonAddress();
  const DAOAddress =
    '0:923674dbc308f7dfd8b0ae0cbd05bc4993af3ab3ad05edcbf3ce39114854c21f';

  const createProposalByType = async (payload: ICreateProposalPayload) => {

    const makeElectionsMsg = (body: Cell) =>
      Master.createElectionsMessage({
        start_time: Date.now(),
        expiration_time:
          Date.now() + payload.votingDuration * 24 * 60 * 60 * 1000,
        action_message_body: body,
      });

    switch (payload.type) {
      case ProposalType.AddGP: {
        const walletAddress = await clientOpen.getWalletAddress(
          Address.parse(address)
        );

        const jettonWallet = client.open(
          DAOJettonWallet.createFromAddress(walletAddress)
        );

        const body = proposalsBuilders(Address.parseRaw(DAOAddress))[
          payload.type
        ](payload);

        await jettonWallet.sendBalanceNotification(
          sender,
          toNano('0.1'),
          Address.parse(DAOAddress),
          makeElectionsMsg(body),
          0n
        );
        break;
      }

      case ProposalType.RemoveGP: {
        const walletAddress = await clientOpen.getWalletAddress(
          Address.parse(address)
        );

        const jettonWallet = client.open(
          DAOJettonWallet.createFromAddress(walletAddress)
        );

        const body = proposalsBuilders(Address.parseRaw(DAOAddress))[
          payload.type
        ](payload);

        await jettonWallet.sendBalanceNotification(
          sender,
          toNano('0.1'),
          Address.parse(DAOAddress),
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
