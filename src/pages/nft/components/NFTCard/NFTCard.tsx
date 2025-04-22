import React from "react";
import toast from "react-hot-toast";
import { Icon } from "shared/icons";
import { INft } from "shared/types";
import { hapticFeedback } from "shared/utils/haptic";
import css from "./styles.module.scss";

interface INFTCardProps {
  nft: INft;
}

export function NFTCard({ nft }: INFTCardProps) {
  const handleOnScan = React.useCallback(() => {
    hapticFeedback("press");
    toast.error("Unimplemented");
  }, []);

  const handleOnSendNFT = React.useCallback(() => {
    hapticFeedback("press");
    toast.error("Unimplemented");
  }, []);

  return (
    <div className={css.nftCard}>
      <div className={css.content}>
        <div className={css.leftColumn}>
          <div className={css.hash}>NFT #{nft.hash}</div>
          <div
            className={css.image}
            style={{ backgroundImage: `url(${nft.imgUrl})` }}
          />
        </div>
        <div className={css.rightColumn}>
          <div className={css.id}>ID:{nft.id}</div>
          <div className={css.block} onClick={handleOnScan}>
            TON Scan
            <div className={css.icon}>
              <Icon.Common.Chain />
            </div>
          </div>
          <div className={css.block} onClick={handleOnSendNFT}>
            Send NFT
            <div className={css.icon}>
              <Icon.Common.TinyLink />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
