import { http } from 'app/http';

export const getFactoryAddress = async () => {
  try {
    const response = await http.get('/master-dao/options');

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchDaos = async () => {
  try {
    const response = await http.get('/master-dao');

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
