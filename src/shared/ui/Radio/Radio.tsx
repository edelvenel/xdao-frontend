import { JSX } from "react";
import { Option } from "./components/Option";
import css from "./styles.module.scss";

const DEFAULT_RADIO_MATCHER = (a: unknown, b: unknown) => a === b;

interface IRadioProps<T> {
  selected: T;
  options: T[];
  onSelect: (option: T) => void;
  renderLabel: (option: T) => JSX.Element;
  matcher?: (a: T, b: T) => boolean;
}

export function Radio<T>({
  selected,
  options,
  onSelect,
  renderLabel,
  matcher = DEFAULT_RADIO_MATCHER,
}: IRadioProps<T>) {
  return (
    <div className={css.radio}>
      {options.map((option, index) => (
        <Option
          key={index}
          selected={matcher(selected, option)}
          onClick={() => onSelect(option)}
        >
          {renderLabel(option)}
        </Option>
      ))}
    </div>
  );
}
