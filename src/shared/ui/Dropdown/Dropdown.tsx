import {
  autoPlacement,
  autoUpdate,
  offset,
  size,
  useDismiss,
  useFloating,
  useInteractions,
} from "@floating-ui/react";
import cn from "classnames";
import React from "react";
import { Icon } from "shared/icons";
import css from "./styles.module.scss";

const DEFAULT_DROPDOWN_MATCHER = (a: unknown, b: unknown) => a === b;

const DEFAULT_DROPDOWN_OPTION_LABEL = (option: unknown) => String(option);

interface IDropdownProps<T> {
  selected: T | null;
  options: T[];
  label?: string;
  placeholder?: string;
  className?: string;
  matcher?: (a: T, b: T) => boolean;
  optionLabel?: (option: T) => string;
  onSelect: (option: T) => void;
}

export function Dropdown<T>({
  selected,
  options,
  label,
  placeholder,
  className,
  matcher = DEFAULT_DROPDOWN_MATCHER,
  optionLabel = DEFAULT_DROPDOWN_OPTION_LABEL,
  onSelect,
}: IDropdownProps<T>) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const { refs, floatingStyles, context } = useFloating({
    middleware: [
      offset(4),
      size({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            minWidth: `${rects.reference.width}px`,
          });
        },
      }),
      autoPlacement({ alignment: "start" }),
    ],
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
  });

  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

  const handleOnClick = React.useCallback(
    (option: T) => {
      setIsOpen(false);
      onSelect(option);
    },
    [onSelect]
  );

  return (
    <div className={cn(css.dropdown, className)}>
      <div
        ref={refs.setReference}
        className={css.selected}
        onClick={() => setIsOpen(!isOpen)}
        {...getReferenceProps()}
      >
        <span className={css.option}>
          {!selected && placeholder && <span>{placeholder}</span>}
          {label && <span>{label}: </span>}
          {selected && <span>{optionLabel(selected)}</span>}
        </span>
        <Icon.Common.ChevronDown
          className={cn(css.icon, isOpen && css.reversed)}
        />
      </div>
      {isOpen && (
        <div
          ref={refs.setFloating}
          className={css.options}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          {options.map((option) => {
            return (
              <div
                className={cn(
                  css.option,
                  selected && matcher(option, selected) && css.active
                )}
                onClick={() => handleOnClick(option)}
              >
                <span className={css.label}>{optionLabel(option)}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
