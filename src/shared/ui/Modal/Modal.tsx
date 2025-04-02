import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { Icon } from "shared/icons";
import { Title } from "../Title";
import css from "./styles.module.scss";

interface IModalProps extends PropsWithChildren {
  title?: string;
  onClose: () => void;
}

export function Modal({ children, title, onClose }: IModalProps) {
  return createPortal(
    <div className={css.overlay}>
      <div className={css.modal}>
        <div className={css.header}>
          {title && <Title variant="large" value={title} />}
          <div className={css.closeButton} onClick={onClose}>
            <Icon.Common.Cancel />
          </div>
        </div>
        <div className={css.content}>{children}</div>
      </div>
    </div>,
    document.body
  );
}
