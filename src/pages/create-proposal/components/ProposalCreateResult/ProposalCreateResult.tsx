import { Icon } from "shared/icons";
import { Button } from "shared/ui/Button";
import { Title } from "shared/ui/Title";
import css from "./styles.module.scss";

interface IProposalCreateResultProps {
  success: boolean;
  onDone: () => void;
  onRetry: () => void;
}

export function ProposalCreateResult({
  success,
  onDone,
  onRetry,
}: IProposalCreateResultProps) {
  if (success) {
    return (
      <div className={css.proposalCreateResult}>
        <div className={css.content}>
          <div className={css.icon}>
            <Icon.Special.Success />
          </div>
          <Title variant={"large"} value="Proposal created" />
          <div className={css.text}>
            Your proposal has been successfully submitted and is now awaiting
            votes
          </div>
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
      <div className={css.proposalCreateResult}>
        <div className={css.content}>
          <div className={css.icon}>
            <Icon.Special.Error />
          </div>
          <Title variant={"large"} value="Proposal creation failed" />
          <div className={css.text}>
            Something went wrong while submitting your propposal. Please try
            again
          </div>
        </div>
        <div className={css.button}>
          <Button onClick={onRetry}>Retry</Button>
        </div>
      </div>
    );
  }
}
