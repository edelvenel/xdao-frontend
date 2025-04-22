import cn from "classnames";
import React from "react";
import { Icon } from "shared/icons";
import { hapticFeedback } from "shared/utils/haptic";
import css from "./styles.module.scss";

interface IVoteRadioProps {
  answer: boolean | null;
  disabled?: boolean;
  onChange: (value: boolean) => void;
}

export function VoteRadio({
  answer,
  disabled = false,
  onChange,
}: IVoteRadioProps) {
  const handleOnChange = React.useCallback(
    (value: boolean) => {
      if (!disabled) {
        hapticFeedback("select");
        onChange(value);
      }
    },
    [disabled, onChange]
  );
  return (
    <div className={css.voteRadio}>
      <div
        className={cn(css.option, disabled && css.disabled)}
        onClick={() => handleOnChange(true)}
      >
        <div className={css.checkbox}>
          {answer === true ? (
            <Icon.Special.FilledRadioCheck />
          ) : (
            <Icon.Special.EmptyRadio />
          )}
        </div>
        <span>Yes</span>
      </div>
      <div className={css.divider} />
      <div
        className={cn(css.option, disabled && css.disabled)}
        onClick={() => handleOnChange(false)}
      >
        <div className={css.checkbox}>
          {answer === false ? (
            <Icon.Special.FilledRadioCheck />
          ) : (
            <Icon.Special.EmptyRadio />
          )}
        </div>
        <span>No</span>
      </div>
    </div>
  );
}
