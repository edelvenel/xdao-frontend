import { Proposal } from 'pages/proposal-list/components/Proposal';
import { ScreenLoader } from 'pages/tech/sceen-loader';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useProposals } from 'shared/api/proposals';
import { IDao } from 'shared/types';
import css from './styles.module.scss';

interface IVotesTabProps {
	dao: IDao;
}

export function VotesTab({ dao }: IVotesTabProps) {
	const { proposals, fetchDaoProposals, hasMore } = useProposals();

	React.useEffect(() => {
		fetchDaoProposals(dao.address);
	}, [fetchDaoProposals, dao.address]);

	//TODO: get proposals with dao
	if (!dao) {
		return null;
	}

	return (
		<div className={css.tab}>
			<div className={css.list}>
				<InfiniteScroll
					className={css.list}
					dataLength={proposals.length}
					next={() => fetchDaoProposals(dao.address)}
					hasMore={hasMore}
					loader={<ScreenLoader />}
				>
					{proposals.map((proposal, index) => (
						<Proposal data={proposal} key={index} />
					))}
				</InfiniteScroll>
			</div>
		</div>
	);
}
