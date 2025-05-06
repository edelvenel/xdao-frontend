import { routes } from 'app/router/routes';
import { formatDistance } from 'date-fns';
import { generatePath, Link } from 'react-router';
import { Icon } from 'shared/icons';
import { IProposal } from 'shared/types';
import { Button } from 'shared/ui/Button';
import { getStatusVariant } from 'shared/utils/getStatusVariant';
import { Badge } from '../../../../shared/ui/Badge';
import css from './styles.module.scss';

interface IProposalProps {
	data: IProposal;
}

export function Proposal({ data }: IProposalProps) {
	const formatDate = formatDistance(new Date(), data.endDate, { includeSeconds: false });
	const agree = data.votes.agree.reduce((acc, curr) => acc + curr.impact, 0);

	return (
		<div className={css.proposal}>
			<div className={css.block}>
				<div className={css.column}>
					<div className={css.label}>Proposal name:</div>
					<div className={css.name}>{data.name}</div>
				</div>
				<Badge text={data.status.label} variant={getStatusVariant(data.status.id)} />
			</div>
			<div className={css.block}>
				<div className={css.column}>
					<div className={css.label}>Description:</div>
					<div className={css.description}>{data.description}</div>
				</div>
			</div>
			<div className={css.block}>
				<div className={css.row}>
					<div className={css.label}>Consensus:</div>
					<div className={css.value}>{data.consensus}%</div>
				</div>

				<div className={css.row}>
					<div className={css.label}>Ends:</div>
					<div className={css.value}>{formatDate}</div>
				</div>
			</div>

			<div className={css.blockVote}>
				<div className={css.vote}>
					<Icon.Common.Agree />
					<span>{agree}%</span>
				</div>
				{data.userVote === null && (
					<Link to={generatePath(routes.proposal, { id: data.id })} className={css.button}>
						<Button>Vote</Button>
					</Link>
				)}
				{data.userVote !== null && (
					<Link to={generatePath(routes.proposal, { id: data.id })} className={css.button}>
						<Button className={css.voted} variant="secondary">
							<div className={css.votedIcon}>
								<Icon.Common.Agree />
							</div>
							<span className={css.votedText}>{`You voted: ${data.userVote.label}`}</span>
						</Button>
					</Link>
				)}
			</div>
		</div>
	);
}
