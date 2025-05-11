import { Address, Contract, ContractProvider } from "@ton/core";

export class DAOFactoryContract implements Contract {
    constructor(
        readonly address: Address,
    ) {}
 
    static createFromAddress(address: Address): DAOFactoryContract {
        return new DAOFactoryContract(address);
    }
    
    async getServiceFee(provider: ContractProvider): Promise<bigint> {
        const res = await provider.get('get_service_fee', [])
        return res.stack.readBigNumber()
    }
}
