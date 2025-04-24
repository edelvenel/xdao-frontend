import { Proposal } from "pages/proposal-list/components/Proposal";
import React from "react";
import { useProposals } from "shared/api/proposals";
import { IDao } from "shared/types";
import css from "./styles.module.scss";

interface IVotesTabProps {
  dao: IDao;
}

export function VotesTab({ dao }: IVotesTabProps) {
  const { proposals, fetchProposals } = useProposals();

  React.useEffect(() => {
    fetchProposals();
  }, [fetchProposals]);

  //TODO: get proposals with dao
  if (!dao) {
    return null;
  }

  return (
    <div className={css.tab}>
      <div className={css.list}>
        {proposals.map((proposal, index) => (
          <Proposal data={proposal} key={index} />
        ))}
      </div>
    </div>
  );
}
