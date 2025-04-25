import React from "react";
import { useProposals } from "shared/api/proposals";
import { ICreateTransferGPProposalPayload } from "shared/api/proposals/payloads";
import { ProposalCreateLayout } from "shared/layouts/proposal-create-layout";
import { ProposalType } from "shared/types";
import { Dropdown } from "shared/ui/Dropdown";
import { Input } from "shared/ui/Input";
import { Title } from "shared/ui/Title";
import { VotingDuration } from "../VotingDuration";
import css from "./styles.module.scss";

interface ITransferGPFormProps {
  onResponse: (value: boolean) => void;
}

export function TransferGPForm({ onResponse }: ITransferGPFormProps) {
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [votingDuration, setVotingDuration] = React.useState<number | null>(
    null
  );
  const [fromWalletAddress, setFromWalletAddress] = React.useState<string>("");
  const [toWalletAddress, setToWalletAddress] = React.useState<string>("");
  const [tokenAmount, setTokenAmount] = React.useState<string>("");
  const { createProposal } = useProposals();

  const handleOnClick = React.useCallback(async () => {
    const payload: ICreateTransferGPProposalPayload = {
      type: ProposalType.TransferGPTokens,
      name,
      description,
      votingDuration: Number(votingDuration),
      fromWalletAddress,
      tokenAmount: Number(tokenAmount),
      toWalletAddress,
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
    fromWalletAddress,
    name,
    onResponse,
    toWalletAddress,
    tokenAmount,
    votingDuration,
  ]);

  return (
    <ProposalCreateLayout disabled={false} onClick={handleOnClick}>
      <div className={css.form}>
        <div className={css.fields}>
          <div className={css.block}>
            <Title variant={"medium"} value="Transfer general partner" />
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
            <Dropdown
              placeholder="From wallet address"
              onSelect={setFromWalletAddress}
              options={[
                "ox12345...wejnr3r",
                "ox...123456789",
                "ox...123456790",
                "ox...123456791",
              ]}
              selected={fromWalletAddress}
            />
            <Dropdown
              placeholder="To wallet address"
              onSelect={setToWalletAddress}
              options={[
                "ox12345...wejnr3r",
                "ox...123456790",
                "ox...123456791",
                "ox...123456799",
              ]}
              selected={toWalletAddress}
            />
            <Input
              value={tokenAmount}
              fieldName="Token amount"
              placeholder="Token Amount"
              onChange={(e) => setTokenAmount(e.target.value)}
            />
          </div>
        </div>
      </div>
    </ProposalCreateLayout>
  );
}
