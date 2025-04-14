import React, { JSX } from "react";
import { store } from "shared/store";
import { IProposal } from "shared/types";
import { AddGPDetail } from "./components/AddGPDetail";
import { ChangeDAONameDetail } from "./components/ChangeDAONameDetail";
import { ChangeGPTransferStatusDetail } from "./components/ChangeGPTransferStatusDetail";
import { ChangeGeneralConsensusDetail } from "./components/ChangeGeneralConsensusDetail";
import { CustomProposalDetail } from "./components/CustomProposalDetail";
import { RemoveGPDetail } from "./components/RemoveGPDetail";
import { SendFundsDetail } from "./components/SendFundsDetail";
import { TransferGPDetail } from "./components/TransferGPDetail";

interface IProposalDetailsProps {
  proposal: IProposal;
  onVote: () => void;
}

export function ProposalDetails({
  proposal,
  onVote,
}: IProposalDetailsProps): JSX.Element | null {
  const { setIsBackground } = store.useApp();

  React.useEffect(() => {
    setIsBackground(false);
  }, [setIsBackground]);

  switch (proposal.type.id) {
    case 1:
      return <AddGPDetail proposal={proposal} onVote={onVote} />;

    case 2:
      return <RemoveGPDetail proposal={proposal} onVote={onVote} />;

    case 3:
      return <TransferGPDetail proposal={proposal} onVote={onVote} />;

    case 4:
      return (
        <ChangeGPTransferStatusDetail proposal={proposal} onVote={onVote} />
      );

    case 5:
      return (
        <ChangeGeneralConsensusDetail proposal={proposal} onVote={onVote} />
      );

    case 6:
      return <SendFundsDetail proposal={proposal} onVote={onVote} />;

    case 7:
      return <ChangeDAONameDetail proposal={proposal} onVote={onVote} />;

    case 8:
      return <CustomProposalDetail proposal={proposal} onVote={onVote} />;
    default:
      return null;
  }
}
