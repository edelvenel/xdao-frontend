import cn from "classnames";
import css from "./styles.module.scss";

interface IBadgeProps {
  status: "active" | "pending";
}

export function Badge({ status }: IBadgeProps) {
  return <div className={cn(css.badge, css[status])}>{status}</div>;
}
