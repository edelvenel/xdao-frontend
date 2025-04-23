import React from "react";
import { Icon } from "shared/icons";
import { hapticFeedback } from "shared/utils/haptic";
import { InputNumber } from "../InputNumber";
import css from "./styles.module.scss";

interface IEditableInputNumberProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  fieldName?: string;
  onMaxAmount?: () => void;
  onUpdate: (value: string) => void;
  onSave: () => void;
}

export function EditableInputNumber({
  fieldName,
  onMaxAmount,
  onUpdate,
  onSave,
  ...props
}: IEditableInputNumberProps) {
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const handleOnClick = React.useCallback(() => {
    hapticFeedback("press");
    if (isEdit) {
      onSave();
    }
    setIsEdit(!isEdit);
  }, [isEdit, onSave]);

  return (
    <div className={css.editableInputNumber}>
      <InputNumber
        fieldName={fieldName}
        value={props.value}
        onMaxAmount={onMaxAmount}
        onUpdate={onUpdate}
        {...props}
      />

      <div className={css.modeButton} onClick={handleOnClick}>
        {!isEdit ? <Icon.Common.Edit /> : <Icon.Common.Check />}
      </div>
    </div>
  );
}
