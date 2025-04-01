import { Icon } from "shared/icons";
import css from "./styles.module.scss";

export function Header() {
  return (
    <div className={css.header}>
      <Icon.Special.Logo />
      <div className={css.info}>
        <div className={css.infoButton}>
          <Icon.Common.Question />
        </div>
        <div className={css.user}>
          <span>UQD4...7CA</span>
          <div className={css.icon}>
            <Icon.Common.User />
          </div>
        </div>
      </div>
    </div>
  );
}
