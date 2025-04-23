import React from "react";
import { ProposalCreateLayout } from "shared/layouts/proposal-create-layout";
import { Dropdown } from "shared/ui/Dropdown";
import { Input } from "shared/ui/Input";
import { Title } from "shared/ui/Title";
import css from "./styles.module.scss";

interface ITransferGPFormProps {
  onResponse: (value: boolean) => void;
}

export function TransferGPForm({ onResponse }: ITransferGPFormProps) {
  //   const [isDisabled, setIsDisabled] = React.useState<boolean>(true);
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [votingDuration, setVotingDuration] = React.useState<string>("");
  const [fromWalletAddress, setFromWalletAddress] = React.useState<string>("");
  const [toWalletAddress, setToWalletAddress] = React.useState<string>("");
  const [tokenAmount, setTokenAmount] = React.useState<string>("");

  const handleOnClick = React.useCallback(() => {
    onResponse(false);
  }, [onResponse]);

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
            <Dropdown
              placeholder="Select voting duration"
              onSelect={setVotingDuration}
              options={["2 Days", "3 Days", "4 Days", "Custom"]}
              selected={votingDuration}
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
