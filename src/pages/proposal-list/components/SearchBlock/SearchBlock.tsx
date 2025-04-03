import React from "react";
import { NAVIGATION_HEIGHT } from "shared/constants";
import { Icon } from "shared/icons";
import { store } from "shared/store";
import { IconButton } from "shared/ui/IconButton";
import { Search } from "shared/ui/Search";
import css from "./styles.module.scss";

const SEARCH_BLOCK_HEIGHT: number = 68;
const MARGIN_TOP: number = 20;

interface ISearchBlockProps {
  onChange: (value: string) => void;
  onFilter: () => void;
  onCreate: () => void;
}

export function SearchBlock({
  onChange,
  onFilter,
  onCreate,
}: ISearchBlockProps) {
  const { setNavigationHeight } = store.useApp();

  React.useEffect(() => {
    setNavigationHeight(NAVIGATION_HEIGHT + SEARCH_BLOCK_HEIGHT + MARGIN_TOP);
    return () => {
      setNavigationHeight(NAVIGATION_HEIGHT);
    };
  }, [setNavigationHeight]);

  return (
    <div className={css.searchBlock}>
      <div className={css.input}>
        <Search
          placeholder="Search proposals"
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <IconButton variant="secondary" onClick={onFilter}>
        <Icon.Common.Filter />
      </IconButton>
      <IconButton onClick={onCreate}>
        <Icon.Common.Plus />
      </IconButton>
    </div>
  );
}
