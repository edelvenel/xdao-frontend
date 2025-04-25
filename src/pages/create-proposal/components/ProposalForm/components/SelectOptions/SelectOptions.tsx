import cn from "classnames";
import React from "react";
import { Icon } from "shared/icons";
import { IOptionWithNote } from "shared/types";
import { Button } from "shared/ui/Button";
import { Dropdown } from "shared/ui/Dropdown";
import { Input } from "shared/ui/Input";
import { objectIdMatcher } from "shared/utils/Mathcer";
import css from "./styles.module.scss";

const OPTIONS_VALUES: string[][] = [
  ["Yes", "No"],
  ["Approve", "Reject"],
  ["For", "Against", "Abstain"],
];

const OPTIONS: IOptionWithNote[] = [
  { id: 0, value: "Yes / No" },
  { id: 1, value: "Approve / Reject" },
  { id: 2, value: "For / Against / Abstain" },
  { id: 3, value: "Custom", note: "(up to 10 options)" },
];

interface ISelectOptionsProps {
  value: string[];
  setValue: (value: string[]) => void;
}

export function SelectOptions({ value, setValue }: ISelectOptionsProps) {
  const [isCustom, setIsCustom] = React.useState<boolean>(false);
  const [selected, setSelected] = React.useState<IOptionWithNote | null>(null);
  const [options, setOptions] = React.useState<string[]>(value);

  const handleOnSelect = React.useCallback(
    (option: IOptionWithNote) => {
      setSelected(option);

      switch (option.id) {
        case 0: {
          setValue([...OPTIONS_VALUES[0]]);
          break;
        }
        case 1: {
          setValue([...OPTIONS_VALUES[1]]);
          break;
        }
        case 2: {
          setValue([...OPTIONS_VALUES[2]]);
          break;
        }
        default:
          break;
      }
    },
    [setValue]
  );

  const handleOptionLabel = React.useCallback(
    (option: IOptionWithNote) => {
      if (option.note) {
        return (
          <div className={css.label}>
            <span
              className={cn(
                selected && option.id === selected?.id && css.selected
              )}
            >
              {option.value}
            </span>
            <div className={css.note}>{option.note}</div>
          </div>
        );
      } else {
        return option.value;
      }
    },
    [selected]
  );

  const handleOnAdd = React.useCallback(() => {
    if (options.length < 10) {
      setOptions((prev) => [...prev, ""]);
    }
  }, [options.length]);

  React.useEffect(() => {
    setIsCustom(selected?.id === 3);
  }, [selected]);

  return (
    <div className={css.selectOption}>
      <Dropdown
        placeholder="Select options"
        onSelect={handleOnSelect}
        options={OPTIONS}
        matcher={objectIdMatcher}
        optionLabel={handleOptionLabel}
        selected={selected}
      />

      {isCustom && (
        <div className={css.custom}>
          {options.map((option, index) => (
            <Input
              key={index}
              value={option}
              variant="secondary"
              fieldName={`Option ${index + 1}`}
              placeholder={`Enter option ${index + 1}`}
              onChange={(e) =>
                setOptions([
                  ...options.filter((_, idx) => idx < index),
                  e.target.value,
                  ...options.filter((_, idx) => idx > index),
                ])
              }
            />
          ))}
          <div className={css.actions}>
            {options.length < 10 && (
              <Button variant="tetriary" onClick={handleOnAdd}>
                <Icon.Common.Plus />
              </Button>
            )}
            <Button variant="primary" onClick={() => setValue(options)}>
              Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
