import { api, tonApi } from 'app/api';
import { Dao, FilterEnum } from 'app/api/codegen';
import { JettonsEvent } from 'app/api/types';
import { DaoStatus, IDao, IJetton } from 'shared/types';

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

export const jettonMapper = (jettons: JettonsEvent[]): IJetton[] => {
	const mappedJettons: IJetton[] = jettons.flatMap((jetton) => {
		if (jetton.value_flow) {
			const jettonArray = jetton.value_flow.map((value) => value.jettons ?? []);

			if (jettonArray) {
				const convertedJettons: IJetton[] = jettonArray.flatMap((jetton) => {
					return jetton.flatMap((element) => {
						return {
							name: element.jetton.name,
							imgUrl: element.jetton.image,
							url: '', //TODO: replace with real link
							amount: Number(element.qty),
						};
					});
				});
				return convertedJettons;
			}

			return [];
		}

		return [];
	});
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

export const getJettons = async (token: string, walletAddress: string): Promise<IJetton[]> => {
	try {
		const response = await tonApi.v2.getJettonsEvents(
			{ walletAddress },
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
