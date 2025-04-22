import cn from "classnames";
import { motion } from "motion/react";
import React from "react";
import toast from "react-hot-toast";
import { Icon } from "shared/icons";
import { hapticFeedback } from "shared/utils/hapticFeedback";
import css from "./styles.module.scss";

interface ICopyProps {
  text: string;
}

export function Copy({ text }: ICopyProps) {
  const [isCopied, setIsCopied] = React.useState<boolean>(false);

  const handleOnClick = React.useCallback(async () => {
    hapticFeedback("press");
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      toast.success("Copied to clipboard");
    } catch {
      toast.error("Unable to copy to clipboard");
    }
  }, [text]);

  React.useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    }
  }, [isCopied]);

  return (
    <div
      className={cn(css.copy, isCopied && css.copied)}
      onClick={handleOnClick}
    >
      {!isCopied && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <Icon.Common.Copy />
        </motion.div>
      )}
      {isCopied && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <Icon.Common.Check />
        </motion.div>
      )}
    </div>
  );
}
