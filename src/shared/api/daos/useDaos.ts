import { DAOS_MOCK } from 'app/mocks/constants';
import React from 'react';
import { DaoType, IDao } from 'shared/types';
import { ICreateDaoPayload } from './payloads';
import { useTonWallet } from 'shared/utils/useTonConnect';
import { beginCell, Dictionary, toNano, Address } from '@ton/core';
import { buildJettonOnchainMetadata } from 'shared/utils/buildJetton';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { OP_CREATE_MASTER } from './constants';
import { getFactoryAddress } from './api';

export function useDaos() {
  const [daos, setDaos] = React.useState<IDao[]>([]);
  const [tonConnectUI] = useTonConnectUI();
  const { wallet, isConnected } = useTonWallet();

  const mapper = React.useCallback((data: unknown[]): IDao[] => {
    //TODO: write a mapper for specific data (if needed)
    const result = data as IDao[];

    return result;
  }, []);

  const fetchDaos = React.useCallback(async () => {
    //get source data
    const sourceData = DAOS_MOCK; // TODO: replace with real implementation

    const formatedData: IDao[] = mapper(sourceData);
    setDaos(formatedData);
  }, [mapper]);

  const createDao = async (payload: ICreateDaoPayload): Promise<void> => {
    if (!isConnected || !wallet) throw new Error('Connect TON-wallet first');

    const factoryAddress = await getFactoryAddress();

    const holders = Dictionary.empty(
      Dictionary.Keys.Address(),
      Dictionary.Values.BigVarUint(4)
    );

    let successPercentage = 0;
    if (payload.type === DaoType.Equal) {
      const share = toNano('1');
      payload.walletAddresses.forEach((addr) =>
        holders.set(Address.parse(addr), share),
      );
      successPercentage =
        (payload.consensus / payload.walletAddresses.length) * 1000;
    } else {
      successPercentage = payload.consensusPercent * 100;
    }
  
    try {
      if (payload.type === 'equal' && payload.walletAddresses) {
        for (const address of payload.walletAddresses) {
          try {
            const parsedAddress = Address.parse(address);
            holders.set(parsedAddress, 1n);
          } catch (error) {
            console.error('Error parsing address:', address, error);
            throw error;
          }
        }
      }
    } catch (error) {
      console.error('Error in holders setup:', error);
      throw error;
    }

    const meta = buildJettonOnchainMetadata({
      name: payload.daoTokenName,
      symbol: payload.daoTokenSymbol,
      description: payload.daoName,
      image: 'https://ton.org/download/ton_symbol.png',
      decimals: '9',
    });

    const body = beginCell()
      .storeUint(OP_CREATE_MASTER, 32)
      .storeUint(0, 64)
      .storeRef(meta)
      .storeUint(successPercentage, 14)
      .storeDict(holders)
      .endCell();

    await tonConnectUI.sendTransaction({
      validUntil: Math.floor(Date.now() / 1000) + 120,
      messages: [
        {
          address: factoryAddress.toString(),
          amount: toNano('1').toString(),
          payload: body.toBoc().toString('base64'),
        },
      ],
    });
  };

  const updateDao = React.useCallback(
    async (id: string, dao: IDao): Promise<void> => {
      // update dao or throw error
      try {
        console.log('Dao successfully updated', id, dao); // TODO: replace with real implementation
      } catch (error) {
        console.error('Unable to update dao', error);
        throw error;
      }
    },
    []
  );

  return { daos, fetchDaos, createDao, updateDao };
}
