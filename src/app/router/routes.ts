export enum Route {
	Root = 'root',
	Proposal = 'proposal',
	CreateProposal = 'createProposal',
	CreateProposalForm = 'createProposalForm',
	ProposalList = 'proposalList',
	Profile = 'profile',
	Nft = 'nft',
	Dao = 'dao',
	DaoList = 'daoList',
	CreateDao = 'createDao',
	NotFound = 'notfound',
}

export const routes = {
	[Route.Root]: '/',

	[Route.Proposal]: '/proposals/:id',

	[Route.CreateProposal]: '/proposals/create',

	[Route.CreateProposalForm]: '/proposals/create/form',

	[Route.ProposalList]: '/proposals',

	[Route.Profile]: '/profile',

	[Route.Nft]: '/nft/:id',

	[Route.Dao]: '/daos/:id/:tab',

	[Route.DaoList]: '/daos',

	[Route.CreateDao]: '/daos/create',

	[Route.NotFound]: '/notfound',
} as const;
