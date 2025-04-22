import toast from "react-hot-toast";
import { Icon } from "shared/icons";
import { INft } from "shared/types";
import css from "./styles.module.scss";

interface INFTCardProps {
  nft: INft;
}

export function NFTCard({ nft }: INFTCardProps) {
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
          <div
            className={css.block}
            onClick={() => toast.error("Unimplemented")}
          >
            TON Scan
            <div className={css.icon}>
              <Icon.Common.Chain />
            </div>
          </div>
          <div
            className={css.block}
            onClick={() => toast.error("Unimplemented")}
          >
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
