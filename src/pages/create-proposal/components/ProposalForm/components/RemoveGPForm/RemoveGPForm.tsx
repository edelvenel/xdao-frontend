import cn from "classnames";
import React from "react";
import { useProposals } from "shared/api/proposals";
import { ICreateRemoveGPProposalPayload } from "shared/api/proposals/payloads";
import { Icon } from "shared/icons";
import { ProposalCreateLayout } from "shared/layouts/proposal-create-layout";
import { ProposalType } from "shared/types";
import { Dropdown } from "shared/ui/Dropdown";
import { Input } from "shared/ui/Input";
import { Title } from "shared/ui/Title";
import css from "./styles.module.scss";

interface IRemoveGPFormProps {
  onResponse: (value: boolean) => void;
}

export function RemoveGPForm({ onResponse }: IRemoveGPFormProps) {
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [votingDuration, setVotingDuration] = React.useState<string>("");
  const [gpToRemove, setGpToRemove] = React.useState<string>("");
  const { createProposal } = useProposals();

  const handleOnClick = React.useCallback(async () => {
    const payload: ICreateRemoveGPProposalPayload = {
      type: ProposalType.RemoveGP,
      name,
      description,
      gpToRemove,
      votingDuration: Number(votingDuration),
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
    gpToRemove,
    name,
    onResponse,
    votingDuration,
  ]);

  return (
    <ProposalCreateLayout disabled={false} onClick={handleOnClick}>
      <div className={css.form}>
        <div className={css.fields}>
          <div className={css.block}>
            <Title variant={"medium"} value="Remove general partner" />
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
            <Dropdown
              placeholder="Select GP to remove"
              onSelect={setGpToRemove}
              options={[
                "ox12345...wejnr3r",
                "ox...123456789",
                "ox...123456789",
                "ox...123456789",
              ]}
              selected={gpToRemove}
            />
          </div>
          <div className={css.block}>
            <Title variant={"medium"} value="Update GP distribution" />
            <div className={css.distributionRule}>
              <div className={cn(css.item, css.wallet)}>0x...123</div>
              <div className={cn(css.item, css.gpTokens)}>GP tokens</div>
              <div className={cn(css.item, css.percent)}>30%</div>
              <Icon.Common.Arrow />
              <div className={cn(css.item, css.percent)}>25%</div>
            </div>
            <div className={css.distributionRule}>
              <div className={cn(css.item, css.wallet)}>0x...123</div>
              <div className={cn(css.item, css.gpTokens)}>GP tokens</div>
              <div className={cn(css.item, css.percent)}>30%</div>
              <Icon.Common.Arrow />
              <div className={cn(css.item, css.percent)}>25%</div>
            </div>
          </div>
        </div>
      </div>
    </ProposalCreateLayout>
  );
}
