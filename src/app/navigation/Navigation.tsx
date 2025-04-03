import WebApp from "@twa-dev/sdk";
import { Route } from "app/router/routes";
import React from "react";
import { Icon } from "shared/icons";
import { NavigationItem } from "./components/navigation-item";
import css from "./styles.module.scss";

export const Navigation = React.memo(function Navigation() {
  const marginBottom = WebApp.safeAreaInset.bottom;
  return (
    <div className={css.navigation} style={{ bottom: `${marginBottom}px` }}>
      <div id="top-content" />
      <div className={css.menu}>
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
    </div>
  );
});
