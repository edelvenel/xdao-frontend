import { API_URL, TON_API_URL } from 'shared/constants';
import { Api, HttpClient, TonApi } from './codegen';
import { TgDataApi, HttpClient as TgHttpClient } from './tg-data-codegen';

const apiHttpClient = new HttpClient({
	baseUrl: API_URL,
});

const tgDataApiHttpClient = apiHttpClient;
// const tgDataApiHttpClient = new HttpClient({
// 	baseUrl: 'http://127.0.0.1:1323',
// });

export const tgDataApi = new TgDataApi(tgDataApiHttpClient as unknown as TgHttpClient);

export const api = new Api(apiHttpClient);

export const tonApi = new TonApi(
	new HttpClient({
		baseUrl: TON_API_URL,
	})
);
