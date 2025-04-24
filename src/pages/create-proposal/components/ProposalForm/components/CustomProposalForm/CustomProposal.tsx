import React from "react";
import { useProposals } from "shared/api/proposals";
import { ICreateCustomProposalPayload } from "shared/api/proposals/payloads";
import { TOKENS, VOTING_TYPES } from "shared/constants";
import { ProposalCreateLayout } from "shared/layouts/proposal-create-layout";
import { IOptionWithNote, ProposalType } from "shared/types";
import { Badge } from "shared/ui/Badge";
import { Dropdown } from "shared/ui/Dropdown";
import { Input } from "shared/ui/Input";
import { Radio } from "shared/ui/Radio";
import { Title } from "shared/ui/Title";
import css from "./styles.module.scss";

interface ICustomProposalFormProps {
  onResponse: (value: boolean) => void;
}

export function CustomProposalForm({ onResponse }: ICustomProposalFormProps) {
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [votingDuration, setVotingDuration] = React.useState<string>("");
  const [newName, setNewName] = React.useState<string>("");
  const [votingType, setVotingType] = React.useState<string>(VOTING_TYPES[0]);
  const [token, setToken] = React.useState<IOptionWithNote>(TOKENS[0]);
  const [lpPool, setLpPool] = React.useState<string>("");
  const [minTokens, setMinTokens] = React.useState<string>("");
  const { createProposal } = useProposals();

  const handleOnClick = React.useCallback(async () => {
    const payload: ICreateCustomProposalPayload = {
      type: ProposalType.CreateOnChainPoll,
      name,
      description,
      votingDuration: Number(votingDuration),
      newName,
      votingType,
      token: token.value,
      lpPool,
      minTokens,
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
    lpPool,
    minTokens,
    name,
    newName,
    onResponse,
    token,
    votingDuration,
    votingType,
  ]);

  return (
    <ProposalCreateLayout disabled={false} onClick={handleOnClick}>
      <div className={css.form}>
        <div className={css.fields}>
          <div className={css.block}>
            <Title variant={"medium"} value="Custom proposal" />
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
              fieldName="New name"
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
            {token.id === 2 && (
              <Dropdown
                placeholder="Select LP pool"
                onSelect={setLpPool}
                options={["100", "500", "1000", "Custom"]}
                selected={lpPool}
              />
            )}
            {(token.id === 1 || token.id === 2) && (
              <Dropdown
                placeholder="Min. tokens required to vote"
                onSelect={setMinTokens}
                options={["10", "100", "500", "Custom"]}
                selected={minTokens}
              />
            )}
          </div>
        </div>
      </div>
    </ProposalCreateLayout>
  );
}
