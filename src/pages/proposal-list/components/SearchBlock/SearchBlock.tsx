import { Icon } from "shared/icons";
import { IconButton } from "shared/ui/IconButton";
import { Search } from "shared/ui/Search";
import css from "./styles.module.scss";

export function SearchBlock() {
  return (
    <div className={css.searchBlock}>
      <div className={css.input}>
        <Search />
      </div>
      <IconButton variant="secondary">
        <div className={css.icon}>
          <Icon.Common.Filter />
        </div>
      </IconButton>
      <IconButton variant="secondary">
        <div className={css.icon}>
          <Icon.Common.Plus />
        </div>
      </IconButton>
      <IconButton>
        <div className={css.icon}>
          <Icon.Common.Plus />
        </div>
      </IconButton>
    </div>
  );
}
