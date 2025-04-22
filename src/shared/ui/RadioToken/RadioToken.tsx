import React from "react";
import { IToken } from "shared/types";
import { hapticFeedback } from "shared/utils/hapticFeedback";
import { Option } from "./components/Option";
import css from "./styles.module.scss";

interface IRadioTokenProps {
  selected: IToken;
  options: IToken[];
  onSelect: (option: IToken) => void;
}

export function RadioToken({ selected, options, onSelect }: IRadioTokenProps) {
  const handleOnSelect = React.useCallback(
    (option: IToken) => {
      hapticFeedback("select");
      onSelect(option);
    },
    [onSelect]
  );

  return (
    <div className={css.radio}>
      {options.map((option, index) => (
        <Option
          key={index}
          selected={selected.id === option.id}
          onClick={() => handleOnSelect(option)}
          value={option}
        />
      ))}
    </div>
  );
}
