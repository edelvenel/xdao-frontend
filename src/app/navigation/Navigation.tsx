import { Route } from "app/router/routes";
import React from "react";
import { Icon } from "shared/icons";
import { NavigationItem } from "./components/navigation-item";
import css from "./styles.module.scss";

export const Navigation = React.memo(function Navigation() {
  return (
    <div className={css.navigation}>
      <NavigationItem
        to={Route.ProposalList}
        icon={<Icon.Navigation.Home />}
        label="Home"
      />
      <NavigationItem
        to={Route.DaoList}
        icon={<Icon.Navigation.DAOs />}
        label="DAOs"
      />
      <NavigationItem
        to={Route.Profile}
        icon={<Icon.Navigation.Profile />}
        label="Profile"
      />
    </div>
  );
});
