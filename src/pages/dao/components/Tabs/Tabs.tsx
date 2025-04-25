import cn from "classnames";
import { motion } from "motion/react";
import React from "react";
import css from "./styles.module.scss";
import { ITab } from "./types";

interface ITabsProps {
  selectedTabIdx: number;
  tabs: ITab[];
  onSelect: (tabId: number) => void;
}

export function Tabs({ selectedTabIdx, tabs, onSelect }: ITabsProps) {
  const refContainer = React.useRef<HTMLDivElement>(null);
  const refScroll = React.useRef<HTMLDivElement>(null);
  const [isRightScroll, setIsRightScroll] = React.useState<boolean>(true);
  const [isLeftScroll, setIsLeftScroll] = React.useState<boolean>(false);

  React.useEffect(() => {
    const container = refContainer.current;
    const scroll = refScroll.current;

    if (container && scroll) {
      const handleOnScroll = () => {
        const diff = Math.abs(scroll.scrollWidth - container.offsetWidth);
        const scrollLeft = scroll.scrollLeft + 10;
        if (diff >= scrollLeft) {
          setIsRightScroll(true);
        } else {
          setIsRightScroll(false);
        }

        if (40 <= scrollLeft) {
          setIsLeftScroll(true);
        } else {
          setIsLeftScroll(false);
        }
      };

      scroll.addEventListener("scroll", handleOnScroll);

      return () => {
        scroll.removeEventListener("scroll", handleOnScroll);
      };
    }
  }, []);

  return (
    <div className={css.tabs}>
      <div ref={refContainer} className={css.tabListContainer}>
        {isLeftScroll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeInOut" }}
            className={css.leftShadow}
          />
        )}
        <div ref={refScroll} className={css.tabList}>
          {tabs.flatMap((tab, index) => (
            <div
              key={index}
              className={cn(
                css.tabButton,
                selectedTabIdx === index && css.selected
              )}
              onClick={() => onSelect(index)}
            >
              {tab.title}
            </div>
          ))}
        </div>
        {isRightScroll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeInOut" }}
            className={css.rightShadow}
          />
        )}
      </div>
      <div className={css.tabContent}>{tabs[selectedTabIdx].content}</div>
    </div>
  );
}
