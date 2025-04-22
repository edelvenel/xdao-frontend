import cn from "classnames";
import React from "react";
import { Icon } from "shared/icons";
import { hapticFeedback } from "shared/utils/hapticFeedback";
import css from "./styles.module.scss";

const setLabel = (value: number): string => {
  return value.toString();
};

interface IInputStepProps {
  step?: number;
  min?: number;
  max?: number;
  current: number;
  renderLabel?: (value: number) => string;
  onChange: (value: number) => void;
}

export function InputStep({
  step = 1,
  min = 0,
  max = 100,
  current,
  renderLabel = setLabel,
  onChange,
}: IInputStepProps) {
  const isDecrementDisabled: boolean = React.useMemo(
    () => current - step < min,
    [current, min, step]
  );
  const isIncrementDisabled: boolean = React.useMemo(
    () => current + step > max,
    [current, max, step]
  );

  const handleOnChange = React.useCallback(
    (value: number) => {
      hapticFeedback("press");
      onChange(value);
    },
    [onChange]
  );

  return (
    <div className={css.inputStep}>
      <button
        className={cn(
          css.button,
          css.decrement,
          isDecrementDisabled && css.disabled
        )}
        disabled={isDecrementDisabled}
        onClick={() => handleOnChange(current - step)}
      >
        <Icon.Common.Minus />
      </button>
      <div className={css.label}>{renderLabel(current)}</div>
      <button
        className={cn(
          css.button,
          css.increment,
          isIncrementDisabled && css.disabled
        )}
        disabled={isIncrementDisabled}
        onClick={() => handleOnChange(current + step)}
      >
        <Icon.Common.Plus />
      </button>
    </div>
  );
}
