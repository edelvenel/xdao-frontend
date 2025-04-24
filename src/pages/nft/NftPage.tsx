import { NFTS } from "app/mocks/constants";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useBackButton } from "shared/hooks/useBackButton";
import { store } from "shared/store";
import { Button } from "shared/ui/Button";
import { Title } from "shared/ui/Title";
import { NFTCard } from "./components/NFTCard";
import css from "./styles.module.scss";

export const NftPage = React.memo(function NftPage() {
  const { setIsBackground, setIsHeaderShown, setIsMenuShown } = store.useApp();

  const navigate = useNavigate();
  useBackButton();

  React.useEffect(() => {
    setIsBackground(true);
    setIsHeaderShown(true);
    setIsMenuShown(false);
  }, [setIsBackground, setIsHeaderShown, setIsMenuShown]);

  return (
    <div className={css.page}>
      <Title value="NFT collection" variant="large" />
      <div className={css.info}>
        <div className={css.currency}>Total NFTs:</div>
        <div className={css.amount}>2</div>
      </div>
      {NFTS.map((nft) => (
        <NFTCard nft={nft} />
      ))}
      <div className={css.actions}>
        <Button variant="primary" onClick={() => toast.error("Unimplemented")}>
          Receive QR
        </Button>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
    </div>
  );
});
