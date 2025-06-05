import { routes } from 'app/router/routes';
import { compareAsc, formatDistance } from 'date-fns';
import { ScreenLoader } from 'pages/tech/sceen-loader';
import React from 'react';
import { generatePath, Link } from 'react-router';
import { getDaoProposalVotes } from 'shared/api/proposals/methods';
import { Icon } from 'shared/icons';
import { store } from 'shared/store';
import { IProposal, IVote } from 'shared/types';
import { Button } from 'shared/ui/Button';
import { getUserFriendlyAddress } from 'shared/utils/formatters';
import { getStatusVariant } from 'shared/utils/getStatusVariant';
import { Badge } from '../../../../shared/ui/Badge';
import css from './styles.module.scss';

interface IProposalProps {
	proposal: IProposal;
}

export function Proposal({ proposal }: IProposalProps) {
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
				const votes = await getDaoProposalVotes(token, proposal.dao.address, proposal.address);
				setVotes(votes);
			}
		};

		fetchVotes();
	}, [proposal.address, proposal.dao.address, token]);

	if (votes === null) {
		return <ScreenLoader />;
	}
	const agree = votes.reduce((acc, curr) => acc + curr.impact / 10 ** 7, 0);

	return (
		<div className={css.proposal}>
			<div className={css.block}>
				<div className={css.column}>
					<div className={css.label}>Proposal name:</div>
					<div className={css.name}>{proposal.name}</div>
				</div>
				<Badge text={proposal.status} variant={getStatusVariant(proposal.status)} />
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
					<div className={css.value}>{proposal.dao.consensus.toFixed(2)}%</div>
				</div>

				<div className={css.row}>
					<div className={css.label}>Ends:</div>
					<div className={css.value}>{formatDate}</div>
				</div>
			</div>

			<div className={css.blockVote}>
				<div className={css.vote}>
					<Icon.Common.Agree />
					<span>{agree.toFixed(2)}%</span>
				</div>
				{getUserVote() === null && (
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
			</div>
		</div>
	);
}
