import React from "react";
import { useProposals } from "shared/api/proposals";
import { ICreateChangeGPTransferStatusProposalPayload } from "shared/api/proposals/payloads";
import { ProposalCreateLayout } from "shared/layouts/proposal-create-layout";
import { ProposalType } from "shared/types";
import { Badge } from "shared/ui/Badge";
import { Dropdown } from "shared/ui/Dropdown";
import { Input } from "shared/ui/Input";
import { Title } from "shared/ui/Title";
import { VotingDuration } from "../VotingDuration";
import css from "./styles.module.scss";

interface IChangeGPTransferStatusFormProps {
  onResponse: (value: boolean) => void;
}

export function ChangeGPTransferStatusForm({
  onResponse,
}: IChangeGPTransferStatusFormProps) {
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [votingDuration, setVotingDuration] = React.useState<number | null>(
    null
  );
  const [newStatus, setNewStatus] = React.useState<string>("");
  const { createProposal } = useProposals();

  const handleOnClick = React.useCallback(async () => {
    const payload: ICreateChangeGPTransferStatusProposalPayload = {
      type: ProposalType.ChangeGPTransferStatus,
      name,
      description,
      votingDuration: Number(votingDuration),
      newStatus,
    };

    try {
      await createProposal(payload);
      onResponse(true);
    } catch {
      onResponse(false);
    }
  }, [
    createProposal,
    description,
    name,
    newStatus,
    onResponse,
    votingDuration,
  ]);

  return (
    <ProposalCreateLayout disabled={false} onClick={handleOnClick}>
      <div className={css.form}>
        <div className={css.fields}>
          <div className={css.block}>
            <Title variant={"medium"} value="Change GP transfer status" />
            <Input
              value={name}
              fieldName="Proposal name"
              placeholder="Create proposal name"
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              value={description}
              fieldName="Description"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            />
            <VotingDuration
              value={votingDuration}
              setValue={setVotingDuration}
            />
            <div className={css.currentStatus}>
              <span>Current status</span>
              <Badge text="Non-Transferable" variant="blue" />
            </div>
            <Dropdown
              placeholder="Select new status"
              onSelect={setNewStatus}
              options={["Non-transferable", "Active", "Pending", "Completed"]}
              selected={newStatus}
            />
          </div>
        </div>
      </div>
    </ProposalCreateLayout>
  );
}
