import { routes } from 'app/router/routes';
import { formatDistance } from 'date-fns';
import { ScreenLoader } from 'pages/tech/sceen-loader';
import React from 'react';
import { generatePath, Link } from 'react-router';
import { getDao } from 'shared/api/daos/methods';
import { getDaoProposalVotes } from 'shared/api/proposals/methods';
import { Icon } from 'shared/icons';
import { store } from 'shared/store';
import { IDao, IProposal, IVote } from 'shared/types';
import { Button } from 'shared/ui/Button';
import { getStatusVariant } from 'shared/utils/getStatusVariant';
import { Badge } from '../../../../shared/ui/Badge';
import css from './styles.module.scss';

interface IProposalProps {
	proposal: IProposal;
}

export function Proposal({ proposal }: IProposalProps) {
	const formatDate = formatDistance(new Date(), proposal.endDate, { includeSeconds: false });
	const [votes, setVotes] = React.useState<IVote[] | null>(null);
	const [dao, setDao] = React.useState<IDao | null>(null);
	const { token } = store.useAuth();

	React.useEffect(() => {
		const fetchVotes = async () => {
			if (token !== null) {
				const votes = await getDaoProposalVotes(token, proposal.daoAddress, proposal.address);
				setVotes(votes);
			}
		};
		const fetchDao = async () => {
			if (token !== null) {
				const dao = await getDao(token, proposal.daoAddress);
				setDao(dao);
			}
		};
		fetchVotes();
		fetchDao();
	}, [proposal.daoAddress, proposal.address, token]);

	if (votes === null || dao === null) {
		return <ScreenLoader />;
	}
	const agree = votes.reduce((acc, curr) => acc + curr.impact, 0);

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
					<div className={css.value}>{(proposal.consensus / Number(dao?.LPTokens)) * 100}%</div>
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
				{proposal.userVote === null && (
					<Link to={generatePath(routes.proposal, { proposalAddress: proposal.address })} className={css.button}>
						<Button>Vote</Button>
					</Link>
				)}
				{proposal.userVote !== null && (
					<Link to={generatePath(routes.proposal, { proposalAddress: proposal.address })} className={css.button}>
						<Button className={css.voted} variant="secondary">
							<div className={css.votedIcon}>
								<Icon.Common.Agree />
							</div>
							<span className={css.votedText}>{`You voted: ${proposal.userVote.label}`}</span>
						</Button>
					</Link>
				)}
			</div>
		</div>
	);
}
