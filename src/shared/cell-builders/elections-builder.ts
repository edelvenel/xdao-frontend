import { beginCell } from "@ton/core";
import { Builder } from "./utils";

export enum ElectionsBuilderOpCodes {
    VOTE = 0x5a108564
}

export class ElectionsBuilder extends Builder {
    static buildVote() {
        return beginCell()
            .store(this.storeOpcode(ElectionsBuilderOpCodes.VOTE))
        .asCell();
    }
}

/* 
        await jettonWallet.sendBalanceNotification(
          sender,
          toNano('0.1'),
          Address.parse(electionAddress),
          ElectionsBuilder.buildVote(),
          0n
        );
*/