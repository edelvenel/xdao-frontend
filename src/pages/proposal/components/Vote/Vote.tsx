import React from "react";
import { Slider } from "shared/ui/Slider";
import { VoteRadio } from "./components/VoteRadio/VoteRadio";
import css from "./styles.module.scss";

interface IVoteProps {
  proposalName: string;
  onConfirm: (answer: boolean) => void;
}

export function Vote({ proposalName, onConfirm }: IVoteProps) {
  const [answer, setAnswer] = React.useState<boolean | null>(null);
  const [voteDisabled, setVoteDisabled] = React.useState<boolean>(false);

  const handleOnConfirm = React.useCallback(() => {
    if (answer !== null) {
      setVoteDisabled(true);
      setTimeout(() => onConfirm(answer), 1000);
    }
  }, [answer, onConfirm]);

  return (
    <div className={css.vote}>
      <div className={css.name}>{proposalName}</div>
      <VoteRadio disabled={voteDisabled} answer={answer} onChange={setAnswer} />
      <Slider disabled={answer === null} onDone={handleOnConfirm} />
    </div>
  );
}
