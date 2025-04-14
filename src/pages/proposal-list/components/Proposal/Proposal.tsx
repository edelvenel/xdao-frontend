import { routes } from "app/router/routes";
import cn from "classnames";
import { generatePath, Link } from "react-router";
import { Icon } from "shared/icons";
import { IProposal } from "shared/types";
import { Button } from "shared/ui/Button";
import { Badge } from "../../../../shared/ui/Badge";
import css from "./styles.module.scss";

interface IProposalProps {
  data: IProposal;
}

export function Proposal({ data }: IProposalProps) {
  return (
    <div className={css.proposal}>
      <div className={css.block}>
        <div className={css.column}>
          <div className={css.label}>Proposal name:</div>
          <div className={css.name}>{data.name}</div>
        </div>
        <Badge text="active" variant="yellow" />
      </div>
      <div className={css.block}>
        <div className={css.column}>
          <div className={css.label}>Description:</div>
          <div className={css.description}>{data.description}</div>
        </div>
      </div>
      <div className={css.block}>
        <div className={css.row}>
          <div className={css.label}>Consensus:</div>
          <div className={css.value}>{data.consensus}%</div>
        </div>

        <div className={css.row}>
          <div className={css.label}>Ends:</div>
          <div className={css.value}>{data.endDate.toDateString()}</div>
        </div>
      </div>

      <div className={css.blockVote}>
        <div className={cn(css.agree, css.vote)}>
          <Icon.Common.Agree />
          <span>{data.votes.agree}%</span>
        </div>
        <div className={cn(css.disagree, css.vote)}>
          <Icon.Common.Disagree />
          <span>{data.votes.disagree}%</span>
        </div>
        <Link
          to={generatePath(routes.proposal, { id: data.id })}
          className={css.button}
        >
          <Button>Vote</Button>
        </Link>
      </div>
    </div>
  );
}
