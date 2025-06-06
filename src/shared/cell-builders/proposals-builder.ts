import { Address, beginCell, Cell, Dictionary, toNano } from '@ton/core';
import { ICreateChangeDAONameProposalPayload, ICreateTransferGPProposalPayload } from 'shared/api/proposals/payloads';
import { JettonBuilder } from 'shared/cell-builders/common';
import { Builder } from './utils';

export enum ProposalsBuilderOpCodes {
	CALL_PLUGIN = 0x2cb6f6b6,
	INSTALL_PLUGIN = 0x940d1a56,
	REMOVE_PLUGIN = 0x48021b7e,
	CHANGE_SUCCESS_PERCENTAGE = 0xece13675,
	CALL_JETTON_MINT = 0xac867e8d,
	CALL_JETTON_TRANSFER = 0x9cdbcc7e,
	CALL_JETTON_BURN = 0xfacc90e8,
	CHANGE_METADATA = 0xe0ee28fa,
}

export class ProposalsBuilder extends Builder {
	static buildChangeSuccessPercentage(successPercentage: number) {
		return beginCell()
			.store(this.storeOpcode(ProposalsBuilderOpCodes.CHANGE_SUCCESS_PERCENTAGE))
			.storeUint(successPercentage, 14)
			.asCell();
	}

	static buildRemovePlugin(pluginAddr: Address) {
		return beginCell().store(this.storeOpcode(ProposalsBuilderOpCodes.REMOVE_PLUGIN)).storeAddress(pluginAddr).asCell();
	}

	static buildCallPlugin(pluginAddr: Address, body: Cell) {
		return beginCell()
			.store(this.storeOpcode(ProposalsBuilderOpCodes.CALL_PLUGIN))
			.storeAddress(pluginAddr)
			.storeRef(body)
			.asCell();
	}

	static buildInstallPlugin(code: Cell, data: Cell | null = null, body: Cell | null = null) {
		return beginCell()
			.store(this.storeOpcode(ProposalsBuilderOpCodes.INSTALL_PLUGIN))
			.storeRef(code)
			.storeMaybeRef(data)
			.storeMaybeRef(body)
			.asCell();
	}

	static buildCallJettonBurn(jettonWalletAddress: Address, ownerAddress: Address, amount: number) {
		return beginCell()
			.store(this.storeOpcode(ProposalsBuilderOpCodes.CALL_JETTON_BURN))
			.storeCoins(amount)
			.storeAddress(jettonWalletAddress)
			.storeAddress(ownerAddress)
			.endCell();
	}

	static buildCallJettonTransfer(
		payload: ICreateTransferGPProposalPayload,
		fromJettonWalletAddress: Address,
		fromJettonWalletOwnerAddress: Address
	) {
		const toWalletAddress = Address.parse(payload.toWalletAddress);
		const transfer_data = beginCell()
			.storeCoins(toNano(payload.tokenAmount))
			.storeAddress(toWalletAddress) // destination
			.storeAddress(toWalletAddress) // response_destination
			.storeCoins(1) // forward_amount (1 nTON to simplify job for indexers)
			.storeBit(false)
			.endCell();
		return beginCell()
			.store(this.storeOpcode(ProposalsBuilderOpCodes.CALL_JETTON_TRANSFER))
			.storeAddress(fromJettonWalletAddress)
			.storeAddress(fromJettonWalletOwnerAddress)
			.storeRef(transfer_data)
			.endCell();
	}

	static buildCallJettonMint(holders: Dictionary<Address, bigint>) {
		return beginCell().store(this.storeOpcode(ProposalsBuilderOpCodes.CALL_JETTON_MINT)).storeDict(holders).endCell();
	}

	static buildChangeMetadata(payload: ICreateChangeDAONameProposalPayload) {
		const content = JettonBuilder.buildOnchainMetadata({
			name: payload.newName,
			symbol: payload.newName, // TODO: daoTokenSymbol
			description: payload.newName, // TODO: daoDescription
			image: 'https://ton.org/download/ton_symbol.png',
			decimals: '9',
		});
		return beginCell().store(this.storeOpcode(ProposalsBuilderOpCodes.CHANGE_METADATA)).storeRef(content).endCell();
	}
}
