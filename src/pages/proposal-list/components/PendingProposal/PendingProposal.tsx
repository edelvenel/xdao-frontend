import { IPendingProposal } from 'shared/types';
import { Badge } from 'shared/ui/Badge';
import css from './styles.module.scss';

interface IPendingProposalProps {
	proposal: IPendingProposal;
}

export function PendingProposal({ proposal }: IPendingProposalProps) {
	return (
		<div className={css.pendingProposal}>
			<div className={css.block}>
				<div className={css.column}>
					<div className={css.label}>Proposal name:</div>
					<div className={css.name}>{proposal.name}</div>
				</div>
				<Badge text={'pending'} variant={'blue'} />
			</div>
			<div className={css.block}>
				<div className={css.column}>
					<div className={css.label}>Description:</div>
					<div className={css.description}>{proposal.description}</div>
				</div>
			</div>
		</div>
	);
}
