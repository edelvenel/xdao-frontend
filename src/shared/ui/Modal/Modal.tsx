import cn from "classnames";
import React from "react";
import { createPortal } from "react-dom";
import { Icon } from "shared/icons";
import { hapticFeedback } from "shared/utils/haptic";
import { Title } from "../Title";
import css from "./styles.module.scss";

interface IModalProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  onClose: () => void;
}

export function Modal({ children, title, className, onClose }: IModalProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const handleOnClose = React.useCallback(() => {
    hapticFeedback("press");
    onClose();
  }, [onClose]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return createPortal(
    <div className={css.overlay}>
      <div ref={ref} className={cn(css.modal, className)}>
        <div className={css.closeButton} onClick={handleOnClose}>
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
