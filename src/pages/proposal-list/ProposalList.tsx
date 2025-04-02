import { routes } from "app/router/routes";
import React from "react";
import { useNavigate } from "react-router";
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
  const [searchText, setSearchText] = React.useState<string>("");
  const [isFilterOpen, setIsFilterOpen] = React.useState<boolean>(false);
  const [filter, setFilter] = React.useState<number>(0);

  const navigate = useNavigate();

  const handleOnCreate = React.useCallback(() => {
    navigate(routes.createProposal);
  }, [navigate]);

  console.log(searchText);

  return (
    <div className={css.page}>
      <Proposal />
      <SearchBlock
        onChange={setSearchText}
        onFilter={() => setIsFilterOpen(true)}
        onCreate={handleOnCreate}
      />
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
