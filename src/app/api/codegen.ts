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

export interface Ok {
  /** @example true */
  ok: boolean;
}

export interface Error {
  error: string;
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
}

export interface Proposal {
  initiated_by_address: string;
  /** @format int64 */
  success_amount: number;
  /** @format int64 */
  current_amount: number;
  date_start: string;
  date_expire: string;
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
}

export interface GetDaoHoldersParams {
  /**
   * Limit
   * @max 1000
   * @default 100
   */
  limit?: number;
  /** Offset */
  offset?: number;
  /** Address */
  address: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
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

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "http://localhost:8888";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
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

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
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
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
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
        method: "GET",
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
        method: "GET",
        format: "json",
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
      params: RequestParams = {},
    ) =>
      this.http.request<
        AuthToken,
        {
          /** Error message */
          error: string;
        }
      >({
        path: `/api/v1/auth`,
        method: "POST",
        body: data,
        format: "json",
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
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags dao
     * @name GetDaoHolders
     * @summary Get the list of DAO holders
     * @request GET:/api/v1/dao/{address}/holders
     */
    getDaoHolders: (
      { address, ...query }: GetDaoHoldersParams,
      params: RequestParams = {},
    ) =>
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
        path: `/api/v1/dao/${address}/holders`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags proposal
     * @name GetAllProposals
     * @summary Get the list of all proposals
     * @request GET:/api/v1/proposals/{address}
     */
    getAllProposals: (address: string, params: RequestParams = {}) =>
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
        path: `/api/v1/proposals/${address}`,
        method: "GET",
        ...params,
      }),
  };
}
