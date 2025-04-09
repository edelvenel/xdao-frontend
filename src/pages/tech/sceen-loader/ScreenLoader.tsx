import { Loader } from "./components/Loader";
import css from "./styles.module.scss";

export function ScreenLoader() {
  return (
    <div className={css.page}>
      <div className={css.fontLoader}>
        <div className={css.regular}>Loader</div>
      </div>
      <Loader />
    </div>
  );
}
