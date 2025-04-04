import cn from "classnames";
import { createPortal } from "react-dom";
import { Icon } from "shared/icons";
import { Title } from "../Title";
import css from "./styles.module.scss";

interface IModalProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  onClose: () => void;
}

export function Modal({ children, title, className, onClose }: IModalProps) {
  return createPortal(
    <div className={css.overlay}>
      <div className={cn(css.modal, className)}>
        <div className={css.closeButton} onClick={onClose}>
          <Icon.Common.Cancel />
        </div>
        <div className={css.header}>
          {title && (
            <div className={css.title}>
              <Title variant="large" value={title} />
            </div>
          )}
        </div>
        <div className={css.content}>{children}</div>
      </div>
    </div>,
    document.body
  );
}
