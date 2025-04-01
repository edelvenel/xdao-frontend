import cn from "classnames";
import { Icon } from "shared/icons";
import { Button } from "shared/ui/Button";
import { Badge } from "../Badge";
import css from "./styles.module.scss";

export function Proposal() {
  return (
    <div className={css.proposal}>
      <div className={css.block}>
        <div className={css.column}>
          <div className={css.label}>Proposal name:</div>
          <div className={css.name}>Add new GP - Bob</div>
        </div>
        <div className={css.badge}>
          <Badge status={"active"} />
        </div>
      </div>
      <div className={css.block}>
        <div className={css.column}>
          <div className={css.label}>Description:</div>
          <div className={css.description}>
            Let’s remove Bob, he’s out of our team anymore
          </div>
        </div>
      </div>
      <div className={css.blockConsensus}>
        <div className={css.row}>
          <div className={css.label}>Consensus:</div>
          <div className={css.value}>51%</div>
        </div>

        <div className={css.row}>
          <div className={css.label}>Ends:</div>
          <div className={css.value}>3 days</div>
        </div>
      </div>

      <div className={css.blockVote}>
        <div className={cn(css.agree, css.vote)}>
          <div className={css.icon}>
            <Icon.Common.Agree />
          </div>
          <span>45%</span>
        </div>
        <div className={cn(css.disagree, css.vote)}>
          <div className={css.icon}>
            <Icon.Common.Disagree />
          </div>
          <span>25%</span>
        </div>
        <Button onClick={() => {}}>Vote</Button>
      </div>
    </div>
  );
}
