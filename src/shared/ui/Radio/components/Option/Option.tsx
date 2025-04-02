import cn from "classnames";
import { Icon } from "shared/icons";
import css from "./styles.module.scss";

interface IOptionProps {
  selected: boolean;
  value: string;
  onClick: () => void;
}

export function Option({ selected, value, onClick }: IOptionProps) {
  return (
    <div className={cn(css.option)} onClick={onClick}>
      <div className={css.icon}>
        {selected ? <Icon.Special.FilledRadio /> : <Icon.Special.EmptyRadio />}
      </div>
      {value}
    </div>
  );
}
