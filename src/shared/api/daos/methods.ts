import { api, tonApi } from 'app/api';
import { Dao, FilterEnum } from 'app/api/codegen';
import { BalancesResponse, TokensRate } from 'app/api/types';
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
		logo: dao.jetton_metadata['image'],
		jetton_address: dao.jetton_address,
		address: dao.address,
		activeProposals: 0,
		LPTokens: dao.total_supply,
		social: [],
		email: dao.jetton_metadata['email'],
		consensus: 50, //TODO: replace with real data
		distributionRules: [],
		slots: { total: 1, reserved: 0 },
		status: DaoStatus.Transferable,
		description: '',
		plugins: dao.plugins,
	};
};

export const jettonMapper = (balances: BalancesResponse[]): IJetton[] => {
	const mappedJettons: IJetton[] = balances.flatMap((item) =>
		item.balances.flatMap((balance) => {
			return {
				name: balance.jetton.name,
				imgUrl: balance.jetton.image,
				url: '', //TODO: replace with real url,
				amount: Number(balance.balance) / 10 ** balance.jetton.decimals,
			};
		})
	);

	return mappedJettons;
};

export const getDaos = async (token: string, offset: number): Promise<{ daos: IDao[]; hasMore: boolean }> => {
	try {
		const response = await api.v1.getAllDaos(
			{ limit: 100, offset: offset, filter: FilterEnum.Mine },
			{ format: 'json', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
		);

		return { daos: response.items.map(daoMapper), hasMore: response.total > offset + response.items.length };
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
