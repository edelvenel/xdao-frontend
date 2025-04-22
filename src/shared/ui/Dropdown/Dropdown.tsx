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
import { hapticFeedback } from "shared/utils/hapticFeedback";
import css from "./styles.module.scss";

const DEFAULT_DROPDOWN_MATCHER = (a: unknown, b: unknown) => a === b;

const DEFAULT_DROPDOWN_OPTION_LABEL = (option: unknown) => String(option);

interface IDropdownProps<T> {
  selected: T | null;
  options: T[];
  label?: string;
  placeholder?: string;
  className?: string;
  optionLogo?: (option: T) => string;
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
  optionLogo,
  matcher = DEFAULT_DROPDOWN_MATCHER,
  optionLabel = DEFAULT_DROPDOWN_OPTION_LABEL,
  onSelect,
}: IDropdownProps<T>) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const { refs, floatingStyles, context } = useFloating({
    middleware: [
      offset(8),
      size({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            minWidth: `${rects.reference.width}px`,
          });
        },
      }),
      autoPlacement({ alignment: "end" }),
    ],
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
  });

  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

  const handleOnClick = React.useCallback(
    (option: T) => {
      hapticFeedback("select");
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
        <span className={cn(css.option, !selected && css.placeholder)}>
          {!selected && placeholder && <span>{placeholder}</span>}
          {optionLogo && selected && (
            <div
              className={css.logo}
              style={{ backgroundImage: `url(${optionLogo(selected)})` }}
            />
          )}
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
          {options.map((option, index) => {
            return (
              <div
                key={index}
                className={cn(
                  css.option,
                  selected && matcher(option, selected) && css.active,
                  optionLogo ? css.paddingWithLogo : css.paddingWithoutLogo
                )}
                onClick={() => handleOnClick(option)}
              >
                <div className={css.optionInfo}>
                  {optionLogo && (
                    <div
                      className={css.logo}
                      style={{ backgroundImage: `url(${optionLogo(option)})` }}
                    />
                  )}
                  <span className={css.label}>{optionLabel(option)}</span>
                </div>
                {selected && matcher(option, selected) && <Icon.Common.Check />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
