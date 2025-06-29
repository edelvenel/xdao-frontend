import { Address, Cell, Contract, beginCell } from '@ton/core';
import { OP_CREATE_ELECTIONS } from './constants';

export class Master implements Contract {
	constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

	static createFromAddress(address: Address) {
		return new Master(address);
	}

	static createElectionsMessage(options: {
		start_time: number;
		expiration_time: number;
		action_message_body: Cell; // success message body
		name: string;
		description: string;
	}): Cell {
		return beginCell()
			.storeUint(OP_CREATE_ELECTIONS, 32)
			.storeUint(Number(options.start_time.toFixed()), 64)
			.storeUint(Number(options.expiration_time.toFixed()), 64)
			.storeRef(options.action_message_body)
			.storeMaybeStringRefTail(options.name)
			.storeMaybeStringRefTail(options.description)
			.endCell();
	}
}
