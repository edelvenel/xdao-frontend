import { api } from 'app/api';
import { Dao } from 'app/api/codegen';
import { IDao } from 'shared/types';

export const getFactoryAddress = async (token: string) => {
  try {
    const response = await api.v1.getFactoryAddress({ format: "json", headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" } });

    return response.address;
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

export const getDaos = async (token: string, offset: number): Promise<{ daos: IDao[], hasMore: boolean }> => {
  try {
    const response = await api.v1.getAllDaos({ limit: 100, offset: offset }, { format: "json", headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" } });

    return { daos: response.items.map(daoMapper), hasMore: response.total > offset + response.items.length };
  } catch (error) {
    throw error;
  }
};

export const getDao = async (token: string, id: string): Promise<IDao> => {
  try {
    const response = await api.v1.getDaoInfo(id, { format: "json", headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" } });

    return daoMapper(response);
  } catch (error) {
    throw error;
  }
};