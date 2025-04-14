import React from "react";
import { ProposalCreateLayout } from "shared/layouts/proposal-create-layout";
import { Badge } from "shared/ui/Badge";
import { Dropdown } from "shared/ui/Dropdown";
import { Input } from "shared/ui/Input";
import { Title } from "shared/ui/Title";
import css from "./styles.module.scss";

interface IChangeGPTransferStatusFormProps {
  onResponse: (value: boolean) => void;
}

export function ChangeGPTransferStatusForm({
  onResponse,
}: IChangeGPTransferStatusFormProps) {
  //   const [isDisabled, setIsDisabled] = React.useState<boolean>(true);
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [votingDuration, setVotingDuration] = React.useState<string>("");
  const [newStatus, setNewStatus] = React.useState<string>("");

  const handleOnClick = React.useCallback(() => {
    onResponse(false);
  }, [onResponse]);

  return (
    <ProposalCreateLayout disabled={false} onClick={handleOnClick}>
      <div className={css.form}>
        <div className={css.fields}>
          <div className={css.block}>
            <Title variant={"medium"} value="Change GP transfer status" />
            <Input
              value={name}
              placeholder="Create proposal name"
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              value={description}
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            />
            <Dropdown
              placeholder="Select voting duration"
              onSelect={setVotingDuration}
              options={["2 Days", "3 Days", "4 Days", "Custom"]}
              selected={votingDuration}
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
