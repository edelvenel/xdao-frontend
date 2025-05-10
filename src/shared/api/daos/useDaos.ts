import { Address, Dictionary, toNano } from '@ton/core';
import { useTonConnectUI } from '@tonconnect/ui-react';
import React, { useState } from 'react';
import { DAOBuilder } from 'shared/cell-builders';
import { JettonBuilder } from 'shared/cell-builders/common';
import { store } from 'shared/store';
import { DaoType, IDao } from 'shared/types';
import { useTonWallet } from 'shared/utils/useTonConnect';
import { getDaos, getFactoryAddress } from './methods';
import { ICreateDaoPayload } from './payloads';

export function useDaos() {
  // const [daos, setDaos] = React.useState<IDao[]>([]);
  const {daos} = store.useDaos();
  const [tonConnectUI] = useTonConnectUI();
  const { wallet, isConnected } = useTonWallet();
  const [currentOffset, setCurrentOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const { token } = store.useAuth();

  const fetchDaos = React.useCallback(async () => {
    const { daos, hasMore } = await getDaos(token ?? "", currentOffset);


  const {setDaos} = store.useDaos.getState();

    setDaos(daos);
    setCurrentOffset((prevOffset) => prevOffset + daos.length);
    setHasMore(hasMore);
  }, [currentOffset, token]);

  const createDao = async (payload: ICreateDaoPayload): Promise<void> => {
    if (!isConnected || !wallet) throw new Error('Connect TON-wallet first');

    console.log("token", token);
    const factoryAddress = await getFactoryAddress(token ?? "");

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
      successPercentage = Math.floor((payload.consensus / payload.walletAddresses.length) * 10000);
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

    const meta = JettonBuilder.buildOnchainMetadata({
      name: payload.daoTokenName,
      symbol: payload.daoTokenSymbol,
      description: payload.daoName,
      image: 'https://ton.org/download/ton_symbol.png',
      decimals: '9',
    });

    const body = DAOBuilder.buildCreateMaster(meta, successPercentage, holders)

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

  return { daos, fetchDaos, createDao, updateDao, hasMore };
}
