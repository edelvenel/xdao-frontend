import { Address, beginCell, Cell, Dictionary} from "@ton/core";
import { Builder } from "./utils";

export enum ProposalsBuilderOpCodes {
    CALL_PLUGIN = 0x2cb6f6b6,
    INSTALL_PLUGIN = 0x940d1a56,
    REMOVE_PLUGIN = 0x48021b7e,
    CHANGE_SUCCESS_PERCENTAGE = 0xece13675,
    CALL_JETTON_MINT = 0xac867e8d,
    CALL_JETTON_TRANSFER = 0x9cdbcc7e,
    CALL_JETTON_BURN = 0xfacc90e8
}

export class ProposalsBuilder extends Builder {
    static buildChangeSuccessPercentage(successPercentage: number) {
        return beginCell()
            .store(this.storeOpcode(ProposalsBuilderOpCodes.CHANGE_SUCCESS_PERCENTAGE))
            .storeUint(successPercentage, 14)
        .asCell();
    }

    static buildRemovePlugin(pluginAddr: Address) {
        return beginCell()
            .store(this.storeOpcode(ProposalsBuilderOpCodes.REMOVE_PLUGIN))
            .storeAddress(pluginAddr)
        .asCell();
    }

    static buildCallPlugin(pluginAddr: Address, body: Cell) {
        beginCell()
            .store(this.storeOpcode(ProposalsBuilderOpCodes.CALL_PLUGIN))
            .storeAddress(pluginAddr)
            .storeRef(body);
    }

    static buildInstallPlugin(code: Cell, data: Cell | null = null, body: Cell | null = null) {
        return beginCell()
            .store(this.storeOpcode(ProposalsBuilderOpCodes.INSTALL_PLUGIN))
            .storeRef(code)
            .storeMaybeRef(data)
            .storeMaybeRef(body)
        .asCell();
    }

    static buildCallJettonBurn(amount: bigint, jettonWalletAddress: Address) {
        return beginCell()
            .store(this.storeOpcode(ProposalsBuilderOpCodes.CALL_JETTON_BURN))
            .storeCoins(amount)
            .storeAddress(jettonWalletAddress)
        .endCell()

    }

    static buildCallJettonTransfer(payload) {
        console.log(payload)
        return beginCell()
            .store(this.storeOpcode(ProposalsBuilderOpCodes.CALL_JETTON_TRANSFER))
            .endCell() // TODO CallJettonTransfer
    }

    static buildCallJettonMint(holders: Dictionary<Address, bigint>) {
        return beginCell()
            .store(this.storeOpcode(ProposalsBuilderOpCodes.CALL_JETTON_MINT))
            .storeDict(holders)
        .endCell()
    }
}