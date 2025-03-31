import { Icon } from "shared/icons";
import css from "./styles.module.scss";

export function Search({
  ...props
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) {
  return (
    <div className={css.search}>
      <div className={css.icon}>
        <Icon.Common.Search />
      </div>
      <input className={css.input} {...props} />
    </div>
  );
}
