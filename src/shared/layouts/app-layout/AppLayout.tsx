type IAppLayoutProps = React.PropsWithChildren;
import { Header } from "app/header";
import { Navigation } from "app/navigation";
import cn from "classnames";
import React from "react";
import { store } from "shared/store";
import css from "./styles.module.scss";

export function AppLayout({ children }: IAppLayoutProps) {
  // const [navigationBlockHeight, setNavigationBlockHeight] =
  //   React.useState<string>("0px");
  const { isMenuShown, isHeaderShown, isBackground } = store.useApp();

  const paddingBottom: number = React.useMemo(
    () => (isMenuShown ? 130 : 20),
    [isMenuShown]
  );

  // React.useEffect(() => {
  //   function getElementHeight(element: HTMLElement): string {
  //     return element.style.height;
  //   }

  // const element = document.getElementById("navigation-block");

  //   if (element != null && isMenuShown) {
  //     setNavigationBlockHeight(getElementHeight(element));
  //   } else {
  //     setNavigationBlockHeight("0px");
  //   }
  // }, [isMenuShown]);

  return (
    <div
      className={cn(css.layout, isBackground && css.background)}
      style={{ paddingBottom }}
    >
      {isHeaderShown && <Header />}
      {children}
      {isMenuShown && <Navigation />}
    </div>
  );
}
