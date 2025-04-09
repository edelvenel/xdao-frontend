import { MeDto } from "./dto/MeDto";
import { IBalance, INfts } from "./types";

export type IGetMeResponse = MeDto;

export type IGetBalanceResponse = IBalance[];

export type IGetNftsResponse = INfts[];

export type ILinkWalletResponse = boolean;
