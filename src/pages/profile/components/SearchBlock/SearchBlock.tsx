import { Icon } from "shared/icons";
import { IconButton } from "shared/ui/IconButton";
import { Search } from "shared/ui/Search";
import css from "./styles.module.scss";

interface ISearchBlockProps {
  searchText: string;
  onChange: (value: string) => void;
  onCreate: () => void;
}

export function SearchBlock({
  searchText,
  onChange,
  onCreate,
}: ISearchBlockProps) {
  return (
    <div className={css.searchBlock}>
      <div className={css.input}>
        <Search
          value={searchText}
          placeholder="Search proposals"
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <IconButton onClick={onCreate}>
        <Icon.Common.Plus />
      </IconButton>
    </div>
  );
}
