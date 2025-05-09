import { Address, beginCell, Dictionary } from "@ton/core";
import { Builder } from "./utils";
import { JettonOnchainMetadata } from "./common";

export enum DAOBuilderOpCodes {
    CREATE_MASTER = 0x17881d60
}

export class DAOBuilder extends Builder {
    static buildCreateMaster(jettonMeta: JettonOnchainMetadata, successPercentage: bigint | number, holdersDict: Dictionary<Address, bigint>) {
        return beginCell()
            .store(this.storeOpcode(DAOBuilderOpCodes.CREATE_MASTER))
            .store(this.storeQueryId())
            .storeRef(jettonMeta)
            .storeUint(successPercentage, 14)
            .storeDict(holdersDict)
            .endCell();
    }
}