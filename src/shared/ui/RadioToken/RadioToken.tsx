import { IToken } from "shared/types";
import { Option } from "./components/Option";
import css from "./styles.module.scss";

interface IRadioTokenProps {
  selected: IToken;
  options: IToken[];
  onSelect: (option: IToken) => void;
}

export function RadioToken({ selected, options, onSelect }: IRadioTokenProps) {
  return (
    <div className={css.radio}>
      {options.map((option, index) => (
        <Option
          key={index}
          selected={selected.id === option.id}
          onClick={() => onSelect(option)}
          value={option}
        />
      ))}
    </div>
  );
}
