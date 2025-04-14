import { PropsWithChildren } from "react";
import { Button } from "shared/ui/Button";
import css from "./styles.module.scss";

interface IProposalDetailProps extends PropsWithChildren {
  isVotingEnabled: boolean;
  onVote: () => void;
  onBack: () => void;
}

export function ProposalDetailLayout({
  isVotingEnabled,
  onVote,
  onBack,
  children,
}: IProposalDetailProps) {
  return (
    <div className={css.layout}>
      <div className={css.content}>{children}</div>
      {isVotingEnabled && (
        <div className={css.actions}>
          <Button onClick={onBack} variant="secondary">
            Back
          </Button>
          <Button onClick={onVote}>Vote</Button>
        </div>
      )}
      {!isVotingEnabled && (
        <div className={css.info}>
          Only GP token holders can vote on this on-chain proposal
        </div>
      )}
    </div>
  );
}
