import { Address, beginCell, Cell, Contract, ContractProvider, TupleBuilder } from '@ton/core';
import { OP_VOTE } from './constants';

export class ElectionsMaster implements Contract {
	constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

	static createFromAddress(address: Address) {
		return new ElectionsMaster(address);
	}

	static createElectionsVoteMessage(): Cell {
		return beginCell().storeUint(OP_VOTE, 32).endCell();
	}

	async getElectionsData(provider: ContractProvider) {
		const res = await provider.get('get_elections_data', []);
		return {
			jetton_master_address: res.stack.readAddress(),
			master_address: res.stack.readAddress(),
			initiated_by_address: res.stack.readAddress(),
			success_amount: res.stack.readBigNumber(),
			current_amount: res.stack.readBigNumber(),
			start_time: res.stack.readNumber(),
			end_time: res.stack.readNumber(),
			action_message_body: res.stack.readCell(),
			elections_wallet_code: res.stack.readCell(),
			jetton_wallet_code: res.stack.readCell(),
		};
	}

	async getEstimateServiceFee(provider: ContractProvider, tokens_amount: bigint) {
		const tupleBuilder = new TupleBuilder();
		tupleBuilder.writeNumber(tokens_amount);
		const res = await provider.get('estimate_service_fee', tupleBuilder.build());
		return res.stack.readBigNumber();
	}

	async getServiceFee(provider: ContractProvider) {
		const res = await provider.get('get_service_fee', []);
		return res.stack.readBigNumber();
	}
}
