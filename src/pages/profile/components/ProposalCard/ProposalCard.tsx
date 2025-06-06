import { routes } from 'app/router/routes';
import { generatePath, Link } from 'react-router';
import { IProposal } from 'shared/types';
import { Badge } from 'shared/ui/Badge';
import { getStatusVariant } from 'shared/utils/getStatusVariant';
import css from './styles.module.scss';

interface IProposalCardProps {
	proposal: IProposal;
}

export function ProposalCard({ proposal }: IProposalCardProps) {
	return (
		<Link to={generatePath(routes.proposal, { proposalAddress: proposal.address })} className={css.proposalCard}>
			<div className={css.column}>
				<div className={css.label}>Proposal name:</div>
				<div className={css.name}>{proposal.name}</div>
			</div>
			<Badge text={proposal.status} variant={getStatusVariant(proposal.status)} />
		</Link>
	);
}
