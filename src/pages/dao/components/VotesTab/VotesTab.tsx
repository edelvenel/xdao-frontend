import { Proposal } from 'pages/proposal-list/components/Proposal';
import { ProposalLoader } from 'pages/proposal-list/components/ProposalLoader';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useProposals } from 'shared/api/proposals';
import { IDao } from 'shared/types';
import css from './styles.module.scss';

interface IVotesTabProps {
	dao?: IDao;
}

export function VotesTab({ dao }: IVotesTabProps) {
	const { proposals, fetchDaoProposals, hasMore } = useProposals();

	React.useEffect(() => {
		if (dao) {
			fetchDaoProposals(dao.address);
		}
	}, [fetchDaoProposals, dao, dao?.address]);

	return (
		<div className={css.tab}>
			<div className={css.list}>
				{dao && proposals && (
					<InfiniteScroll
						className={css.list}
						dataLength={proposals.length}
						next={() => fetchDaoProposals(dao.address)}
						hasMore={hasMore}
						loader={
							<>
								<ProposalLoader />
								<ProposalLoader />
							</>
						}
					>
						{proposals.map((proposal, index) => (
							<Proposal data={proposal} key={index} />
						))}
					</InfiniteScroll>
				)}
				{(!proposals || !dao) && (
					<>
						<ProposalLoader />
						<ProposalLoader />
					</>
				)}
				{dao && proposals && proposals.length === 0 && <div className={css.placeholder}>No active votes</div>}
			</div>
		</div>
	);
}
