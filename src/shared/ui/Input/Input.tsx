import cn from "classnames";
import { AnimatePresence, motion } from "motion/react";
import React from "react";
import css from "./styles.module.scss";

interface IInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  fieldName?: string;
}

export function Input({
  fieldName,
  value,
  placeholder,
  ...props
}: IInputProps) {
  const [isFocused, setIsFocused] = React.useState<boolean>(false);

  const isNameShown = React.useMemo(() => {
    if (!fieldName) {
      return false;
    }
    if (value || isFocused) {
      return true;
    }
    return false;
  }, [fieldName, isFocused, value]);

  return (
    <div className={cn(css.inputField, fieldName && css.withName)}>
      <AnimatePresence initial={true}>
        {!isNameShown && (
          <motion.div
            key={"placeholder"}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className={css.placeholder}
          >
            {placeholder}
          </motion.div>
        )}
      </AnimatePresence>
      <div className={css.field}>
        {!!fieldName && <div className={css.fieldName}>{fieldName}</div>}
        <input
          className={cn(css.input, !!fieldName && css.withName)}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
          value={value}
          {...props}
        />
      </div>
    </div>
  );
}
