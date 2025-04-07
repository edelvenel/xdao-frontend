import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { store } from "shared/store";
import css from "./styles.module.scss";

export function TopContent({ children }: PropsWithChildren) {
  const { topContentElement } = store.useApp();

  if (!topContentElement) {
    return null;
  }

  return createPortal(
    <div className={css.topContent}>{children}</div>,
    topContentElement
  );
}
