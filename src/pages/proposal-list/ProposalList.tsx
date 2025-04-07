import { TopContent } from "app/navigation/components/top-content";
import { routes } from "app/router/routes";
import React from "react";
import { useNavigate } from "react-router";
import { store } from "shared/store";
import { Modal } from "shared/ui/Modal";
import { Filter } from "./components/Filter";
import { Proposal } from "./components/Proposal";
import { SearchBlock } from "./components/SearchBlock";
import css from "./styles.module.scss";

const FILTER_OPTIONS: string[] = [
  "All proposals",
  "Active",
  "Pending",
  "Executed",
  "Rejected",
  "My Proposals",
];

export const ProposalListPage = React.memo(function ProposalListPage() {
  // const [searchText, setSearchText] = React.useState<string>("");
  const [isFilterOpen, setIsFilterOpen] = React.useState<boolean>(false);
  const [filter, setFilter] = React.useState<number>(0);

  const navigate = useNavigate();

  const { setIsMenuShown, setIsHeaderShown, setIsBackground } = store.useApp();
  //TODO: if proposal list is empty change isBackground = true, else - isBackground = false

  const handleOnCreate = React.useCallback(() => {
    navigate(routes.createProposal);
  }, [navigate]);

  React.useEffect(() => {
    setIsBackground(false);
    setIsHeaderShown(true);
    setIsMenuShown(true);
  }, [setIsBackground, setIsHeaderShown, setIsMenuShown]);

  return (
    <div className={css.page}>
      <div className={css.list}>
        <Proposal key={1} />
        <Proposal key={2} />
        <Proposal key={3} />
      </div>
      <TopContent>
        <SearchBlock
          onChange={() => {}}
          onFilter={() => setIsFilterOpen(true)}
          onCreate={handleOnCreate}
        />
      </TopContent>
      {isFilterOpen && (
        <Modal title="Filter" onClose={() => setIsFilterOpen(false)}>
          <Filter
            selected={filter}
            options={FILTER_OPTIONS}
            onApply={setFilter}
            onClose={() => setIsFilterOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
});
