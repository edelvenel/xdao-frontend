import cn from "classnames";
import React from "react";
import { hapticFeedback } from "shared/utils/haptic";
import css from "./styles.module.scss";

interface IButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: "primary" | "secondary" | "accent" | "tetriary";
}

export function Button({
  variant = "primary",
  children,
  className,
  onClick,
  ...props
}: IButtonProps) {
  const handleOnClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      hapticFeedback("press");
      if (onClick) {
        onClick(event);
      }
    },
    [onClick]
  );

  return (
    <button
      onClick={handleOnClick}
      className={cn(css.button, css[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
