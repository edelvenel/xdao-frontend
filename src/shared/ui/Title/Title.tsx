import cn from "classnames";
import css from "./styles.module.scss";

interface ITitleProps {
  value: string;
  variant: "large" | "medium";
}

export function Title({ value, variant }: ITitleProps) {
  return <div className={cn(css.title, css[variant])}>{value}</div>;
}
