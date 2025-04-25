import React from "react";
import { useProposals } from "shared/api/proposals";
import { ICreateChangeGeneralConsensusProposalPayload } from "shared/api/proposals/payloads";
import { Icon } from "shared/icons";
import { ProposalCreateLayout } from "shared/layouts/proposal-create-layout";
import { ProposalType } from "shared/types";
import { Badge } from "shared/ui/Badge";
import { Input } from "shared/ui/Input";
import { InputNumber } from "shared/ui/InputNumber";
import { InputStep } from "shared/ui/InputStep";
import { Modal } from "shared/ui/Modal";
import { Title } from "shared/ui/Title";
import { VotingDuration } from "../VotingDuration";
import css from "./styles.module.scss";

const handleRenderLabel = (value: number): string => {
  return `${value}%`;
};

interface IChangeGeneralConsensusFormProps {
  onResponse: (value: boolean) => void;
}

export function ChangeGeneralConsensusForm({
  onResponse,
}: IChangeGeneralConsensusFormProps) {
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [votingDuration, setVotingDuration] = React.useState<number | null>(
    null
  );
  const [currentConsensus, setCurrentConsensus] = React.useState<number>(51);
  const [isInfoOpen, setIsInfoOpen] = React.useState<boolean>(false);
  const { createProposal } = useProposals();

  const handleOnClick = React.useCallback(async () => {
    const payload: ICreateChangeGeneralConsensusProposalPayload = {
      type: ProposalType.ChangeGeneralConsensus,
      name,
      description,
      votingDuration: Number(votingDuration),
      currentConsensus,
    };

    try {
      await createProposal(payload);
      onResponse(true);
    } catch {
      onResponse(false);
    }
  }, [
    createProposal,
    currentConsensus,
    description,
    name,
    onResponse,
    votingDuration,
  ]);

  return (
    <ProposalCreateLayout disabled={false} onClick={handleOnClick}>
      <div className={css.form}>
        <div className={css.fields}>
          <div className={css.block}>
            <Title variant={"medium"} value="Change general consensus" />
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
            <div className={css.currentConsensus}>
              <span>Current consensus</span>
              <Badge text={"51%"} variant="blue" />
            </div>
          </div>
          <div className={css.block}>
            <div className={css.setConsensusBlock}>
              <div className={css.title}>
                <div className={css.header}>
                  <Title variant={"medium"} value="Current consensus" />
                  <div
                    className={css.infoButton}
                    onClick={() => setIsInfoOpen(true)}
                  >
                    <Icon.Common.QuestionSmall />
                  </div>
                </div>
              </div>
              <InputStep
                current={currentConsensus}
                onChange={setCurrentConsensus}
                renderLabel={handleRenderLabel}
                step={10}
              />

              <InputNumber
                max={100}
                min={0}
                onUpdate={(value) => setCurrentConsensus(Number(value))}
                value={currentConsensus > 0 ? currentConsensus : ""}
                placeholder="Enter amount manual"
              />
            </div>
          </div>
        </div>
      </div>
      {isInfoOpen && (
        <Modal title="Current consensus" onClose={() => setIsInfoOpen(false)}>
          <div className={css.infoBlock}>
            <div className={css.textBlock}>
              This is the minimum percentage of GP token votes needed to approve
              a proposal.
            </div>
            <div className={css.textBlock}>
              Increasing the consensus makes decisions harder to pass, while
              lowering it makes them easier.
            </div>
          </div>
        </Modal>
      )}
    </ProposalCreateLayout>
  );
}
