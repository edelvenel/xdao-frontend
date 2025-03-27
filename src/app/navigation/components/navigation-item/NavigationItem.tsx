import { Route, routes } from "app/router/routes";
import cn from "classnames";
import { Link, useLocation } from "react-router";

import css from "./styles.module.scss";

interface INavigationIconProps {
  to: Route;
  icon: React.ReactNode;
  label: string;
}

export function NavigationItem({ to, icon, label }: INavigationIconProps) {
  const location = useLocation();

  return (
    <Link
      to={routes[to]}
      className={cn(
        css.navigationItem,
        location.pathname.includes(routes[to]) && css.active // TODO: includes not reliable, refactor
      )}
    >
      <div className={css.icon}>{icon}</div>
      <div className={css.label}>{label}</div>
    </Link>
  );
}
