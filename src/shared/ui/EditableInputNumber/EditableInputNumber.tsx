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
  onCancel: () => void;
}

export function EditableInputNumber({
  fieldName,
  onMaxAmount,
  onUpdate,
  onSave,
  onCancel,
  ...props
}: IEditableInputNumberProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const handleOnClick = React.useCallback(() => {
    hapticFeedback("press");
    if (isEdit) {
      onSave();
    }
    setIsEdit(!isEdit);
  }, [isEdit, onSave]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsEdit(false);
        onCancel();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onCancel]);

  return (
    <div ref={ref} className={css.editableInputNumber}>
      <InputNumber
        fieldName={fieldName}
        value={props.value}
        onMaxAmount={onMaxAmount}
        onUpdate={onUpdate}
        {...props}
      />

      <div className={css.modeButton} onClick={handleOnClick}>
        {!isEdit ? (
          <Icon.Common.Edit />
        ) : (
          <div className={css.confirmButton}>Confirm</div>
        )}
      </div>
    </div>
  );
}
