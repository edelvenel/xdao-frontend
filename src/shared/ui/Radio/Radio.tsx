import { Option } from "./components/Option";
import css from "./styles.module.scss";

interface IRadioProps {
  selectedIdx: number;
  options: string[];
  onSelect: (idx: number) => void;
}

export function Radio({ options, selectedIdx, onSelect }: IRadioProps) {
  return (
    <div className={css.radio}>
      {options.map((option, index) => (
        <Option
          key={index}
          value={option}
          selected={selectedIdx === index}
          onClick={() => onSelect(index)}
        />
      ))}
    </div>
  );
}
