type IAppLayoutProps = React.PropsWithChildren;
import { Header } from "app/header";
import { Navigation } from "app/navigation";
import css from "./styles.module.scss";

export function AppLayout({ children }: IAppLayoutProps) {
  return (
    <div className={css.layout}>
      <Header />
      {children}
      <Navigation />
    </div>
  );
}
