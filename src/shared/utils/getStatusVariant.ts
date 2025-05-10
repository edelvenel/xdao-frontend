import { ProposalStatus } from "shared/types";

export const getStatusVariant = (status: ProposalStatus): 'yellow' | 'blue' => {
	switch (status) {
		case ProposalStatus.Active: {
			return 'yellow';
		}
		case ProposalStatus.Pending: {
			return 'blue';
		}

		case ProposalStatus.Executed: {
			return 'blue';
		}

		case ProposalStatus.Rejected: {
			return 'blue';
		}
		default:
			return 'yellow';
	}
};
