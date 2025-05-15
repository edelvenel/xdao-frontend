export interface PriceInfo {
	prices: Prices;
	diff_24h: PricesDifference;
	diff_7d: PricesDifference;
	diff_30d: PricesDifference;
}

export interface WalletAddress {
	address: string;
	name: string;
	is_scam: boolean;
	icon: string;
	is_wallet: boolean;
}

export interface Jetton {
	address: string;
	name: string;
	symbol: string;
	decimals: number;
	image: string;
	verification: string;
	custom_payload_api_uri: string;
	score: number;
}

export interface LockInfo {
	amount: string;
	till: number; // UNIX timestamp
}

export interface BalanceEntry {
	balance: string;
	price: PriceInfo;
	wallet_address: WalletAddress;
	jetton: Jetton;
	extensions: string[];
	lock: LockInfo;
}

export interface BalancesResponse {
	balances: BalanceEntry[];
}

export interface AccountData {
	address: string;
	balance: number;
	extra_balance?: ExtraBalanceEntity[] | null;
	currencies_balance: any;
	last_activity: number;
	status: string;
	interfaces?: string[] | null;
	name: string;
	is_scam: boolean;
	icon: string;
	memo_required: boolean;
	get_methods?: string[] | null;
	is_suspended: boolean;
	is_wallet: boolean;
}
export interface ExtraBalanceEntity {
	amount: string;
	preview: Preview;
}
export interface Preview {
	id: number;
	symbol: string;
	decimals: number;
	image: string;
}

export interface TokensRate {
	rates: Rates;
}
export interface Rates {
	TON: Currency;
}
export interface Currency {
	prices: Prices;
	diff_24h: PricesDifference;
	diff_7d: PricesDifference;
	diff_30d: PricesDifference;
}
export interface Prices {
	TON: number;
	USD: number;
	RUB: number;
}
export interface PricesDifference {
	TON: string;
	USD: string;
	RUB: string;
}

export interface NftItemsResponse {
	nft_items: NftItem[];
}

export interface NftItem {
	address: string;
	index: number;
	owner: WalletAddress;
	collection: Collection;
	verified: boolean;
	metadata: Record<string, any>; // empty object in your example; you can refine if structure known
	sale: NftSale;
	previews: Preview[];
	dns: string;
	include_cnft: boolean;
	trust: string;
}

export interface WalletAddress {
	address: string;
	name: string;
	is_scam: boolean;
	icon: string;
	is_wallet: boolean;
}

export interface Collection {
	address: string;
	name: string;
	description: string;
}

export interface NftSale {
	address: string;
	market: WalletAddress;
	owner: WalletAddress;
	price: SalePrice;
}

export interface SalePrice {
	value: string;
	token_name: string;
}

export interface Preview {
	resolution: string;
	url: string;
}
