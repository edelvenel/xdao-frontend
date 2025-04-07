import React from "react";
import { Icon } from "shared/icons";
import { ProposalCreateLayout } from "shared/layouts/proposal-create-layout";
import { Dropdown } from "shared/ui/Dropdown";
import { Input } from "shared/ui/Input";
import { Title } from "shared/ui/Title";
import css from "./styles.module.scss";

interface IAddGPFormProps {
  onResponse: (value: boolean) => void;
}

export function AddGPForm({ onResponse }: IAddGPFormProps) {
  //   const [isDisabled, setIsDisabled] = React.useState<boolean>(true);
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [walletAddress, setWalletAddress] = React.useState<string>("");
  const [tokenAmount, setTokenAmount] = React.useState<string>("");
  const [votingDuration, setVotingDuration] = React.useState<string>("");

  const handleOnClick = React.useCallback(() => {
    onResponse(true);
  }, [onResponse]);

  return (
    <ProposalCreateLayout disabled={false} onClick={handleOnClick}>
      <div className={css.form}>
        <div className={css.fields}>
          <div className={css.block}>
            <Title variant={"medium"} value="Add general partner" />
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
            <Input
              value={walletAddress}
              placeholder="Add wallet address"
              onChange={(e) => setWalletAddress(e.target.value)}
            />
            <Input
              value={tokenAmount}
              placeholder="Add token amount"
              onChange={(e) => setTokenAmount(e.target.value)}
            />
          </div>
          <div className={css.block}>
            <Title variant={"medium"} value="Update GP distribution" />
            <div className={css.distributionRule}>
              <div className={css.item}>0x...123</div>
              <div className={css.item}>GP tokens</div>
              <div className={css.item}>30%</div>
              <Icon.Common.Arrow />
              <div className={css.item}>25%</div>
            </div>
            <div className={css.distributionRule}>
              <div className={css.item}>0x...123</div>
              <div className={css.item}>GP tokens</div>
              <div className={css.item}>30%</div>
              <Icon.Common.Arrow />
              <div className={css.item}>25%</div>
            </div>
          </div>
        </div>
      </div>
    </ProposalCreateLayout>
  );
}
