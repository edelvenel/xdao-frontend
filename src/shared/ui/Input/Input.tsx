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
    if (value || isFocused) {
      return true;
    }
    return false;
  }, [isFocused, value]);

  return (
    <div
      className={cn(css.inputField, isNameShown && fieldName && css.withName)}
    >
      <AnimatePresence initial={false} mode={"popLayout"}>
        {isNameShown && fieldName && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            className={css.fieldName}
          >
            {fieldName}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div>
        <input
          className={cn(css.input, isNameShown && fieldName && css.withName)}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
          value={value}
          placeholder={isNameShown ? "" : placeholder}
          {...props}
        />
      </motion.div>
    </div>
  );
}
