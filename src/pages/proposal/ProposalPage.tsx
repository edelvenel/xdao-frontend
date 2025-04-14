import { routes } from "app/router/routes";
import cn from "classnames";
import React from "react";
import { useNavigate, useParams } from "react-router";
import { store } from "shared/store";
import { PROPOSALS } from "shared/types";
import { Modal } from "shared/ui/Modal";
import { ProposalDetails } from "./components/ProposalDetails";
import { Vote } from "./components/Vote";
import { VoteResult } from "./components/VoteResult";
import css from "./styles.module.scss";

export const ProposalPage = React.memo(function ProposalPage() {
  const { id } = useParams();
  const proposal = PROPOSALS.find((proposal) => proposal.id === id);
  const navigate = useNavigate();
  const { setIsMenuShown, setIsHeaderShown } = store.useApp();
  const [isOnVote, setIsOnVote] = React.useState<boolean>(false);
  const [isResultOpen, setIsResultOpen] = React.useState<boolean>(false);
  const [success, setSuccess] = React.useState<boolean | null>(null);

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
    if (!proposal) {
      navigate(routes.notfound);
    }
  }, [navigate, proposal]);

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
