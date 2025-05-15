import { TopContent } from 'app/navigation/components/top-content';
import { routes } from 'app/router/routes';
import { ScreenLoader } from 'pages/tech/sceen-loader';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router';
import { useProposals } from 'shared/api/proposals';
import { store } from 'shared/store';
import { ProposalFilter } from 'shared/types';
import { Modal } from 'shared/ui/Modal';
import { Filter } from './components/Filter';
import { Proposal } from './components/Proposal';
import { SearchBlock } from './components/SearchBlock';
import css from './styles.module.scss';

export const ProposalListPage = React.memo(function ProposalListPage() {
	const [searchText, setSearchText] = React.useState<string>('');
	const [isFilterOpen, setIsFilterOpen] = React.useState<boolean>(false);
	const [filter, setFilter] = React.useState<ProposalFilter>(ProposalFilter.AllProposals);
	const { proposals, fetchProposals, hasMore } = useProposals();

	const navigate = useNavigate();

	const { setIsMenuShown, setIsHeaderShown, setIsBackground } = store.useApp();

	const handleOnCreate = React.useCallback(() => {
		navigate(routes.createProposal);
	}, [navigate]);

	React.useEffect(() => {
		setIsHeaderShown(true);
		setIsMenuShown(true);
	}, [setIsHeaderShown, setIsMenuShown]);

	React.useEffect(() => {
		fetchProposals();
	}, [fetchProposals]);

	React.useEffect(() => {
		if (proposals.length > 0) {
			setIsBackground(false);
		} else {
			setIsBackground(true);
		}
	}, [proposals.length, setIsBackground]);

	return (
		<div className={css.page}>
			<div className={css.list}>
				{proposals.length === 0 && <div className={css.placeholder}>No active votes</div>}
				<InfiniteScroll
					dataLength={proposals.length}
					next={fetchProposals}
					hasMore={hasMore}
					className={css.list}
					loader={<ScreenLoader />}
				>
					{proposals.map((proposal, index) => (
						<Proposal data={proposal} key={index} />
					))}
				</InfiniteScroll>
			</div>
			<TopContent>
				<SearchBlock
					searchText={searchText}
					onChange={setSearchText}
					onFilter={() => setIsFilterOpen(true)}
					onCreate={handleOnCreate}
				/>
			</TopContent>

			<Modal isOpen={isFilterOpen} title="Filter" onClose={() => setIsFilterOpen(false)}>
				<Filter
					selected={filter}
					options={Object.values(ProposalFilter)}
					mapper={(value) => {
						const result = Object.entries(ProposalFilter).find((entry) => entry[1] === value);
						if (result) {
							return result[1];
						}
						return ProposalFilter.AllProposals;
					}}
					onApply={setFilter}
					onClose={() => setIsFilterOpen(false)}
				/>
			</Modal>
		</div>
	);
});
