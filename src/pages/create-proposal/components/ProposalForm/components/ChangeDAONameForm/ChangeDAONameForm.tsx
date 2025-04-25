import React from "react";
import { useProposals } from "shared/api/proposals";
import { ICreateChangeDAONameProposalPayload } from "shared/api/proposals/payloads";
import { ProposalCreateLayout } from "shared/layouts/proposal-create-layout";
import { ProposalType } from "shared/types";
import { Badge } from "shared/ui/Badge";
import { Input } from "shared/ui/Input";
import { Title } from "shared/ui/Title";
import { VotingDuration } from "../VotingDuration";
import css from "./styles.module.scss";

interface IChangeDAONameFormProps {
  onResponse: (value: boolean) => void;
}

export function ChangeDAONameForm({ onResponse }: IChangeDAONameFormProps) {
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [votingDuration, setVotingDuration] = React.useState<number | null>(
    null
  );
  const [newName, setNewName] = React.useState<string>("");
  const { createProposal } = useProposals();

  const handleOnClick = React.useCallback(async () => {
    const payload: ICreateChangeDAONameProposalPayload = {
      type: ProposalType.ChangeDAOName,
      name,
      description,
      votingDuration: Number(votingDuration),
      newName,
    };

    try {
      await createProposal(payload);
      onResponse(true);
    } catch {
      onResponse(false);
    }
  }, [createProposal, description, name, newName, onResponse, votingDuration]);

  return (
    <ProposalCreateLayout disabled={false} onClick={handleOnClick}>
      <div className={css.form}>
        <div className={css.fields}>
          <div className={css.block}>
            <Title variant={"medium"} value="Change DAO name" />
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
            <div className={css.currentName}>
              <span>Current name</span>
              <Badge text="Example DAO" variant="blue" />
            </div>
            <Input
              value={newName}
              fieldName="New name"
              placeholder="New name"
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
        </div>
      </div>
    </ProposalCreateLayout>
  );
}
