import { API_URL, TON_API_URL } from 'shared/constants';
import { Api, HttpClient, TonApi } from './codegen';

export const api = new Api(
	new HttpClient({
		baseUrl: API_URL,
	})
);

export const tonApi = new TonApi(
	new HttpClient({
		baseUrl: TON_API_URL,
	})
);
