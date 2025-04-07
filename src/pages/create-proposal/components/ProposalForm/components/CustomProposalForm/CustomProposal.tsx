import { Badge } from "pages/proposal-list/components/Badge";
import React from "react";
import { ProposalCreateLayout } from "shared/layouts/proposal-create-layout";
import { Dropdown } from "shared/ui/Dropdown";
import { Input } from "shared/ui/Input";
import { Radio } from "shared/ui/Radio";
import { Title } from "shared/ui/Title";
import css from "./styles.module.scss";

type IOptionWithNote = {
  id: number;
  value: string;
  note?: string;
};

const TOKENS: IOptionWithNote[] = [
  { id: 1, value: "GP", note: "only GP holders can vote" },
  { id: 2, value: "LP" },
  { id: 3, value: "Custom token" },
];

const VOTING_TYPES: string[] = [
  "One wallet = one vote",
  "Proportional to token amount",
];

interface ICustomProposalFormProps {
  onResponse: (value: boolean) => void;
}

export function CustomProposalForm({ onResponse }: ICustomProposalFormProps) {
  //   const [isDisabled, setIsDisabled] = React.useState<boolean>(true);
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [votingDuration, setVotingDuration] = React.useState<string>("");
  const [newName, setNewName] = React.useState<string>("");
  const [votingType, setVotingType] = React.useState<string>(VOTING_TYPES[0]);
  const [token, setToken] = React.useState<IOptionWithNote>(TOKENS[0]);

  const handleOnClick = React.useCallback(() => {
    onResponse(true);
  }, [onResponse]);

  return (
    <ProposalCreateLayout disabled={false} onClick={handleOnClick}>
      <div className={css.form}>
        <div className={css.fields}>
          <div className={css.block}>
            <Title variant={"medium"} value="Custom proposal" />
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

          <div className={css.block}>
            <Title variant="medium" value="Select voting type" />
            <div className={css.radio}>
              <Radio
                selected={votingType}
                options={VOTING_TYPES}
                onSelect={setVotingType}
                matcher={(a, b) => a === b}
                renderLabel={(option) => <span>{option}</span>}
              />
            </div>
          </div>

          <div className={css.block}>
            <Title variant="medium" value="Token selection" />
            <div className={css.radio}>
              <Radio
                selected={token}
                options={TOKENS}
                onSelect={setToken}
                renderLabel={(option) => (
                  <div key={option.id} className={css.radioLabel}>
                    <span>{option.value}</span>
                    <div className={css.note}>{option.note}</div>
                  </div>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </ProposalCreateLayout>
  );
}
