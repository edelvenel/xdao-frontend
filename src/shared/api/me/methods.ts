import { api } from "app/api";
import { ILinkWalletPayload } from "./payloads";
import {
  IGetBalanceResponse,
  IGetMeResponse,
  IGetNftsResponse,
  ILinkWalletResponse,
} from "./responses";

export const getMe = async (): Promise<IGetMeResponse> => {
  const response = await api.v1.getMe();

  return response.data;
};  

export const getBalance = async (): Promise<IGetBalanceResponse> => {
  const response = await api.v1.getBalance();

  return response.data;
};

export const getNfts = async (): Promise<IGetNftsResponse> => {
  const response = await api.v1.getNfts();

  return response.data;
};

export const linkWallet = async (
  payload: ILinkWalletPayload
): Promise<ILinkWalletResponse> => {
  const response = await api.v1.linkWallet(payload);

  return response.status === 204;
};
