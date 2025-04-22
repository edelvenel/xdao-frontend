import React from "react";
import { Icon } from "shared/icons";
import { Textarea } from "../Textarea";
import css from "./styles.module.scss";

interface IEditableTextareaProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  value: string;
  onSave: () => void;
}

export function EditableTextarea({
  value,
  onSave,
  ...props
}: IEditableTextareaProps) {
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const handleOnClick = React.useCallback(() => {
    if (isEdit) {
      onSave();
    }
    setIsEdit(!isEdit);
  }, [isEdit, onSave]);

  return (
    <div className={css.editableTextarea}>
      <Textarea
        value={value}
        className={css.textarea}
        disabled={!isEdit}
        onInput={props.onInput}
        {...props}
      />

      <div className={css.modeButton} onClick={handleOnClick}>
        {!isEdit ? <Icon.Common.Edit /> : <Icon.Common.Check />}
      </div>
    </div>
  );
}
