import cn from "classnames";
import toast from "react-hot-toast";
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
        <Badge text="active" variant="yellow" />
      </div>
      <div className={css.block}>
        <div className={css.column}>
          <div className={css.label}>Description:</div>
          <div className={css.description}>
            Let’s remove Bob, he’s out of our team anymore
          </div>
        </div>
      </div>
      <div className={css.block}>
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
          <Icon.Common.Agree />
          <span>45%</span>
        </div>
        <div className={cn(css.disagree, css.vote)}>
          <Icon.Common.Disagree />
          <span>25%</span>
        </div>
        <div className={css.button}>
          <Button onClick={() => toast.error("Uniplemented")}>Vote</Button>
        </div>
      </div>
    </div>
  );
}
