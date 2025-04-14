import { backButton } from "@telegram-apps/sdk";
import cn from "classnames";
import React from "react";
import { useNavigate } from "react-router";
import { useBackButton } from "shared/hooks/useBackButton";
import { store } from "shared/store";
import { IDao, IProposalType, ProposalTypes } from "shared/types";
import { Modal } from "shared/ui/Modal";
import { CreateProposalOpen } from "./components/CreateProposalOpen";
import { ProposalCreateResult } from "./components/ProposalCreateResult";
import { ProposalForm } from "./components/ProposalForm";
import css from "./styles.module.scss";

export const CreateProposalPage = React.memo(function CreateProposalPage() {
  const [dao, setDao] = React.useState<IDao | null>(null);
  const [proposalType, setProposalType] = React.useState<IProposalType | null>(
    null
  );
  const [formType, setFormType] = React.useState<number | null>(null);
  const [isSuccess, setIsSuccess] = React.useState<boolean | null>(null);

  const { setIsMenuShown, setIsHeaderShown } = store.useApp();
  useBackButton();

  const navigate = useNavigate();
  React.useEffect(() => {
    setIsMenuShown(false);
    setIsHeaderShown(true);
  }, [setIsHeaderShown, setIsMenuShown]);
  if (backButton.mount.isAvailable()) {
    backButton.mount();
    backButton.isMounted(); // true
  }

  const handleGetFormType = React.useCallback(() => {
    if (proposalType) {
      const currentType = ProposalTypes.find(
        (type) => type.id === proposalType.id
      );
      setFormType(currentType?.id || null);
    }
  }, [proposalType]);

  return (
    <div className={css.page}>
      {formType === null && (
        <CreateProposalOpen
          dao={dao}
          onSelectDao={setDao}
          proposalType={proposalType}
          onSelectProposalType={setProposalType}
          onBack={() => navigate(-1)}
          onCreate={() => handleGetFormType()}
        />
      )}
      {formType != null && (
        <ProposalForm type={formType} onResponse={setIsSuccess} />
      )}
      {isSuccess !== null && (
        <Modal
          onClose={() => navigate(-1)}
          className={cn(isSuccess && css.success)}
        >
          <ProposalCreateResult
            success={isSuccess}
            onDone={() => navigate(-1)}
            onRetry={() => setIsSuccess(null)}
          />
        </Modal>
      )}
    </div>
  );
});
