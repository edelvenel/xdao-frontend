import React, { JSX } from "react";
import { store } from "shared/store";
import { AddGPForm } from "./components/AddGPForm";

interface IProposalFormProps {
  type: number;
  onResponse: (value: boolean) => void;
}

export function ProposalForm({
  type,
  onResponse,
}: IProposalFormProps): JSX.Element | null {
  const { setIsBackground } = store.useApp();

  React.useEffect(() => {
    setIsBackground(false);
  }, [setIsBackground]);

  switch (type) {
    case 1:
      return <AddGPForm onResponse={onResponse} />;

    // case 1:
    //   return <RemoveGPForm />;

    // case 2:
    //   return <TransferGPForm />;

    // case 3:
    //   return <ChangeGPTransferStatusForm />;

    // case 4:
    //   return <ChangeGeneralConsensus />;

    // case 5:
    //   return <SendFundsForm />;

    // case 6:
    //   return <ChangeDAONameForm />;

    // case 7:
    //   return <CustomProposalForm />;
    default:
      return null;
  }
}
