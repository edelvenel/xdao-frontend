/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { ProposalKey, ProposalStatus } from 'shared/types';
import { AccountData, HoldersResponse } from './types';

export interface Ok {
	/** @example true */
	ok: boolean;
}

export interface Error {
	error: string;
}

export interface Address {
	address: string;
}

export interface Payload {
	payload: string;
}

export interface AuthToken {
	auth_token: string;
}

export interface Plugin {
	address: string;
	type: string;
}

export interface Proof {
	/** @format int64 */
	timestamp: number;
	domain: string;
	signature: string;
	payload: string;
	state_init: string;
}

export interface Holder {
	jetton_wallet_address: string;
	owner_address: string;
	balance: string;
}

export interface Dao {
	address: string;
	jetton_address: string;
	jetton_metadata: Record<string, any>;
	success_percentage: number;
	total_supply: string;
	plugins: Plugin[];
	owner_address: string;
}

export interface Vote {
	proposal_address: string;
	voter_address: string;
	amount: string;
	date_create: string;
}

export interface Proposal {
	name: string;
	description: string;
	address: string;
	dao: Dao;
	jetton_master_address: string;
	initiated_by_address: string;
	success_amount: string;
	current_amount: string;
	date_start: string;
	date_expire: string;
	type: ProposalKey;
	status: ProposalStatus;
	data: any;
	total_supply: string;
	success_percentage: string;
}

export interface GetAllDaosParams {
	/**
	 * Limit
	 * @max 1000
	 * @default 100
	 */
	limit?: number;
	/** Offset */
	offset?: number;
	/**
	 * Filter DAOs by type
	 * @default "all"
	 */
	filter?: FilterEnum;
	/**
	 * Search by DAO name
	 * @default ""
	 */
	search?: string;
}

export interface GetAccountJettonsBalancesParams {
	/**
	 * accept ton and jetton master addresses, separated by commas
	 */
	tokens: string[];

	/** Wallet Address */
	accountId: string;
}

export interface GetJettonHoldersParams {
	accountId: string;
}

export interface GetAccountParams {
	/** Wallet Address */
	accountId: string;
}

/**
 * Filter DAOs by type
 * @default "all"
 */
export enum FilterEnum {
	All = 'all',
	Mine = 'mine',
}

/**
 * Filter DAOs by type
 * @default "all"
 */
export enum GetAllDaosParams1FilterEnum {
	All = 'all',
	Mine = 'mine',
}

export interface GetDaoHoldersParams {
	/**
	 * Limit
	 * @default 100
	 */
	limit?: number;
	/** Offset */
	offset?: number;
	/** Dao Address */
	daoAddress: string;
}

export interface GetProposalsParams {
	/**
	 * Limit
	 * @max 1000
	 * @default 100
	 */
	limit?: number;
	/** Offset */
	offset?: number;
	/**
	 * Filter proposals by type
	 * @default "all"
	 */
	filter?: string;
	/**
	 * Search by Proposal name
	 * @default ""
	 */
	search?: string;
}

export interface GetTokensParams {
	/**
	 * accept ton and jetton master addresses, separated by commas
	 */
	tokens: string;

	/**
	 * accept ton and all possible fiat currencies, separated by commas
	 */
	currencies: string;
}

export interface GetAccountNftItemsParams {
	/**
	 * Limit
	 * @max 1000
	 * @default 100
	 */
	limit?: number;
	/** Offset */
	offset?: number;
	/**
	 * Wallet address
	 */
	accountId: string;
}

/**
 * Filter proposals by type
 * @default "all"
 */
export enum FilterEnum1 {
	All = 'all',
	Active = 'active',
	Rejected = 'rejected',
	Executed = 'executed',
	Mine = 'mine',
}

/**
 * Filter proposals by type
 * @default "all"
 */
export enum GetProposalsParams1FilterEnum {
	All = 'all',
	Active = 'active',
	Rejected = 'rejected',
	Executed = 'executed',
	Mine = 'mine',
}

export interface GetDaoProposalsParams {
	/**
	 * Limit
	 * @max 1000
	 * @default 100
	 */
	limit?: number;
	/** Offset */
	offset?: number;
	/** Dao Address */
	daoAddress: string;
}

export interface GetDaoProposalVotesParams {
	/**
	 * Limit
	 * @max 1000
	 * @default 100
	 */
	limit?: number;
	/** Offset */
	offset?: number;
	/** Dao Address */
	daoAddress: string;
	/** Proposal Address */
	proposalAddress: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
	/** set parameter to `true` for call `securityWorker` for this request */
	secure?: boolean;
	/** request path */
	path: string;
	/** content type of request body */
	type?: ContentType;
	/** query params */
	query?: QueryParamsType;
	/** format of response (i.e. response.json() -> format: "json") */
	format?: ResponseFormat;
	/** request body */
	body?: unknown;
	/** base url */
	baseUrl?: string;
	/** request cancellation token */
	cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> {
	baseUrl?: string;
	baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
	securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
	customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
	data: D;
	error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
	Json = 'application/json',
	FormData = 'multipart/form-data',
	UrlEncoded = 'application/x-www-form-urlencoded',
	Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
	public baseUrl: string = 'http://localhost:8888';
	private securityData: SecurityDataType | null = null;
	private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
	private abortControllers = new Map<CancelToken, AbortController>();
	private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

	private baseApiParams: RequestParams = {
		credentials: 'same-origin',
		headers: {},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
	};

	constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
		Object.assign(this, apiConfig);
	}

	public setSecurityData = (data: SecurityDataType | null) => {
		this.securityData = data;
	};

	protected encodeQueryParam(key: string, value: any) {
		const encodedKey = encodeURIComponent(key);
		return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`;
	}

	protected addQueryParam(query: QueryParamsType, key: string) {
		return this.encodeQueryParam(key, query[key]);
	}

	protected addArrayQueryParam(query: QueryParamsType, key: string) {
		const value = query[key];
		return value.map((v: any) => this.encodeQueryParam(key, v)).join('&');
	}

	protected toQueryString(rawQuery?: QueryParamsType): string {
		const query = rawQuery || {};
		const keys = Object.keys(query).filter((key) => 'undefined' !== typeof query[key]);
		return keys
			.map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
			.join('&');
	}

	protected addQueryParams(rawQuery?: QueryParamsType): string {
		const queryString = this.toQueryString(rawQuery);
		return queryString ? `?${queryString}` : '';
	}

	private contentFormatters: Record<ContentType, (input: any) => any> = {
		[ContentType.Json]: (input: any) =>
			input !== null && (typeof input === 'object' || typeof input === 'string') ? JSON.stringify(input) : input,
		[ContentType.Text]: (input: any) => (input !== null && typeof input !== 'string' ? JSON.stringify(input) : input),
		[ContentType.FormData]: (input: any) =>
			Object.keys(input || {}).reduce((formData, key) => {
				const property = input[key];
				formData.append(
					key,
					property instanceof Blob
						? property
						: typeof property === 'object' && property !== null
							? JSON.stringify(property)
							: `${property}`
				);
				return formData;
			}, new FormData()),
		[ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
	};

	protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
		return {
			...this.baseApiParams,
			...params1,
			...(params2 || {}),
			headers: {
				...(this.baseApiParams.headers || {}),
				...(params1.headers || {}),
				...((params2 && params2.headers) || {}),
			},
		};
	}

	protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
		if (this.abortControllers.has(cancelToken)) {
			const abortController = this.abortControllers.get(cancelToken);
			if (abortController) {
				return abortController.signal;
			}
			return void 0;
		}

		const abortController = new AbortController();
		this.abortControllers.set(cancelToken, abortController);
		return abortController.signal;
	};

	public abortRequest = (cancelToken: CancelToken) => {
		const abortController = this.abortControllers.get(cancelToken);

		if (abortController) {
			abortController.abort();
			this.abortControllers.delete(cancelToken);
		}
	};

	public request = async <T = any, E = any>({
		body,
		secure,
		path,
		type,
		query,
		format,
		baseUrl,
		cancelToken,
		...params
	}: FullRequestParams): Promise<T> => {
		const secureParams =
			((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
				this.securityWorker &&
				(await this.securityWorker(this.securityData))) ||
			{};
		const requestParams = this.mergeRequestParams(params, secureParams);
		const queryString = query && this.toQueryString(query);
		const payloadFormatter = this.contentFormatters[type || ContentType.Json];
		const responseFormat = format || requestParams.format;

		return this.customFetch(`${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`, {
			...requestParams,
			headers: {
				...(requestParams.headers || {}),
				...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
			},
			signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
			body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body),
		}).then(async (response) => {
			const r = response.clone() as HttpResponse<T, E>;
			r.data = null as unknown as T;
			r.error = null as unknown as E;

			const data = !responseFormat
				? r
				: await response[responseFormat]()
						.then((data) => {
							if (r.ok) {
								r.data = data;
							} else {
								r.error = data;
							}
							return r;
						})
						.catch((e) => {
							r.error = e;
							return r;
						});

			if (cancelToken) {
				this.abortControllers.delete(cancelToken);
			}

			if (!response.ok) throw data;
			return data.data;
		});
	};
}

/**
 * @title DAO REST API
 * @version 0.0.1
 * @baseUrl http://localhost:8888
 * @contact Support <contact@xdao.org>
 */
export class Api<SecurityDataType extends unknown> {
	http: HttpClient<SecurityDataType>;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
	}

	v1 = {
		/**
		 * No description
		 *
		 * @tags system
		 * @name Healthcheck
		 * @summary Check the readiness of the server
		 * @request GET:/api/v1/healthcheck
		 */
		healthcheck: (params: RequestParams = {}) =>
			this.http.request<
				Ok,
				{
					/** Error message */
					error: string;
				}
			>({
				path: `/api/v1/healthcheck`,
				method: 'GET',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags auth
		 * @name AuthGetPayload
		 * @summary Retrieve the payload
		 * @request GET:/api/v1/payload
		 */
		authGetPayload: (params: RequestParams = {}) =>
			this.http.request<
				Payload,
				{
					/** Error message */
					error: string;
				}
			>({
				path: `/api/v1/payload`,
				method: 'GET',
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags auth
		 * @name AuthCheckProof
		 * @summary Generate auth token
		 * @request POST:/api/v1/auth
		 */
		authCheckProof: (
			data: {
				address: string;
				proof: Proof;
			},
			params: RequestParams = {}
		) =>
			this.http.request<
				AuthToken,
				{
					/** Error message */
					error: string;
				}
			>({
				path: `/api/v1/auth`,
				method: 'POST',
				body: data,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags dao
		 * @name GetFactoryAddress
		 * @summary Returns the current DAO factory contract address
		 * @request GET:/api/v1/address/factory
		 */
		getFactoryAddress: (params: RequestParams = {}) =>
			this.http.request<
				Address,
				{
					/** Error message */
					error: string;
				}
			>({
				path: `/api/v1/address/factory`,
				method: 'GET',
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags dao
		 * @name GetAllDaos
		 * @summary Get the list of all DAOs
		 * @request GET:/api/v1/daos
		 */
		getAllDaos: (query: GetAllDaosParams, params: RequestParams = {}) =>
			this.http.request<
				{
					/** @format int64 */
					total: number;
					items: Dao[];
				},
				{
					/** Error message */
					error: string;
				}
			>({
				path: `/api/v1/daos`,
				method: 'GET',
				query: query,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags dao
		 * @name GetDaoInfo
		 * @summary Retrieve detailed DAO information
		 * @request GET:/api/v1/daos/{dao_address}
		 */
		getDaoInfo: (daoAddress: string, params: RequestParams = {}) =>
			this.http.request<
				Dao,
				{
					/** Error message */
					error: string;
				}
			>({
				path: `/api/v1/daos/${daoAddress}`,
				method: 'GET',
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags dao
		 * @name GetDaoHolders
		 * @summary Get the list of DAO holders
		 * @request GET:/api/v1/daos/{dao_address}/holders
		 */
		getDaoHolders: ({ daoAddress, ...query }: GetDaoHoldersParams, params: RequestParams = {}) =>
			this.http.request<
				{
					/** @format int64 */
					total: number;
					items: Holder[];
				},
				{
					/** Error message */
					error: string;
				}
			>({
				path: `/api/v1/daos/${daoAddress}/holders`,
				method: 'GET',
				query: query,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags proposal
		 * @name GetProposals
		 * @summary Get the list of proposals
		 * @request GET:/api/v1/proposals
		 */
		getProposals: ({ ...query }: GetProposalsParams, params: RequestParams = {}) =>
			this.http.request<
				{
					/** @format int64 */
					total: number;
					items: Proposal[];
				},
				{
					/** Error message */
					error: string;
				}
			>({
				path: `/api/v1/proposals`,
				method: 'GET',
				query: query,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags proposal
		 * @name GetProposalInfo
		 * @summary Retrieve detailed proposal information
		 * @request GET:/api/v1/proposals/{proposal_address}
		 */
		getProposalInfo: (proposalAddress: string, query: GetProposalsParams, params: RequestParams = {}) =>
			this.http.request<
				Proposal,
				{
					/** Error message */
					error: string;
				}
			>({
				path: `/api/v1/proposals/${proposalAddress}`,
				method: 'GET',
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags proposal
		 * @name GetDaoProposals
		 * @summary Get the list of DAO proposals
		 * @request GET:/api/v1/daos/{dao_address}/proposals
		 */
		getDaoProposals: ({ daoAddress, ...query }: GetDaoProposalsParams, params: RequestParams = {}) =>
			this.http.request<
				{
					/** @format int64 */
					total: number;
					items: Proposal[];
				},
				{
					/** Error message */
					error: string;
				}
			>({
				path: `/api/v1/daos/${daoAddress}/proposals`,
				method: 'GET',
				query: query,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags proposal
		 * @name GetDaoProposalVotes
		 * @summary Returns votes for a DAO proposal
		 * @request GET:/api/v1/daos/{dao_address}/proposals/{proposal_address}/votes
		 */
		getDaoProposalVotes: (
			{ daoAddress, proposalAddress, ...query }: GetDaoProposalVotesParams,
			params: RequestParams = {}
		) =>
			this.http.request<
				{
					/** @format int64 */
					total: number;
					items: Vote[];
				},
				{
					/** Error message */
					error: string;
				}
			>({
				path: `/api/v1/daos/${daoAddress}/proposals/${proposalAddress}/votes`,
				method: 'GET',
				query: query,
				...params,
			}),
		// TODO: mock methods, replace
		// FIXME: CODE IS AUTO GENERATED, MODIFICATIONS ARE NOT ALLOWED!!!!
		getMe: () => {
			return {
				data: {
					id: 0,
					walletAddress: null,
					firstName: '',
					lastName: null,
					languageCode: '',
					username: null,
					isPremium: false,
					addedToAttachmentMenu: false,
					allowsWriteToPm: false,
					photoUrl: null,
					isBot: false,
				},
				status: 200,
			};
		},
		getBalance: () => {
			return { data: [], status: 200 };
		},
		getNfts: () => {
			return { data: [], status: 200 };
		},
		linkWallet: (payload: any) => {
			return { data: {}, status: 204 };
		},
	};
}

/**
 * @title TON API
 * @version 2.0.0
 * @baseUrl https://tonapi.io
 * @contact Support <contact@xdao.org>
 */
export class TonApi<SecurityDataType extends unknown> {
	http: HttpClient<SecurityDataType>;

	constructor(http: HttpClient<SecurityDataType>) {
		this.http = http;
	}

	v2 = {
		getJettonHolders: ({ accountId }: GetJettonHoldersParams, params: RequestParams = {}) =>
			this.http.request<
				HoldersResponse,
				{
					error: string;
				}
			>({
				path: `/v2/jettons/${accountId}/holders`,
				method: 'GET',
				...params,
			}),
		/**
		 * No description
		 *
		 * @tags system
		 * @name getAccountJettonsBalances
		 * @summary Get all Jettons balances by owner address
		 * @request GET:/v2/accounts/{account_id}/jettons
		 */
		getAccountJettonsBalances: ({ accountId, ...query }: GetAccountJettonsBalancesParams, params: RequestParams = {}) =>
			this.http.request<
				BalancesResponse,
				{
					/** Error message */
					error: string;
				}
			>({
				path: `/v2/accounts/${accountId}/jettons`,
				method: 'GET',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags system
		 * @name getAccount
		 * @summary Get human-friendly information about an account without low-level details.
		 * @request GET:/v2/accounts/{account_id}
		 */
		getAccount: ({ accountId, ...query }: GetAccountParams, params: RequestParams = {}) =>
			this.http.request<
				AccountData,
				{
					/** Error message */
					error: string;
				}
			>({
				path: `/v2/accounts/${accountId}`,
				method: 'GET',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags system
		 * @name getRates
		 * @summary Get the token price in the chosen currency for display only. Don’t use this for financial transactions.
		 * @request GET:/v2/rates
		 */
		getRates: ({ tokens, currencies, ...query }: GetTokensParams, params: RequestParams = {}) =>
			this.http.request<
				TokensRate,
				{
					/** Error message */
					error: string;
				}
			>({
				path: `/v2/rates`,
				method: 'GET',
				query: { tokens, currencies, ...query },
				...params,
			}),
		/**
		 * No description
		 *
		 * @tags system
		 * @name getAccountNftItems
		 * @summary Get all NFT items by owner address
		 * @request GET:/v2/accounts/{account_id}/nfts
		 */
		getAccountNftItems: ({ accountId, ...query }: GetAccountNftItemsParams, params: RequestParams = {}) =>
			this.http.request<
				{
					/** @format int64 */
					total: number;
					nft_items: NftItem[];
				},
				{
					/** Error message */
					error: string;
				}
			>({
				path: `/v2/accounts/${accountId}/nfts`,
				method: 'GET',
				query: query,
				...params,
			}),
	};
}
