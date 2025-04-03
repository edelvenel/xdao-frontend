type IAppLayoutProps = React.PropsWithChildren;
import { Header } from "app/header";
import { Navigation } from "app/navigation";
import { store } from "shared/store";
import css from "./styles.module.scss";

export function AppLayout({ children }: IAppLayoutProps) {
  const { navigationHeight } = store.useApp();
  return (
    <div
      className={css.layout}
      style={{ paddingBottom: `${navigationHeight}px` }}
    >
      <Header />
      {children}
      <Navigation />
    </div>
  );
}
