import { beginCell, Cell, Writable, Builder as TCBuilder } from "@ton/core";
import randombytes from "randombytes";

// utility class for building cells
export class Builder {
    protected static getQueryId() {
        return BigInt(randombytes(8).toString("hex"));
    }

    protected static buildWithRef(opCode: bigint | number, ref: Cell) {
        return beginCell()
            .storeUint(opCode, 32)
            .storeRef(ref)
        .asCell();
    }

    protected static storeOpcode(opCode: bigint | number): ((builder: TCBuilder) => void | Writable) {
        return (builder: TCBuilder) => {
            builder.storeUint(opCode, 32)
        }
    }

    protected static storeQueryId(): ((builder: TCBuilder) => void | Writable) {
        return (builder: TCBuilder) => {
            builder.storeUint(this.getQueryId(), 64)
        }
    }
}