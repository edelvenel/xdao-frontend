import { Address, beginCell, Cell, Dictionary, StateInit } from '@ton/core';
import { JettonOnchainMetadata } from './common';
import { Builder } from './utils';

export enum DAOBuilderOpCodes {
	CREATE_MASTER = 0x17881d60,
}

const BASE_WALLET_CODE = Cell.fromHex(
	"b5ee9c724102170100035b000114ff00f4a413f4bcf2c80b010201200213020148030803f8d001d0d3032171b0925f04e022d749c120925f04e002d31f218210706c7567bd22821064737472bdb022c300b0925f05e003fa403020fa4401c8ca07cbffc9d0ed44d0d200016d019430fa4001de01810140d721f404305320810108f40a6fa1315124c70502b322b3b0925f08e006d33f25c000e30225c00fe30232040506002a3150675f06f2e2bd9320d74a96d307d402fb00e830003410285f08f2e2bded44d081010cd721c87001ca0001cf16c9ed5401aac8258210706c7567ba8e3902fa00f40430f8276f2230500aa121bef2e0508210f06c75677080185005cb0526cf1658fa0219f40012cb6917cb1f5260cb3f20c98040fb00923237e203821064737472ba925f06e30d0700825004810108f45930ed44d081024cd720c801cf16f400c9ed540172b08e1f8210e47374727080185003cb055003cf1621fa02cb6acb1fcb3fc98040fb00925f03e202012009120201200a110201200b0c002bb52f7da89a1a40002da432c6003f48060032265c40300201200d0e003db29dfb513420409335c87d010c00b23281f2fff274006040423d029be84c600201200f10001badce76a2684080a66b90eb85ffc0001baf1df6a2684080966b90eb858fc0001bb8c97ed44d081010cd721d70b1f80059bd242b6f6a2684081266b90fa0218470d4080847a4937d29910ce6903e9ff9837812801b7810148987159f318402f6f28308d71820d31fd31fd31f02f823bbf264ed44d0d2000120970181010bd72101de01d31fd31fd3fff404d104f2e1915142baf2a15155baf2a205f901541062f910f2a3f80023a4c8cb1f5230cb1f5210cbff5250f400c9ed54f80f01d30721c0009f6c519320d74a96d307d402fb00e830e021c001e30021c0021415006ed207fa00d4d422f90005c8ca0715cbffc9d077748018c8cb05cb0222cf165005fa0214cb6b12ccccc973fb00c84017810108f451f2a70501fc8e38810108d718fa00d33fc854204a810108f451f2a782106e6f746570748018c8cb05cb025006cf165004fa0214cb6a12cb1fcb3fc973fb0005de01c0038e36810108d718fa00d33f305227810108f459f2a782106473747270748018c8cb05cb025005cf165003fa0213cb6acb1f15cb3fc973fb009130e202a4c8cb1f160012cb1fcbfff400c9ed545e286839"
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
