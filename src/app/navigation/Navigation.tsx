import { Route } from "app/router/routes";
import React from "react";
import { Icon } from "shared/icons";
import { NavigationItem } from "./components/navigation-item";
import css from "./styles.module.scss";

export const Navigation = React.memo(function Navigation() {
  return (
    <div className={css.navigation}>
      <NavigationItem
        to={Route.Home}
        icon={<Icon.Navigation.Home />}
        label="Home"
      />
      <NavigationItem
        to={Route.Earn}
        icon={<Icon.Navigation.Earn />}
        label="Earn"
      />
      <NavigationItem
        to={Route.Friends}
        icon={<Icon.Navigation.Friends />}
        label="Friends"
      />
    </div>
  );
});
