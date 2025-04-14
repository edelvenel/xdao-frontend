import cn from "classnames";
import css from "./styles.module.scss";

interface IBadgeProps {
  text: string;
  variant: "yellow" | "blue";
}

export function Badge({ text, variant }: IBadgeProps) {
  return <div className={cn(css.badge, css[variant])}>{text}</div>;
}
