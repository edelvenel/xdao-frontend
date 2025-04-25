import React from "react";
import { useProposals } from "shared/api/proposals";
import { ICreateCustomProposalPayload } from "shared/api/proposals/payloads";
import { TOKENS, VOTING_TYPES } from "shared/constants";
import { ProposalCreateLayout } from "shared/layouts/proposal-create-layout";
import { IOptionWithNote, ProposalType } from "shared/types";
import { Dropdown } from "shared/ui/Dropdown";
import { Input } from "shared/ui/Input";
import { Radio } from "shared/ui/Radio";
import { Title } from "shared/ui/Title";
import { SelectOptions } from "../SelectOptions";
import { TokenRequired } from "../TokenRequired";
import { VotingDuration } from "../VotingDuration";
import css from "./styles.module.scss";

interface ICustomProposalFormProps {
  onResponse: (value: boolean) => void;
}

export function CustomProposalForm({ onResponse }: ICustomProposalFormProps) {
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [votingDuration, setVotingDuration] = React.useState<number | null>(
    null
  );
  const [newName, setNewName] = React.useState<string>("");
  const [votingType, setVotingType] = React.useState<string>(VOTING_TYPES[0]);
  const [selectOptions, setSelectOptions] = React.useState<string[]>(["", ""]);
  const [question, setQuestion] = React.useState<string>("");
  const [token, setToken] = React.useState<IOptionWithNote>(TOKENS[0]);
  const [lpPool, setLpPool] = React.useState<string>("");
  const [minTokens, setMinTokens] = React.useState<number | null>(null);
  const [tokenAddress, setTokenAddress] = React.useState<string>("");
  const [tokenSymbol, setTokenSymbol] = React.useState<string>("");
  const { createProposal } = useProposals();

  const handleOnClick = React.useCallback(async () => {
    const payload: ICreateCustomProposalPayload = {
      type: ProposalType.CustomProposal,
      name,
      description,
      votingDuration: Number(votingDuration),
      newName,
      votingType,
      token: token.value,
      lpPool,
      minTokens: minTokens === null ? 0 : minTokens,
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
            <VotingDuration
              value={votingDuration}
              setValue={setVotingDuration}
            />
            <Input
              value={question}
              fieldName="Question"
              placeholder="Question"
              onChange={(e) => setQuestion(e.target.value)}
            />

            <Input
              value={newName}
              fieldName="New name"
              placeholder="New name"
              onChange={(e) => setNewName(e.target.value)}
            />
            <SelectOptions value={selectOptions} setValue={setSelectOptions} />
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

            {token.id === 3 && (
              <>
                <Input
                  value={tokenAddress}
                  fieldName="Token address"
                  placeholder="Paste token address"
                  onChange={(e) => setTokenAddress(e.target.value)}
                />
                <Input
                  value={tokenSymbol}
                  fieldName="Token symbol"
                  placeholder="Write token symbol"
                  onChange={(e) => setTokenSymbol(e.target.value)}
                />
              </>
            )}

            <TokenRequired value={minTokens} setValue={setMinTokens} />
          </div>
        </div>
      </div>
    </ProposalCreateLayout>
  );
}
