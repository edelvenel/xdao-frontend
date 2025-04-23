import React from "react";
import { hapticFeedback } from "shared/utils/haptic";
import css from "./styles.module.scss";

interface IInputAmountProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  fieldName?: string;
  onMaxAmount?: () => void;
  onUpdate: (value: string) => void;
}

export function InputNumber({
  onMaxAmount,
  onUpdate,
  max,
  min,
  ...props
}: IInputAmountProps) {
  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> =
    React.useCallback(
      (e) => {
        const chars: string[] = [];
        let dotCount = 0;
        let index = 0;
        for (const char of e.target.value) {
          if (char === ".") {
            if (index === 0) {
              chars.push("0");
            }
            dotCount++;
            if (dotCount <= 1) {
              chars.push(char);
              dotCount++;
            }
          } else if (/\d/.test(char)) {
            chars.push(char);
          }
          index++;
        }

        const result = chars.join("");

        if (max && Number(result) > Number(max)) {
          onUpdate(String(max));
          return;
        }

        if (min && Number(result) < Number(min)) {
          onUpdate(String(min));
          return;
        }

        onUpdate(result);
      },
      [max, min, onUpdate]
    );

  const handleOnMaxAmount = React.useCallback(() => {
    if (onMaxAmount) {
      hapticFeedback("press");
      onMaxAmount();
    }
  }, [onMaxAmount]);

  return (
    <div className={css.inputNumber}>
      <input
        value={props.value}
        className={css.input}
        {...props}
        onChange={handleOnChange}
      />
      {onMaxAmount && (
        <div className={css.maxButton} onClick={handleOnMaxAmount}>
          MAX
        </div>
      )}
    </div>
  );
}
