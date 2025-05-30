import { IOptionWithNote, ProposalFilter, ProposalKey, ProposalType } from 'shared/types';

export const API_URL = import.meta.env.VITE_API_URL;
export const TON_API_URL = import.meta.env.VITE_TON_API_URL;
export const TON_API_TOKEN = import.meta.env.VITE_TON_API_TOKEN;
export const TOAST_DURATION = 5000;
export const PENDING_EXPIRATION_DURATION = 20 * 60 * 1000;

export const TOKENS: IOptionWithNote[] = [
	{ id: 1, value: 'GP', note: 'only GP holders can vote' },
	{ id: 2, value: 'LP' },
	{ id: 3, value: 'Custom token' },
];

export const VOTING_TYPES: string[] = ['One wallet = one vote', 'Proportional to token amount'];

export const proposalTypeMapper = {
	[ProposalKey.CallJettonMint]: ProposalType.AddGP,
	[ProposalKey.CallJettonBurn]: ProposalType.RemoveGP,
	[ProposalKey.CallJettonTransfer]: ProposalType.TransferGPTokens,
	[ProposalKey.ChangeTransferStatus]: ProposalType.ChangeGPTransferStatus,
	[ProposalKey.ChangeSuccessPercentage]: ProposalType.ChangeGeneralConsensus,
	[ProposalKey.CallPlugin]: ProposalType.SendDAOFunds,
	[ProposalKey.ChangeMetadata]: ProposalType.ChangeDAOName,
	// ['']: ProposalTypes[7],
};

export const proposalNameMapper = {
	[ProposalType.AddGP]: 'Add General Partner',
	[ProposalType.RemoveGP]: 'Remove General Partner',
	[ProposalType.TransferGPTokens]: 'Transfer GP Tokens',
	[ProposalType.ChangeGPTransferStatus]: 'Change GP Transfer Status',
	[ProposalType.ChangeGeneralConsensus]: 'Change General Consensus',
	[ProposalType.SendDAOFunds]: 'Send DAO Funds',
	[ProposalType.ChangeDAOName]: 'Change DAO Name',
};

export const proposalTypeOptions = [
	ProposalType.AddGP,
	ProposalType.RemoveGP,
	ProposalType.TransferGPTokens,
	ProposalType.ChangeGeneralConsensus,
	ProposalType.SendDAOFunds,
	ProposalType.ChangeDAOName,
];

export const proposalFilterMapp = {
	[ProposalFilter.AllProposals]: 'all',
	[ProposalFilter.Active]: 'active',
	[ProposalFilter.Executed]: 'executed',
	[ProposalFilter.Rejected]: 'rejected',
};
