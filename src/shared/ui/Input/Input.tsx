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

  return (
    <div className={cn(css.inputField, fieldName && css.withName)}>
      <AnimatePresence initial={false}>
        {!isFocused && !value && (
          <motion.div
            key={"placeholder"}
            className={css.placeholder}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: "tween", ease: "anticipate" }}
          >
            {placeholder}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        className={css.field}
        animate={{ opacity: isFocused || value ? 1 : 0 }}
      >
        {(isFocused || value) && !!fieldName && (
          <div className={css.fieldName}>{fieldName}</div>
        )}
        <input
          className={cn(css.input, !!fieldName && css.withName)}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
          value={value}
          {...props}
        />
      </motion.div>
    </div>
  );
}
