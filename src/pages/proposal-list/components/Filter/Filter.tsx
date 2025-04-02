import React, { PropsWithChildren } from "react";
import { Icon } from "shared/icons";
import { Button } from "shared/ui/Button";
import css from "./styles.module.scss";

interface IFilterProps {
  selected: number;
  options: string[];
  onApply: (index: number) => void;
  onClose: () => void;
}

export function Filter({ selected, options, onApply, onClose }: IFilterProps) {
  const [selectedIdx, setSelectedIdx] = React.useState<number>(selected);

  const handleOnApply = React.useCallback(() => {
    onApply(selectedIdx);
    onClose();
  }, [onApply, onClose, selectedIdx]);

  return (
    <div className={css.filter}>
      <div className={css.filterList}>
        {options.map((option, index) => (
          <FilterOption
            key={index}
            selected={index === selectedIdx}
            onClick={() => setSelectedIdx(index)}
          >
            {option}
          </FilterOption>
        ))}
      </div>
      <div className={css.button}>
        <Button onClick={handleOnApply}>Apply</Button>
      </div>
    </div>
  );
}

interface IFilterOptionProps extends PropsWithChildren {
  selected: boolean;
  onClick: () => void;
}

function FilterOption({ selected, children, onClick }: IFilterOptionProps) {
  return (
    <div className={css.option} onClick={onClick}>
      <div className={css.value}>{children}</div>
      {selected ? <Icon.Special.FilledRadio /> : <Icon.Special.EmptyRadio />}
    </div>
  );
}
