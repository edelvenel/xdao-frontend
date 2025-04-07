import React from "react";
import { Icon } from "shared/icons";
import { ProposalCreateLayout } from "shared/layouts/proposal-create-layout";
import { IDao, IToken, LOGO_URL } from "shared/types";
import { Dropdown } from "shared/ui/Dropdown";
import { Input } from "shared/ui/Input";
import { InputNumber } from "shared/ui/InputNumber";
import { RadioToken } from "shared/ui/RadioToken";
import { Title } from "shared/ui/Title";
import { objectIdMatcher } from "shared/utils/Mathcer";
import css from "./styles.module.scss";

const DAOS_MOCK: IDao[] = [
  { id: 1, logo: LOGO_URL, name: "Example DAO 1" },
  { id: 2, logo: LOGO_URL, name: "Example DAO 2" },
  { id: 3, logo: LOGO_URL, name: "Example DAO 3" },
];

const TOKENS: IToken[] = [
  {
    id: "0",
    name: "TON",
    imgUrl: "https://cryptologos.cc/logos/toncoin-ton-logo.png",
    amount: 125,
    rate: 10.0987,
  },
  {
    id: "1",
    name: "BTC",
    imgUrl: "https://cryptologos.cc/logos/toncoin-ton-logo.png",
    amount: 59,
    rate: 3.0953,
  },
  {
    id: "2",
    name: "USDT",
    imgUrl: "https://cryptologos.cc/logos/toncoin-ton-logo.png",
    amount: 12,
    rate: 8.362,
  },
];

interface ISendFundsFormProps {
  onResponse: (value: boolean) => void;
}

export function SendFundsForm({ onResponse }: ISendFundsFormProps) {
  //   const [isDisabled, setIsDisabled] = React.useState<boolean>(true);
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [votingDuration, setVotingDuration] = React.useState<string>("");
  const [fromDAO, setFromDAO] = React.useState<IDao>(DAOS_MOCK[0]);
  const [recipientAddress, setRecipientAddress] = React.useState<string>("");
  const [token, setToken] = React.useState<IToken>(TOKENS[0]);
  const [tokenAmount, setTokenAmount] = React.useState<string>("");

  const handleOnClick = React.useCallback(() => {
    onResponse(true);
  }, [onResponse]);

  return (
    <ProposalCreateLayout disabled={false} onClick={handleOnClick}>
      <div className={css.form}>
        <div className={css.fields}>
          <div className={css.block}>
            <Title variant={"medium"} value="Send DAO funds" />
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
            <Dropdown
              placeholder="From DAO"
              onSelect={setFromDAO}
              options={DAOS_MOCK}
              selected={fromDAO}
              optionLabel={(option) => option.name}
              optionLogo={(option) => option.logo}
              matcher={objectIdMatcher}
            />
            <Input
              value={recipientAddress}
              placeholder="Enter recipient address"
              onChange={(e) => setRecipientAddress(e.target.value)}
            />
          </div>
          <div className={css.block}>
            <Title variant={"medium"} value="Select token type" />
            <div className={css.tokenBlock}>
              <RadioToken
                selected={token}
                options={TOKENS}
                onSelect={setToken}
              />
              <div className={css.amountBlock}>
                <InputNumber
                  value={tokenAmount}
                  placeholder="Enter token amount"
                  onMaxAmount={() => setTokenAmount("100")}
                  onUpdate={(value) => setTokenAmount(value)}
                />
                <div className={css.link}>
                  <span>Open link for more info</span>
                  <div className={css.linkButton}>
                    <Icon.Common.Link />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProposalCreateLayout>
  );
}
