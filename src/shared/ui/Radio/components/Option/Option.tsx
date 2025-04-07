import cn from "classnames";
import { PropsWithChildren } from "react";
import { Icon } from "shared/icons";
import css from "./styles.module.scss";

interface IOptionProps extends PropsWithChildren {
  selected: boolean;
  onClick: () => void;
}

export function Option({ selected, children, onClick }: IOptionProps) {
  return (
    <div className={cn(css.option, selected && css.selected)} onClick={onClick}>
      <div className={css.icon}>
        {selected ? (
          <Icon.Special.FilledRadioCheck />
        ) : (
          <Icon.Special.EmptyRadio />
        )}
      </div>
      {children}
    </div>
  );
}
