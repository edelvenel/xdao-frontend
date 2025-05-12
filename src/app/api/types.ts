export interface JettonsEvent {
	event_id: string;
	timestamp: number;
	actions?: ActionsEntity[] | null;
	value_flow?: ValueFlowEntity[] | null;
	is_scam: boolean;
	lt: number;
	in_progress: boolean;
}
export interface ActionsEntity {
	type: string;
	status: string;
	TonTransfer: TonTransfer;
	ExtraCurrencyTransfer: ExtraCurrencyTransfer;
	ContractDeploy: ContractDeploy;
	JettonTransfer: JettonTransfer;
	JettonBurn: JettonBurn;
	JettonMint: JettonMint;
	NftItemTransfer: NftItemTransfer;
	Subscribe: Subscribe;
	UnSubscribe: UnSubscribe;
	AuctionBid: AuctionBid;
	NftPurchase: NftPurchase;
	DepositStake: Stake;
	WithdrawStake: Stake;
	WithdrawStakeRequest: Stake;
	ElectionsDepositStake: ElectionsStake;
	ElectionsRecoverStake: ElectionsStake;
	JettonSwap: JettonSwap;
	SmartContractExec: SmartContractExec;
	DomainRenew: DomainRenew;
	simple_preview: SimplePreview;
	base_transactions?: string[] | null;
}
export interface TonTransfer {
	sender: Account;
	recipient: Account;
	amount: number;
	comment: string;
	encrypted_comment: EncryptedComment;
	refund: Refund;
}
export interface Account {
	address: string;
	name: string;
	is_scam: boolean;
	icon: string;
	is_wallet: boolean;
}
export interface EncryptedComment {
	encryption_type: string;
	cipher_text: string;
}
export interface Refund {
	type: string;
	origin: string;
}
export interface ExtraCurrencyTransfer {
	sender: Account;
	recipient: Account;
	amount: string;
	comment: string;
	encrypted_comment: EncryptedComment;
	currency: Currency;
}
export interface Currency {
	id: number;
	symbol: string;
	decimals: number;
	image: string;
}
export interface ContractDeploy {
	address: string;
	interfaces?: string[] | null;
}
export interface JettonTransfer {
	sender: Account;
	recipient: Account;
	senders_wallet: string;
	recipients_wallet: string;
	amount: string;
	comment: string;
	encrypted_comment: EncryptedComment;
	refund: Refund;
	jetton: JettonMaster;
}
export interface JettonMaster {
	address: string;
	name: string;
	symbol: string;
	decimals: number;
	image: string;
	verification: string;
	custom_payload_api_uri: string;
	score: number;
}
export interface JettonBurn {
	sender: Account;
	senders_wallet: string;
	amount: string;
	jetton: JettonMaster;
}
export interface JettonMint {
	recipient: Account;
	recipients_wallet: string;
	amount: string;
	jetton: JettonMaster;
}
export interface NftItemTransfer {
	sender: Account;
	recipient: Account;
	nft: string;
	comment: string;
	encrypted_comment: EncryptedComment;
	payload: string;
	refund: Refund;
}
export interface Subscribe {
	subscriber: Account;
	subscription: string;
	beneficiary: Account;
	amount: number;
	initial: boolean;
}
export interface UnSubscribe {
	subscriber: Account;
	subscription: string;
	beneficiary: Account;
}
export interface AuctionBid {
	auction_type: string;
	amount: PriceOrAmount;
	nft: Nft;
	bidder: Account;
	auction: Account;
}
export interface PriceOrAmount {
	value: string;
	token_name: string;
}
export interface Nft {
	address: string;
	index: number;
	owner: Account;
	collection: Collection;
	verified: boolean;
	metadata: any;
	sale: Sale;
	previews?: PreviewsEntity[] | null;
	dns: string;
	include_cnft: boolean;
	trust: string;
}
export interface Collection {
	address: string;
	name: string;
	description: string;
}

export interface Sale {
	address: string;
	market: Account;
	owner: Account;
	price: PriceOrAmount;
}
export interface PreviewsEntity {
	resolution: string;
	url: string;
}
export interface NftPurchase {
	auction_type: string;
	amount: PriceOrAmount;
	nft: Nft;
	seller: Account;
	buyer: Account;
}
export interface Stake {
	amount: number;
	staker: Account;
	pool: Account;
	implementation: string;
}
export interface ElectionsStake {
	amount: number;
	staker: Account;
}
export interface JettonSwap {
	dex: string;
	amount_in: string;
	amount_out: string;
	ton_in: number;
	ton_out: number;
	user_wallet: Account;
	router: Account;
	jetton_master_in: JettonMaster;
	jetton_master_out: JettonMaster;
}
export interface SmartContractExec {
	executor: Account;
	contract: Account;
	ton_attached: number;
	operation: string;
	payload: string;
	refund: Refund;
}
export interface DomainRenew {
	domain: string;
	contract_address: string;
	renewer: Account;
}
export interface SimplePreview {
	name: string;
	description: string;
	action_image: string;
	value: string;
	value_image: string;
	accounts?: Account[] | null;
}
export interface ValueFlowEntity {
	account: Account;
	ton: number;
	fees: number;
	jettons?: JettonsEntity[] | null;
}
export interface JettonsEntity {
	account: Account;
	jetton: JettonMaster;
	qty: string;
}
