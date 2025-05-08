import { TopContent } from "app/navigation/components/top-content";
import { routes } from "app/router/routes";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router";
import { useProposals } from "shared/api/proposals";
import { store } from "shared/store";
import { Modal } from "shared/ui/Modal";
import { Filter } from "./components/Filter";
import { Proposal } from "./components/Proposal";
import { SearchBlock } from "./components/SearchBlock";
import css from "./styles.module.scss";

const FILTER_OPTIONS: string[] = ['All proposals', 'Active', 'Pending', 'Executed', 'Rejected', 'My Proposals'];

export const ProposalListPage = React.memo(function ProposalListPage() {
  const [searchText, setSearchText] = React.useState<string>("");
  const [isFilterOpen, setIsFilterOpen] = React.useState<boolean>(false);
  const [filter, setFilter] = React.useState<number>(0);
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
        <InfiniteScroll 
          dataLength={proposals.length}
          next={fetchProposals}
          hasMore={hasMore}
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
				<Filter selected={filter} options={FILTER_OPTIONS} onApply={setFilter} onClose={() => setIsFilterOpen(false)} />
			</Modal>
		</div>
	);
});
