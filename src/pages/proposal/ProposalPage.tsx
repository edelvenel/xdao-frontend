import cn from "classnames";
import React from "react";
import { useNavigate, useParams } from "react-router";
import { useProposals } from "shared/api/proposals";
import { useBackButton } from "shared/hooks/useBackButton";
import { store } from "shared/store";
import { Modal } from "shared/ui/Modal";
import { ProposalDetails } from "./components/ProposalDetails";
import { Vote } from "./components/Vote";
import { VoteResult } from "./components/VoteResult";
import css from "./styles.module.scss";

export const ProposalPage = React.memo(function ProposalPage() {
  const { proposals, fetchProposals } = useProposals();
  const { id } = useParams();
  const navigate = useNavigate();
  const { setIsMenuShown, setIsHeaderShown } = store.useApp();
  const [isOnVote, setIsOnVote] = React.useState<boolean>(false);
  const [isResultOpen, setIsResultOpen] = React.useState<boolean>(false);
  const [success, setSuccess] = React.useState<boolean | null>(null);
  useBackButton();

  const proposal = React.useMemo(() => {
    return proposals.find((proposal) => proposal.id === id);
  }, [id, proposals]);

  React.useEffect(() => {
    setIsMenuShown(false);
    setIsHeaderShown(true);
  }, [setIsHeaderShown, setIsMenuShown]);

  const handleOnConfirm = React.useCallback(() => {
    setIsOnVote(false);
    const success = true; //TODO: voting integration
    setSuccess(success);
    setIsResultOpen(true);
  }, []);

  React.useEffect(() => {
    fetchProposals();
  }, [fetchProposals]);

  if (!proposal) {
    return null;
  }

  return (
    <div className={css.page}>
      {!!proposal && (
        <ProposalDetails proposal={proposal} onVote={() => setIsOnVote(true)} />
      )}
      {!!proposal && isOnVote && (
        <Modal onClose={() => setIsOnVote(false)} title="Cast your vote">
          <Vote proposalName={proposal.name} onConfirm={handleOnConfirm} />
        </Modal>
      )}
      {isResultOpen && success !== null && (
        <Modal
          onClose={() => setIsResultOpen(false)}
          className={cn(success === true && css.success)}
        >
          <VoteResult
            success={success}
            onDone={() => navigate(-1)}
            onRetry={() => setIsResultOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
});
