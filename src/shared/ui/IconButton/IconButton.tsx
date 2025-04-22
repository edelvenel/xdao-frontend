import cn from "classnames";
import React from "react";
import { hapticFeedback } from "shared/utils/hapticFeedback";
import css from "./styles.module.scss";

interface IIconButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: "primary" | "secondary";
}

export function IconButton({
  variant = "primary",
  children,
  className,
  onClick,
  ...props
}: IIconButtonProps) {
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
      className={cn(css.iconButton, css[variant], className)}
      onClick={handleOnClick}
      {...props}
    >
      {children}
    </button>
  );
}
