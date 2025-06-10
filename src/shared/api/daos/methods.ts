import { api, tonApi } from 'app/api';
import { Dao, FilterEnum } from 'app/api/codegen';
import { BalancesResponse, HoldersResponse, TokensRate } from 'app/api/types';
import logoExample from 'assets/images/logo-example.png';
import { DaoStatus, IDao, IJetton, IRate } from 'shared/types';

export const getFactoryAddress = async (token: string) => {
	try {
		const response = await api.v1.getFactoryAddress({
			format: 'json',
			headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
		});

		return response.address;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const daoMapper = (dao: Dao): IDao => {
	return {
		name: dao.jetton_metadata.metadata.name,
		logo:
			dao.jetton_metadata.metadata['image'] && dao.jetton_metadata.metadata['image'] !== ''
				? dao.jetton_metadata.metadata['image']
				: logoExample,
		jetton_address: dao.jetton_address,
		address: dao.address,
		totalSupply: Number(dao.total_supply) / 10 ** 9,
		social: [], //TODO: NO DATA
		email: dao.jetton_metadata['email'],
		consensus: dao.success_percentage / 100,
		distributionRules: [],
		slots: { total: 1, reserved: 0 },
		status: DaoStatus.Transferable, // TODO: NO DATA
		description: dao.jetton_metadata.metadata.description ?? '',
		plugins: dao.plugins,
		owner_address: dao.owner_address,
	};
};

export const jettonMapper = (balances: BalancesResponse): IJetton[] => {
	const mappedJettons: IJetton[] = balances.balances.map((balance) => {
		return {
			address: balance.jetton.address,
			name: balance.jetton.name,
			imgUrl: balance.jetton.image,
			url: '', //TODO: replace with real url,
			amount: Number(balance.balance) / 10 ** balance.jetton.decimals,
			rate: balance.price.prices.USD,
			decimals: balance.jetton.decimals,
		};
	});

	return mappedJettons;
};

export const getDaos = async (
	token: string,
	offset: number,
	filter?: FilterEnum,
	search?: string
): Promise<{ daos: IDao[]; hasMore: boolean; total: number }> => {
	try {
		const response = await api.v1.getAllDaos(
			{ limit: 100, offset: offset, filter, search },
			{ format: 'json', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
		);

		return {
			daos: response.items.map(daoMapper),
			hasMore: response.total > offset + response.items.length,
			total: response.total,
		};
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getDao = async (token: string, id: string): Promise<IDao> => {
	try {
		const response = await api.v1.getDaoInfo(id, {
			format: 'json',
			headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
		});

		return daoMapper(response);
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getJettons = async (token: string, tokens: string[], accountId: string): Promise<IJetton[]> => {
	try {
		const response = await tonApi.v2.getAccountJettonsBalances(
			{ accountId, tokens },
			{
				format: 'json',
				headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
			}
		);

		return jettonMapper(response);
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getJettonHolders = async (jettonMaster: string): Promise<HoldersResponse> => {
	return tonApi.v2.getJettonHolders({ accountId: jettonMaster });
};

export const getBalance = async (token: string, accountId: string): Promise<number> => {
	try {
		const response = await tonApi.v2.getAccount(
			{ accountId },
			{
				format: 'json',
				headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
			}
		);

		return response.balance / 10 ** 9;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getRates = async (token: string, tokens: string[], currencies: string[]): Promise<IRate[]> => {
	const tokensString = tokens.join(',');
	const currenciesString = currencies.join(',');
	try {
		const response: TokensRate = await tonApi.v2.getRates(
			{ tokens: tokensString, currencies: currenciesString },
			{
				format: 'json',
				headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
			}
		);

		const rateArray: { currency: string; rate: number }[] = Object.entries(response.rates.TON.prices).map(
			([currency, rate]) => ({ currency, rate })
		);

		return rateArray;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
