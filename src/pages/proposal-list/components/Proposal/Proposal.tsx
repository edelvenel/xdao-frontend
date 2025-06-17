import { routes } from 'app/router/routes';
import { compareAsc, formatDistance } from 'date-fns';
import React from 'react';
import { generatePath, Link } from 'react-router';
import { useProposals } from 'shared/api/proposals';
import { Icon } from 'shared/icons';
import { store } from 'shared/store';
import { IProposal, IVote, ProposalStatus } from 'shared/types';
import { Button } from 'shared/ui/Button';
import { formatNumber, getUserFriendlyAddress } from 'shared/utils/formatters';
import { getStatusVariant } from 'shared/utils/getStatusVariant';
import { Badge } from '../../../../shared/ui/Badge';
import css from './styles.module.scss';

interface IProposalProps {
	proposal: IProposal;
	isPending?: boolean;
}

export function Proposal({ proposal, isPending = false }: IProposalProps) {
	const formatDate = React.useMemo(
		() =>
			compareAsc(new Date(), proposal.endDate) === -1
				? formatDistance(new Date(), proposal.endDate, { includeSeconds: false })
				: 'expired',
		[proposal.endDate]
	);
	const [votes, setVotes] = React.useState<IVote[] | null>(null);
	const { token } = store.useAuth();
	const { walletAddress } = store.useWallet();
	const { fetchProposalVotes } = useProposals();

	const getUserVote = React.useCallback(() => {
		if (!votes || !walletAddress) {
			return null;
		}
		const vote = votes.find(
			(vote) => getUserFriendlyAddress(vote.walletAddress) === getUserFriendlyAddress(walletAddress)
		);
		if (vote) {
			return vote;
		}
		return null;
	}, [votes, walletAddress]);

	React.useEffect(() => {
		const fetchVotes = async () => {
			if (token !== null) {
				const votes = await fetchProposalVotes(token, proposal.dao.address, proposal.address);
				setVotes(votes);
			}
		};

		if (isPending) {
			const interval = setInterval(fetchVotes, 5000);

			return () => {
				clearInterval(interval);
			};
		} else {
			fetchVotes();
		}
	}, [fetchProposalVotes, isPending, proposal.address, proposal.dao.address, token]);

	const agree = (proposal.currentAmount / proposal.successAmount) * 100;

	return (
		<div className={css.proposal}>
			<div className={css.block}>
				<div className={css.column}>
					<div className={css.label}>Proposal name:</div>
					<div className={css.name}>{proposal.name}</div>
				</div>
				<Badge
					text={isPending ? ProposalStatus.Pending : proposal.status}
					variant={getStatusVariant(isPending ? ProposalStatus.Pending : proposal.status)}
				/>
			</div>
			<div className={css.block}>
				<div className={css.column}>
					<div className={css.label}>Description:</div>
					<div className={css.description}>{proposal.description}</div>
				</div>
			</div>
			<div className={css.block}>
				<div className={css.row}>
					<div className={css.label}>Consensus:</div>
					<div className={css.value}>{formatNumber(proposal.consensus)}%</div>
				</div>

				<div className={css.row}>
					<div className={css.label}>Ends:</div>
					<div className={css.value}>{formatDate}</div>
				</div>
			</div>

			<div className={css.blockVote}>
				{agree !== undefined && (
					<div className={css.vote}>
						<Icon.Common.Agree />
						<span>{formatNumber(agree)}%</span>
					</div>
				)}
				{agree === undefined && <div className={css.voteLoader} />}
				{getUserVote() === null && proposal.status === ProposalStatus.Active && !isPending && (
					<Link to={generatePath(routes.proposal, { proposalAddress: proposal.address })} className={css.button}>
						<Button>Vote</Button>
					</Link>
				)}
				{getUserVote() !== null && (
					<Link to={generatePath(routes.proposal, { proposalAddress: proposal.address })} className={css.button}>
						<Button className={css.voted} variant="secondary">
							<div className={css.votedIcon}>
								<Icon.Common.Agree />
							</div>
							<span className={css.votedText}>{`You voted`}</span>
						</Button>
					</Link>
				)}
				{getUserVote() === null && (proposal.status !== ProposalStatus.Active || isPending) && (
					<Link to={generatePath(routes.proposal, { proposalAddress: proposal.address })} className={css.button}>
						<Button className={css.voted} variant="secondary">
							Details
						</Button>
					</Link>
				)}
			</div>
		</div>
	);
}
