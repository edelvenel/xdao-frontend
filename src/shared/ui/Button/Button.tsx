import cn from "classnames";
import css from "./styles.module.scss";

interface IButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: "primary" | "secondary";
}

export function Button({
  variant = "primary",
  children,
  ...props
}: IButtonProps) {
  return (
    <button className={cn(css.button, css[variant])} {...props}>
      {children}
    </button>
  );
}
