import { routes } from 'app/router/routes';
import { Proposal } from 'pages/proposal-list/components/Proposal';
import { ProposalLoader } from 'pages/proposal-list/components/ProposalLoader';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router';
import { useProposals } from 'shared/api/proposals';
import { store } from 'shared/store';
import { IDao } from 'shared/types';
import { Button } from 'shared/ui/Button';
import css from './styles.module.scss';

interface IVotesTabProps {
	dao?: IDao;
}

export function VotesTab({ dao }: IVotesTabProps) {
	const { proposals, fetchDaoProposals, hasMore } = useProposals();
	const { setIsBackground } = store.useApp();
	const { setDao } = store.useFormType();

	const navigate = useNavigate();

	React.useEffect(() => {
		if (dao) {
			fetchDaoProposals(dao.address);
		}
	}, [fetchDaoProposals, dao, dao?.address]);

	React.useEffect(() => {
		if (proposals?.length === 0) {
			setIsBackground(true);
		} else {
			setIsBackground(false);
		}
	}, [proposals?.length, setIsBackground]);

	const handleOnClick = React.useCallback(() => {
		setDao(dao ?? null);
		navigate(routes.createProposal);
	}, [dao, navigate, setDao]);

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
							<Proposal proposal={proposal} key={index} />
						))}
					</InfiniteScroll>
				)}
				{(!proposals || !dao) && (
					<>
						<ProposalLoader />
						<ProposalLoader />
					</>
				)}
				{dao && proposals && proposals.length === 0 && (
					<div className={css.block}>
						<div className={css.placeholder}>No active votes</div>
						<div className={css.button}>
							<Button variant="primary" onClick={handleOnClick}>
								Create
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
