import cn from "classnames";
import { PropsWithChildren } from "react";
import { Icon } from "shared/icons";
import css from "./styles.module.scss";

interface ICollapseProps extends PropsWithChildren {
  label: string;
  isOpen: boolean;
  onClick: () => void;
}

export function Collapse({ label, isOpen, children, onClick }: ICollapseProps) {
  return (
    <div className={css.collapse}>
      <div className={css.title} onClick={onClick}>
        {label}
        <div className={cn(css.icon, isOpen && css.reversed)}>
          <Icon.Common.ChevronDown />
        </div>
      </div>
      {isOpen && <div className={css.content}>{children}</div>}
    </div>
  );
}
