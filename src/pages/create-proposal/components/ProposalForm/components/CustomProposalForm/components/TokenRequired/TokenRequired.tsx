import React from "react";
import { Icon } from "shared/icons";
import { Dropdown } from "shared/ui/Dropdown";
import { InputNumber } from "shared/ui/InputNumber";
import css from "./styles.module.scss";

const TOKEN_REQUIRED_OPTIONS = ["0", "1", "10", "Custom"];

interface ITokenRequiredProps {
  value: number | null;
  setValue: (value: number | null) => void;
}

export function TokenRequired({ value, setValue }: ITokenRequiredProps) {
  const [isCustom, setIsCustom] = React.useState<boolean>(false);
  const [selected, setSelected] = React.useState<string | null>(null);

  const handleOnSelect = React.useCallback(
    (option: string) => {
      setSelected(option);

      switch (option) {
        case "0": {
          setValue(0);
          break;
        }
        case "1": {
          setValue(1);
          break;
        }
        case "10": {
          setValue(10);
          break;
        }
        default:
          break;
      }
    },
    [setValue]
  );

  const handleOnRestore = React.useCallback(() => {
    setSelected(null);
    setValue(null);
  }, [setValue]);

  React.useEffect(() => {
    setIsCustom(selected === "Custom");
  }, [selected]);

  return (
    <div className={css.tokenRequired}>
      {!isCustom && (
        <Dropdown
          placeholder="Min token required"
          onSelect={handleOnSelect}
          options={TOKEN_REQUIRED_OPTIONS}
          selected={selected}
        />
      )}
      {isCustom && (
        <div className={css.custom}>
          <InputNumber
            className={css.inputNumber}
            value={value === null ? "" : value}
            min={0}
            fieldName="Token required"
            placeholder="Enter min tokens required to vote"
            onUpdate={(value) => setValue(Number(value))}
          />
          <div className={css.restoreButton} onClick={handleOnRestore}>
            <Icon.Common.Restore />
          </div>
        </div>
      )}
    </div>
  );
}
