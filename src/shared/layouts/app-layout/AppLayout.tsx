type IAppLayoutProps = React.PropsWithChildren;
import { Navigation } from "app/navigation";
import css from "./styles.module.scss";

export function AppLayout({ children }: IAppLayoutProps) {
  return (
    <div className={css.layout}>
      {children}
      <Navigation />
    </div>
  );
}
