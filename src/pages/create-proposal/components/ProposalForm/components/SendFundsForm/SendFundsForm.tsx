import React from "react";
import toast from "react-hot-toast";
import { useDaos } from "shared/api/daos";
import { useProposals } from "shared/api/proposals";
import { ICreateSendFundsProposalPayload } from "shared/api/proposals/payloads";
import { Icon } from "shared/icons";
import { ProposalCreateLayout } from "shared/layouts/proposal-create-layout";
import { IDao, IToken, ProposalType } from "shared/types";
import { Dropdown } from "shared/ui/Dropdown";
import { Input } from "shared/ui/Input";
import { InputNumber } from "shared/ui/InputNumber";
import { RadioToken } from "shared/ui/RadioToken";
import { Title } from "shared/ui/Title";
import { objectIdMatcher } from "shared/utils/Mathcer";
import { VotingDuration } from "../VotingDuration";
import css from "./styles.module.scss";

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
  const { daos, fetchDaos } = useDaos();
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [votingDuration, setVotingDuration] = React.useState<number | null>(
    null
  );
  const [fromDAO, setFromDAO] = React.useState<IDao | null>(null);
  const [recipientAddress, setRecipientAddress] = React.useState<string>("");
  const [token, setToken] = React.useState<IToken>(TOKENS[0]);
  const [tokenAmount, setTokenAmount] = React.useState<string>("");
  const { createProposal } = useProposals();

  const handleOnClick = React.useCallback(async () => {
    if (!fromDAO) {
      return;
    }

    const payload: ICreateSendFundsProposalPayload = {
      type: ProposalType.SendDAOFunds,
      name,
      description,
      votingDuration: Number(votingDuration),
      fromDAO,
      token,
      recipientAddress,
      tokenAmount: Number(tokenAmount),
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
    fromDAO,
    name,
    onResponse,
    recipientAddress,
    token,
    tokenAmount,
    votingDuration,
  ]);

  React.useEffect(() => {
    fetchDaos();
    setFromDAO(daos[0]);
  }, [daos, fetchDaos]);

  return (
    <ProposalCreateLayout disabled={false} onClick={handleOnClick}>
      <div className={css.form}>
        <div className={css.fields}>
          <div className={css.block}>
            <Title variant={"medium"} value="Send DAO funds" />
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
              placeholder="From DAO"
              onSelect={setFromDAO}
              options={daos}
              selected={fromDAO}
              optionLabel={(option) => option.name}
              optionLogo={(option) => option.logo}
              matcher={objectIdMatcher}
            />
            <Input
              value={recipientAddress}
              fieldName="Recipient address"
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
                  <div
                    className={css.linkButton}
                    onClick={() => toast.error("Unimplemented")}
                  >
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
