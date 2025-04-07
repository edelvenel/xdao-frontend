import { PropsWithChildren } from "react";
import { Button } from "shared/ui/Button";
import css from "./styles.module.scss";

interface IProposalCreateProps extends PropsWithChildren {
  disabled: boolean;
  onClick: () => void;
}

export function ProposalCreateLayout({
  disabled,
  onClick,
  children,
}: IProposalCreateProps) {
  return (
    <div className={css.layout}>
      <div className={css.form}>{children}</div>
      <div className={css.button}>
        <Button disabled={disabled} onClick={onClick}>
          Create Proposal
        </Button>
      </div>
    </div>
  );
}
