import { Address, Dictionary, toNano } from '@ton/core';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { FilterEnum } from 'app/api/codegen';
import { compareAsc } from 'date-fns';
import React, { useState } from 'react';
import { DAOBuilder } from 'shared/cell-builders';
import { JettonBuilder } from 'shared/cell-builders/common';
import { PENDING_EXPIRATION_DURATION, TON_API_TOKEN } from 'shared/constants';
import { tonClient } from 'shared/smartcontracts/client';
import { DAOFactoryContract } from 'shared/smartcontracts/factory.wrapper';
import { store } from 'shared/store';
import { DaoType, IDao, IHashedData, IJetton, IPendingDao, IRate } from 'shared/types';
import { getDaoHash } from 'shared/utils/formatters';
import { useTonWallet } from 'shared/utils/useTonConnect';
import { getBalance, getDaos, getFactoryAddress, getJettons, getRates } from './methods';
import { ICreateDaoPayload } from './payloads';

export function useDaos() {
	const { daos } = store.useDaos();
	const [tonConnectUI] = useTonConnectUI();
	const { wallet, isConnected } = useTonWallet();
	const [currentOffset, setCurrentOffset] = useState(0);
	const [hasMore, setHasMore] = useState(false);
	const { token } = store.useAuth();

	const resetDaos = React.useCallback(async () => {
		const { setDaos, setOldDaos } = store.useDaos.getState();
		setDaos(null);
		setOldDaos(null);
		setCurrentOffset(0);
		setHasMore(false);
	}, []);

	const getAllPendingDaos = (): Record<string, IHashedData<IPendingDao>> => {
		const jsonString = localStorage.getItem('pending_daos');

		if (jsonString === null) {
			return {};
		}

		return JSON.parse(jsonString);
	};

	const fetchDaos = React.useCallback(
		async (searchText?: string, filter?: FilterEnum) => {
			const { daos, hasMore, total } = await getDaos(token ?? '', currentOffset, filter, searchText);

			const { setDaos, oldDaos, setOldDaos, setPendingDaos } = store.useDaos.getState();

			if (total > 100) {
				const newDaos = [...(oldDaos ?? []), ...daos];
				setDaos([...newDaos]);
				setOldDaos([...newDaos]);
				if (hasMore) {
					setCurrentOffset((prevOffset) => prevOffset + daos.length);
				}
			} else {
				setDaos([...daos]);
				setOldDaos([...daos]);
			}
			setHasMore(hasMore);

			const hashedDaos = getAllPendingDaos();

			if (daos !== null && hashedDaos !== null) {
				for (const dao of daos) {
					const hash = await getDaoHash(dao.name, dao.owner_address);
					delete hashedDaos[hash];
				}

				const filteredHashedDaos = Object.values(hashedDaos).filter(
					(dao) => compareAsc(new Date(), new Date(dao.expiresAt)) === 1
				);

				filteredHashedDaos.forEach((filter) => {
					delete hashedDaos[filter.hash];
				});

				setPendingDaos(hashedDaos);
				if (Object.keys(hashedDaos).length === 0) {
					localStorage.removeItem('pending_daos');
				} else {
					const jsonString = JSON.stringify(hashedDaos);
					localStorage.setItem('pending_daos', jsonString);
				}
			}
		},
		[currentOffset, token]
	);

	const createDao = async (payload: ICreateDaoPayload): Promise<void> => {
		if (!isConnected || !wallet) throw new Error('Connect TON-wallet first');

		const factoryAddress = await getFactoryAddress(token ?? '');
		const factoryContract = tonClient.open(DAOFactoryContract.createFromAddress(Address.parse(factoryAddress)));
		const serviceFee = await factoryContract.getServiceFee();
		const holders = Dictionary.empty(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4));

		let successPercentage = 0;
		if (payload.type === DaoType.Equal) {
			const share = toNano('1');
			payload.walletAddresses.forEach((addr) => holders.set(Address.parse(addr), share));
			successPercentage = Math.floor((payload.consensus / payload.walletAddresses.length) * 10000);
		} else {
			if (payload.distributionRules.some((rule) => !rule.tokens)) {
				throw new Error('Please fill all distribution rules');
			}
			payload.distributionRules.forEach((rule) => holders.set(Address.parse(rule.walletAddress), toNano(rule.tokens!)));
			successPercentage = payload.consensusPercent * 100;
		}

		const meta = JettonBuilder.buildOnchainMetadata({
			name: payload.daoName,
			symbol: payload.daoTokenSymbol,
			description: payload.daoName,
			image: 'https://ton.org/download/ton_symbol.png',
			decimals: '9',
		});

		const body = DAOBuilder.buildCreateMaster(meta, successPercentage, holders);

		await tonConnectUI.sendTransaction({
			validUntil: Math.floor(Date.now() / 1000) + 120,
			messages: [
				{
					address: factoryAddress.toString(),
					amount: (serviceFee + toNano('1')) // TON for gas
						.toString(),
					payload: body.toBoc().toString('base64'),
				},
			],
		});

		const daoObject: IPendingDao = {
			name: payload.daoName,
			ownerRawAddress: Address.isFriendly(wallet.account.address)
				? Address.parseRaw(wallet.account.address).toString()
				: wallet.account.address,
		};

		const hash = await getDaoHash(daoObject.name, daoObject.ownerRawAddress);

		const hashedDaos = getAllPendingDaos();

		hashedDaos[hash] = {
			hash: hash,
			expiresAt: Date.now() + PENDING_EXPIRATION_DURATION,
			data: daoObject,
		};
		localStorage.setItem('pending_daos', JSON.stringify(hashedDaos));
	};

	const updateDao = React.useCallback(async (id: string, dao: IDao): Promise<void> => {
		// update dao or throw error
		try {
			console.log('Dao successfully updated', id, dao); // TODO: replace with real implementation
		} catch (error) {
			console.error('Unable to update dao', error);
			throw error;
		}
	}, []);

	const getDAOJettons = React.useCallback(async (walletAddress: string): Promise<IJetton[]> => {
		try {
			const jettons = await getJettons(TON_API_TOKEN, ['ton', 'usd'], walletAddress);
			return jettons;
		} catch (error) {
			console.error('Unable to get jettons', error);
			throw error;
		}
	}, []);

	const getTONBalance = React.useCallback(async (walletAddress: string): Promise<number> => {
		try {
			const balance = await getBalance(TON_API_TOKEN, walletAddress);
			return balance;
		} catch (error) {
			console.error('Unable to get account', error);
			throw error;
		}
	}, []);

	const getTokenRates = React.useCallback(async (tokens: string[], currencies: string[]): Promise<IRate[]> => {
		try {
			const rates = await getRates(TON_API_TOKEN, tokens, currencies);
			return rates;
		} catch (error) {
			console.error('Unable to get rates', error);
			throw error;
		}
	}, []);

	return { daos, resetDaos, fetchDaos, createDao, updateDao, getDAOJettons, getTONBalance, getTokenRates, hasMore };
}
