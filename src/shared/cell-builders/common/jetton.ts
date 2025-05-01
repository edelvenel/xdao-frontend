import { Address, beginCell, Cell, Dictionary } from "@ton/core";
import { Builder } from "../utils";
import { createHash } from "crypto";

enum JettonOpCodes {
    TRANSFER = 0xf8a7ea5,
    BURN = 0x48021b7e,
    MINT = 0x642b7d07,
}

const sha256 = (str: string) => {
    return createHash('sha256').update(str).digest();
};
  
const ONCHAIN_CONTENT_PREFIX = 0x00;
const SNAKE_PREFIX = 0x00;
  
export type JettonMetaDataKeys =
    | 'name'
    | 'description'
    | 'image'
    | 'symbol'
    | 'decimals'
    | 'uri';
  
const jettonOnChainMetadataSpec: {
    [key in JettonMetaDataKeys]: 'utf8' | 'ascii';
} = {
    name: 'utf8',
    description: 'utf8',
    image: 'ascii',
    decimals: 'utf8',
    symbol: 'utf8',
    uri: 'ascii',
};

export type JettonOnchainMetadata = Cell;

type JettonTransferPayload = {
    queryId?: number;
    amount: bigint | number;
    destination: Address;
    responseDestination: Address;
    customPayload?: Cell;
    forwardTonAmount?: bigint | number;
    forwardPayload?: Cell;
}

type JettonMintPayload = {
    queryId?: number;
    amount: bigint | number;
    fromAddress: Address;
    responseDestination: Address;
    forwardTonAmount?: bigint | number;
    forwardPayload?: Cell;
}

type JettonBurnPayload = {
    queryId?: number;
    amount: bigint | number;
    responseDestination: Address;
    customPayload?: Cell;
}

// implements https://github.com/ton-blockchain/TEPs/blob/master/text/0074-jettons-standard.md (and mint for governed jettons)
export class JettonBuilder extends Builder {
    static buildOnchainMetadata(data: {
        [key: string]: string | undefined;
      }): JettonOnchainMetadata {
        const dict = Dictionary.empty(
          Dictionary.Keys.Buffer(32),
          Dictionary.Values.Cell()
        );
      
        Object.entries(data).forEach(([key, value]) => {
          if (!jettonOnChainMetadataSpec[key as JettonMetaDataKeys])
            throw new Error(`Unsupported onchain key: ${key}`);
          if (!value) return;
      
          let bufferToStore = Buffer.from(
            value,
            jettonOnChainMetadataSpec[key as JettonMetaDataKeys]
          );
          const CELL_MAX_SIZE_BYTES = Math.floor((1023 - 8) / 8);
      
          const rootCell = beginCell();
          rootCell.storeUint(SNAKE_PREFIX, 8);
          let currentCell = rootCell;
      
          while (bufferToStore.length > 0) {
            currentCell.storeBuffer(bufferToStore.slice(0, CELL_MAX_SIZE_BYTES));
            bufferToStore = bufferToStore.slice(CELL_MAX_SIZE_BYTES);
            if (bufferToStore.length > 0) {
              const newCell = beginCell();
              currentCell.storeRef(newCell.endCell());
              currentCell = newCell;
            }
          }
      
          dict.set(sha256(key), rootCell.endCell());
        });
      
        return beginCell()
          .storeUint(ONCHAIN_CONTENT_PREFIX, 8)
          .storeDict(dict)
          .endCell();
    }
      


    /* 
        transfer#0f8a7ea5 query_id:uint64 amount:(VarUInteger 16) destination:MsgAddress
            response_destination:MsgAddress custom_payload:(Maybe ^Cell)
            forward_ton_amount:(VarUInteger 16) forward_payload:(Either Cell ^Cell)
            = InternalMsgBody;
    */
    static buildJettonTransfer(payload: JettonTransferPayload) {
        return beginCell()
            .store(this.storeOpcode(JettonOpCodes.TRANSFER))
            .storeUint(payload.queryId ?? this.getQueryId(), 64)
            .storeCoins(payload.amount)
            .storeAddress(payload.destination)
            .storeAddress(payload.responseDestination)
            .storeMaybeRef(payload.customPayload)
            .storeCoins(payload.forwardTonAmount ?? 1n)
            .storeMaybeRef(payload.forwardPayload)
        .endCell();
    }

    /*
        burn#595f07bc query_id:uint64 amount:(VarUInteger 16)
            response_destination:MsgAddress custom_payload:(Maybe ^Cell)
            = InternalMsgBody;
    */
    static buildJettonBurn(
        payload: JettonBurnPayload
    ) {
        return beginCell()
            .store(this.storeOpcode(JettonOpCodes.BURN))
            .storeUint(payload.queryId ?? this.getQueryId(), 64)
            .storeCoins(payload.amount)
            .storeAddress(payload.responseDestination)
            .storeMaybeRef(payload.customPayload)
        .endCell();
    }

    static buildJettonMint(
        payload: JettonMintPayload
    ) {
        return beginCell()
            .store(this.storeOpcode(JettonOpCodes.MINT))
            .storeUint(payload.queryId ?? this.getQueryId(), 64)
            .storeCoins(payload.amount)
            .storeAddress(payload.fromAddress)
            .storeAddress(payload.responseDestination)
            .storeCoins(payload.forwardTonAmount ?? 1n)
            .storeMaybeRef(payload.forwardPayload)
        .endCell();
    }
}