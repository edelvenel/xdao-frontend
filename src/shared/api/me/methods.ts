import { http } from "app/http";
import { ILinkWalletPayload } from "./payloads";
import {
  IGetBalanceResponse,
  IGetMeResponse,
  IGetNftsResponse,
  ILinkWalletResponse,
} from "./responses";

export const getMe = async (): Promise<IGetMeResponse> => {
  const response = await http.get(`/user/me`);

  return response.data;
};

export const getBalance = async (): Promise<IGetBalanceResponse> => {
  const response = await http.get(`/user/me/balance`);

  return response.data;
};

export const getNfts = async (): Promise<IGetNftsResponse> => {
  const response = await http.get(`/user/me/nfts`);

  return response.data;
};

export const linkWallet = async (
  payload: ILinkWalletPayload
): Promise<ILinkWalletResponse> => {
  const response = await http.post(`/user/me/wallet`, payload);

  return response.status === 204;
};
