import React from "react";
import { Icon } from "shared/icons";
import { hapticFeedback } from "shared/utils/haptic";
import { Input } from "../Input";
import css from "./styles.module.scss";

interface IEditableInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  onSave: () => void;
}

export function EditableInput({ onSave, ...props }: IEditableInputProps) {
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const handleOnClick = React.useCallback(() => {
    hapticFeedback("press");
    if (isEdit) {
      onSave();
    }
    setIsEdit(!isEdit);
  }, [isEdit, onSave]);

  return (
    <div className={css.editableInput}>
      <Input
        value={props.value}
        disabled={!isEdit}
        onChange={props.onChange}
        {...props}
      />

      <div className={css.modeButton} onClick={handleOnClick}>
        {!isEdit ? <Icon.Common.Edit /> : <Icon.Common.Check />}
      </div>
    </div>
  );
}
