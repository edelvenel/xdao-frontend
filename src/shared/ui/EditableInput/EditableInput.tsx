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
  onCancel: () => void;
}

export function EditableInput({
  onSave,
  onCancel,
  ...props
}: IEditableInputProps) {
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
    <div ref={ref} className={css.editableInput}>
      <Input
        value={props.value}
        disabled={!isEdit}
        onChange={props.onChange}
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
