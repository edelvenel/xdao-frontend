import { TopContent } from 'app/navigation/components/top-content';
import { routes } from 'app/router/routes';
import debounce from 'lodash.debounce';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router';
import { useDaos } from 'shared/api/daos';
import { useProposals } from 'shared/api/proposals';
import { store } from 'shared/store';
import { ProposalFilter } from 'shared/types';
import { Filter } from 'shared/ui/Filter';
import { Modal } from 'shared/ui/Modal';
import { SearchBlock } from '../../shared/ui/SearchBlock';
import { PendingProposal } from './components/PendingProposal';
import { Proposal } from './components/Proposal';
import { ProposalLoader } from './components/ProposalLoader';
import css from './styles.module.scss';

export const ProposalListPage = React.memo(function ProposalListPage() {
	const [searchText, setSearchText] = React.useState<string | null>(null);
	const [isFilterOpen, setIsFilterOpen] = React.useState<boolean>(false);
	const [filter, setFilter] = React.useState<ProposalFilter>(ProposalFilter.AllProposals);
	const { proposals, pendingVotes, fetchProposals, pendingProposals, resetProposals, hasMore } = useProposals();
	const { daos } = store.useDaos();
	const { fetchDaos } = useDaos();

	const navigate = useNavigate();

	const { setIsMenuShown, setIsHeaderShown, setIsBackground } = store.useApp();

	const handleOnCreate = React.useCallback(() => {
		navigate(routes.createProposal);
	}, [navigate]);

	React.useEffect(() => {
		setIsHeaderShown(true);
		setIsMenuShown(true);
	}, [setIsHeaderShown, setIsMenuShown]);

	const fetchData = React.useCallback(() => {
		fetchDaos();
		fetchProposals(searchText ?? '', filter);
	}, [fetchDaos, fetchProposals, filter, searchText]);

	React.useEffect(() => {
		fetchData();
		const intervalId = setInterval(() => fetchData(), 5000);

		return () => {
			clearInterval(intervalId);
		};
	}, [fetchData]);

	React.useEffect(() => {
		if (proposals === null || proposals.length > 0) {
			setIsBackground(false);
		} else {
			setIsBackground(true);
		}
	}, [proposals, setIsBackground]);

	const handleOnSearch = React.useCallback(
		(text: string) => {
			resetProposals();
			fetchProposals(text ?? '', filter);
			if (text === '') {
				setSearchText(null);
			}
		},
		[fetchProposals, filter, resetProposals]
	);

	const handleOnApplyFilter = React.useCallback(
		(value: ProposalFilter) => {
			resetProposals();
			setFilter(value);
			fetchProposals(searchText ?? '', value);
		},
		[fetchProposals, resetProposals, searchText]
	);

	const debouncedResults = React.useMemo(() => {
		return debounce(handleOnSearch, 500);
	}, [handleOnSearch]);

	React.useEffect(() => {
		if (searchText !== null) {
			debouncedResults(searchText);
		}

		return () => {
			debouncedResults.cancel();
		};
	}, [debouncedResults, searchText]);

	return (
		<div className={css.page}>
			<div className={css.list}>
				{!proposals && (
					<>
						<ProposalLoader />
						<ProposalLoader />
					</>
				)}

				{proposals && proposals.length === 0 && <div className={css.placeholder}>No active votes yet</div>}
				{pendingProposals &&
					pendingProposals.map((proposal, index) => <PendingProposal key={index} proposal={proposal} />)}

				{proposals && (
					<InfiniteScroll
						dataLength={proposals.length}
						next={() => fetchProposals(searchText ?? '', filter)}
						hasMore={hasMore}
						className={css.list}
						loader={
							<>
								<ProposalLoader />
								<ProposalLoader />
							</>
						}
					>
						{proposals.map((proposal, index) => (
							<Proposal
								isPending={pendingVotes?.find((address) => address === proposal.address) !== undefined}
								proposal={proposal}
								key={index}
							/>
						))}
					</InfiniteScroll>
				)}
			</div>
			<TopContent>
				<SearchBlock
					searchText={searchText ?? ''}
					placeholder="Search proposals"
					isCreateShown={!!daos && daos.length > 0}
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
					onApply={handleOnApplyFilter}
					onClose={() => setIsFilterOpen(false)}
				/>
			</Modal>
		</div>
	);
});
