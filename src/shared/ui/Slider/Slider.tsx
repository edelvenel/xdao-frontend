import cn from "classnames";
import { animate, AnimatePresence, motion, useMotionValue } from "motion/react";
import React from "react";
import { Icon } from "shared/icons";
import css from "./styles.module.scss";

const SLIDER_BUTTON_SIZE = 50;
const MAX_X_COMPENSATION = 5;

interface ISliderProps {
  disabled?: boolean;
  onDone: () => void;
}

export function Slider({ disabled = false, onDone }: ISliderProps) {
  const [isDragging, setIsDragging] = React.useState<boolean>(false);
  const [isConfirmed, setIsConfirmed] = React.useState<boolean>(false);
  const refConstrain = React.useRef<HTMLDivElement>(null);
  const [maxX, setMaxX] = React.useState<number>(0);

  const x = useMotionValue(0);

  const handleOnDragEnd = React.useCallback(() => {
    setIsDragging(false);

    if (x.get() >= maxX - MAX_X_COMPENSATION) {
      setIsConfirmed(true);
      onDone();
    } else {
      animate(x, 0, { duration: 0.2 });
    }
  }, [maxX, onDone, x]);

  React.useEffect(() => {
    const element = refConstrain.current;
    if (element) {
      setMaxX(element.getBoundingClientRect().width - SLIDER_BUTTON_SIZE);
    }
  }, []);

  return (
    <div
      className={cn(
        css.slider,
        isConfirmed && css.confirmed,
        disabled && css.disabled
      )}
    >
      <div ref={refConstrain} className={css.constrain}>
        <motion.div
          drag={isConfirmed || disabled ? undefined : "x"}
          dragElastic={0}
          dragConstraints={refConstrain}
          onDrag={() => setIsDragging(true)}
          onDragEnd={handleOnDragEnd}
          whileDrag={{ scale: 0.85 }}
          dragMomentum={false}
          className={css.slideButton}
          style={{ x }}
        >
          {isConfirmed ? <Icon.Common.Confirm /> : <Icon.Common.ChevronRight />}
        </motion.div>
        <AnimatePresence initial={false}>
          {!isDragging && (
            <motion.div
              className={css.text}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              {isConfirmed ? "Confirmed!" : "Slide to confirm"}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
