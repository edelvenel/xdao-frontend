import React from "react";
import { Proposal } from "./components/Proposal";
import { SearchBlock } from "./components/SearchBlock";
import css from "./styles.module.scss";

export const ProposalListPage = React.memo(function ProposalListPage() {
  return (
    <div className={css.page}>
      <Proposal />
      <SearchBlock />
    </div>
  );
});
