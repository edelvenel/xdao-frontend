import { Address, beginCell, Cell, Contract, ContractProvider, Sender, SendMode, TupleBuilder } from '@ton/core';
import { OP_NOTIFY } from './constants';

export class DAOJettonWallet implements Contract {
	constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

	static createFromAddress(address: Address) {
		return new DAOJettonWallet(address);
	}

	async getEstimateServiceFee(provider: ContractProvider, tokens_amount: bigint) {
		const tupleBuilder = new TupleBuilder();
		tupleBuilder.writeNumber(tokens_amount);
		const res = await provider.get('estimate_service_fee', tupleBuilder.build());
		return res.stack.readBigNumber();
	}

	async sendBalanceNotification(
		provider: ContractProvider,
		via: Sender,
		value: bigint,
		responseAddress: Address,
		payload?: Cell,
		queryId: bigint = 0n
	) {
		return await provider.internal(via, {
			value,
			sendMode: SendMode.PAY_GAS_SEPARATELY,
			body: beginCell()
				.storeUint(OP_NOTIFY, 32)
				.storeUint(queryId, 64)
				.storeAddress(responseAddress) // notification receiver
				.storeMaybeRef(payload) // Maybe ^Cell, custom payload
				.endCell(),
		});
	}
}
