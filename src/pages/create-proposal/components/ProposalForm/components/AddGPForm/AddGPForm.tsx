import cn from "classnames";
import React from "react";
import { useProposals } from "shared/api/proposals";
import { ICreateAddGPProposalPayload } from "shared/api/proposals/payloads";
import { Icon } from "shared/icons";
import { ProposalCreateLayout } from "shared/layouts/proposal-create-layout";
import { ProposalType } from "shared/types";
import { Input } from "shared/ui/Input";
import { Title } from "shared/ui/Title";
import { VotingDuration } from "../VotingDuration";
import css from "./styles.module.scss";

interface IAddGPFormProps {
  onResponse: (value: boolean) => void;
}

export function AddGPForm({ onResponse }: IAddGPFormProps) {
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [walletAddress, setWalletAddress] = React.useState<string>("");
  const [tokenAmount, setTokenAmount] = React.useState<string>("");
  const [votingDuration, setVotingDuration] = React.useState<number | null>(
    null
  );
  const { createProposal } = useProposals();

  const handleOnClick = React.useCallback(async () => {
    if (votingDuration === null) {
      return;
    }

    const payload: ICreateAddGPProposalPayload = {
      type: ProposalType.AddGP,
      name,
      description,
      walletAddress,
      tokenAmount: Number(tokenAmount),
      votingDuration: votingDuration,
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
    onResponse,
    tokenAmount,
    votingDuration,
    walletAddress,
  ]);

  return (
    <ProposalCreateLayout disabled={false} onClick={handleOnClick}>
      <div className={css.form}>
        <div className={css.fields}>
          <div className={css.block}>
            <Title variant={"medium"} value="Add general partner" />
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
              value={walletAddress}
              fieldName="Wallet address"
              placeholder="Add wallet address"
              onChange={(e) => setWalletAddress(e.target.value)}
            />
            <Input
              value={tokenAmount}
              fieldName="Token amount"
              placeholder="Add token amount"
              onChange={(e) => setTokenAmount(e.target.value)}
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
