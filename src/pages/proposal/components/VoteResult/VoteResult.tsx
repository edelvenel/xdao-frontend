import { Icon } from "shared/icons";
import { Button } from "shared/ui/Button";
import { Title } from "shared/ui/Title";
import css from "./styles.module.scss";

interface IVoteResultProps {
  success: boolean;
  onDone: () => void;
  onRetry: () => void;
}

export function VoteResult({ success, onDone, onRetry }: IVoteResultProps) {
  if (success) {
    return (
      <div className={css.voteResult}>
        <div className={css.content}>
          <div className={css.icon}>
            <Icon.Special.Success />
          </div>
          <Title variant={"large"} value="Vote submitted!" />
          <div className={css.text}>Your vote has been recorded.</div>
        </div>
        <div className={css.button}>
          <Button variant="accent" onClick={onDone}>
            Done
          </Button>
        </div>
      </div>
    );
  } else {
    return (
      <div className={css.voteResult}>
        <div className={css.content}>
          <div className={css.icon}>
            <Icon.Special.Error />
          </div>
          <Title variant={"large"} value="Vote failed" />
          <div className={css.text}>
            Something went wrong while submitting your vote. Please try again
          </div>
        </div>
        <div className={css.button}>
          <Button onClick={onRetry}>Retry</Button>
        </div>
      </div>
    );
  }
}
