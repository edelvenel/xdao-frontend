import { Badge } from "pages/proposal-list/components/Badge";
import React from "react";
import { ProposalCreateLayout } from "shared/layouts/proposal-create-layout";
import { Dropdown } from "shared/ui/Dropdown";
import { Input } from "shared/ui/Input";
import { Title } from "shared/ui/Title";
import css from "./styles.module.scss";

interface IChangeDAONameFormProps {
  onResponse: (value: boolean) => void;
}

export function ChangeDAONameForm({ onResponse }: IChangeDAONameFormProps) {
  //   const [isDisabled, setIsDisabled] = React.useState<boolean>(true);
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [votingDuration, setVotingDuration] = React.useState<string>("");
  const [newName, setNewName] = React.useState<string>("");

  const handleOnClick = React.useCallback(() => {
    onResponse(true);
  }, [onResponse]);

  return (
    <ProposalCreateLayout disabled={false} onClick={handleOnClick}>
      <div className={css.form}>
        <div className={css.fields}>
          <div className={css.block}>
            <Title variant={"medium"} value="Change DAO name" />
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
            <div className={css.currentName}>
              <span>Current name</span>
              <Badge text="Example DAO" variant="blue" />
            </div>
            <Input
              value={newName}
              placeholder="New name"
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
        </div>
      </div>
    </ProposalCreateLayout>
  );
}
