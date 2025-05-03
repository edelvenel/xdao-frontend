import { api } from 'app/api';
import { Dao } from 'app/api/codegen';
import { IDao } from 'shared/types';

export const getFactoryAddress = async () => {
  try {
    const response = await api.v1.getFactoryAddress();

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const daoMapper = (dao: Dao): IDao => {
  return {
    id: dao.address,
    name: dao.jetton_metadata["description"],
    logo: dao.jetton_metadata["image"],
    address: dao.address,
    activeProposals: 0,
    LPTokens: dao.total_supply,
    social: [],
    email: dao.jetton_metadata["email"],
  };
};

export const fetchDaos = async (offset: number): Promise<IDao[]> => {
  try {
    const response = await api.v1.getAllDaos({ limit: 100, offset: offset });

    return response.items.map(daoMapper);
  } catch (error) {
    throw error;
  }
};
