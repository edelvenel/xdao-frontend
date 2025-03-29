import cn from "classnames";
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
  ...props
}: IIconButtonProps) {
  return (
    <button className={cn(css.iconButton, css[variant], className)} {...props}>
      {children}
    </button>
  );
}
