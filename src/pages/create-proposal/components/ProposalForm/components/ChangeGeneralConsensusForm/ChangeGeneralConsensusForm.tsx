import { Badge } from "pages/proposal-list/components/Badge";
import React from "react";
import { Icon } from "shared/icons";
import { ProposalCreateLayout } from "shared/layouts/proposal-create-layout";
import { Dropdown } from "shared/ui/Dropdown";
import { Input } from "shared/ui/Input";
import { InputStep } from "shared/ui/InputStep";
import { Title } from "shared/ui/Title";
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
  //   const [isDisabled, setIsDisabled] = React.useState<boolean>(true);
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [votingDuration, setVotingDuration] = React.useState<string>("");
  const [currentConsensus, setCurrentConsensus] = React.useState<number>(51);

  const handleOnClick = React.useCallback(() => {
    onResponse(true);
  }, [onResponse]);

  return (
    <ProposalCreateLayout disabled={false} onClick={handleOnClick}>
      <div className={css.form}>
        <div className={css.fields}>
          <div className={css.block}>
            <Title variant={"medium"} value="Change general consensus" />
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
                  <div className={css.infoButton}>
                    <Icon.Common.QuestionSmall />
                  </div>
                </div>
              </div>
              <InputStep
                current={currentConsensus}
                onChange={setCurrentConsensus}
                renderLabel={handleRenderLabel}
              />

              <Input
                value={currentConsensus}
                placeholder="Enter amount manual"
                onChange={(e) =>
                  setCurrentConsensus(
                    isNaN(Number(e.target.value)) ? 0 : Number(e.target.value)
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>
    </ProposalCreateLayout>
  );
}
