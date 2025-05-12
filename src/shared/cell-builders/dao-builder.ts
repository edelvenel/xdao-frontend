import { Address, beginCell, Cell, Dictionary, StateInit } from '@ton/core';
import { JettonOnchainMetadata } from './common';
import { Builder } from './utils';

export enum DAOBuilderOpCodes {
	CREATE_MASTER = 0x17881d60,
}

const BASE_WALLET_CODE = Cell.fromBase64(
	'te6cckECFwEAA10AART/APSkE/S88sgLAQIBIAITAgFIAwgD+NAB0NMDIXGwkl8E4CLXScEgkl8E4ALTHyGCEHBsdWe9IoIQZHN0cr2wIsMAsJJfBeAD+kAh+kQByMoHy//J0O1E0NIAAW0BlDD6QAHeAYEBQNch9AQwUyCBAQj0Cm+hMVElxwUCsyKzsJJfCeAH0z8mwADjAjQlwA/jAjEEBQYALBAjXwNsUvLivZMg10qW0wfUAvsA6DAAMhhfCPLive1E0IEBDNchyHABygABzxbJ7VQBrsglghBwbHVnuo47A/oA9AQw+CdvIjBQCqEhvvLgUIIQ8Gx1Z3CAGFAGywUmzxZY+gIZ9AATy2kXyx9SEMs/IMmAQPsAUAaSMzfiA4IQZHN0crqSXwbjDQcAglAkgQEI9Fkw7UTQgQJM1yDIAc8W9ADJ7VQBcrCOH4IQ5HN0cnCAGFAEywVYzxYi+gISy2rLH8s/yYBA+wCSXwPiAgEgCRICASAKEQIBIAsMACu1L32omhpAAC2kMsYAP0gGADImXEAwAgEgDQ4APbKd+1E0IECTNch9AQwAsjKB8v/ydABgQEI9ApvoTGACASAPEAAbrc52omhAgKZrkOuF/8AAG68d9qJoQICWa5DrhY/AABu4yX7UTQgQEM1yHXCx+ABZvSQrb2omhAgSZrkPoCGEcNQICEekk30pkQzmkD6f+YN4EoAbeBAUiYcVnzGEAvbygwjXGCDTH9Mf0x8C+CO78mTtRNDSAAEglwGBAQvXIQHeAdMf0x/T//QE0QTy4ZFRQrryoVFVuvKiBfkBVBBi+RDyo/gAI6TIyx9SMMsfUhDL/1JQ9ADJ7VT4DwHTByHAAJ9sUZMg10qW0wfUAvsA6DDgIcAB4wAhwAIUFQBu0gf6ANTUIvkABcjKBxXL/8nQd3SAGMjLBcsCIs8WUAX6AhTLaxLMzMlz+wDIQBeBAQj0UfKnBQH8jjiBAQjXGPoA0z/IVCBKgQEI9FHyp4IQbm90ZXB0gBjIywXLAlAGzxZQBPoCFMtqEssfyz/Jc/sABd4BwAOONoEBCNcY+gDTPzBSJ4EBCPRZ8qeCEGRzdHJwdIAYyMsFywJQBc8WUAP6AhPLassfFcs/yXP7AJEw4gKkyMsfFgASyx/L//QAye1Ur7Mn+A=='
);

export class DAOBuilder extends Builder {
	static readonly basePlugins: StateInit[] = [DAOBuilder.createMasterWalletStateInit()];

	static createMasterWalletStateInit(): StateInit {
		const publicKey = crypto.getRandomValues(new Uint8Array(32));
		console.log(Buffer.from(publicKey).toString('hex'));
		const stateInit: StateInit = {
			code: BASE_WALLET_CODE,
			data: beginCell()
				.storeUint(0, 32)
				.storeUint(0x6cb78806, 32)
				.storeBuffer(Buffer.from(publicKey))
				.storeBit(false)
				.endCell(),
		};

		return stateInit;
	}

	static buildCreateMaster(
		jettonMeta: JettonOnchainMetadata,
		successPercentage: bigint | number,
		holdersDict: Dictionary<Address, bigint>
	) {
		// Only one plugin is supported for now
		const plugin = DAOBuilder.basePlugins.length > 0 ? DAOBuilder.basePlugins[0] : undefined;
		const pluginCell = plugin
			? beginCell().storeRef(plugin.code!).storeMaybeRef(plugin.data!).storeMaybeRef(null).endCell()
			: undefined;

		return beginCell()
			.store(this.storeOpcode(DAOBuilderOpCodes.CREATE_MASTER))
			.store(this.storeQueryId())
			.storeRef(jettonMeta)
			.storeUint(successPercentage, 14)
			.storeDict(holdersDict)
			.storeMaybeRef(pluginCell)
			.endCell();
	}
}
