import React, { PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import css from "./styles.module.scss";

export function TopContent({ children }: PropsWithChildren) {
  const [node, setNode] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    const element = document.getElementById("top-content");
    if (element) {
      setNode(element);
    } else {
      setNode(null);
    }
  }, []);

  return node
    ? createPortal(<div className={css.topContent}>{children}</div>, node)
    : null;
}
