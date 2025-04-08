import cn from "classnames";
import { IToken } from "shared/types";
import css from "./styles.module.scss";

interface IOptionProps {
  selected: boolean;
  value: IToken;
  onClick: () => void;
}

export function Option({ selected, value, onClick }: IOptionProps) {
  return (
    <div className={cn(css.option, selected && css.selected)} onClick={onClick}>
      <div className={css.leftSide}>
        <div
          className={css.logo}
          style={{ backgroundImage: `url(${value.imgUrl})` }}
        />
        <div className={css.name}>{value.name}</div>
      </div>
      <div className={css.numbers}>
        <div className={css.amount}>{value.amount}</div>
        <div className={css.rate}>${value.rate}</div>
      </div>
    </div>
  );
}
