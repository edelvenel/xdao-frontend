import { ProposalFilter } from 'shared/types';

export const getProposalFilterFromStorage = () => {
	const filter = localStorage.getItem('proposals_filter');
	if (filter) {
		const enumFilterValue = Object.values(ProposalFilter).find((value) => value === filter);
		return enumFilterValue ?? ProposalFilter.AllProposals;
	}
	return ProposalFilter.AllProposals;
};
