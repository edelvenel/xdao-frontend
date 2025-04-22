import { Proposal } from "pages/proposal-list/components/Proposal";
import { IDao, PROPOSALS } from "shared/types";
import css from "./styles.module.scss";

interface IVotesTabProps {
  dao: IDao;
}

export function VotesTab({ dao }: IVotesTabProps) {
  //TODO: get proposals with dao
  if (!dao) {
    return null;
  }

  return (
    <div className={css.tab}>
      <div className={css.list}>
        {PROPOSALS.map((proposal, index) => (
          <Proposal data={proposal} key={index} />
        ))}
      </div>
    </div>
  );
}
