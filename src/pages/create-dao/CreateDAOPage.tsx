import React from "react";
import toast from "react-hot-toast";
import { useBackButton } from "shared/hooks/useBackButton";
import { store } from "shared/store";
import { Button } from "shared/ui/Button";
import { Input } from "shared/ui/Input";
import { Title } from "shared/ui/Title";
import { TabEqual } from "./components/TabEqual";
import { TabProportional } from "./components/TabProportional";
import { Tabs } from "./components/Tabs";
import { ITab } from "./components/Tabs/types";
import css from "./styles.module.scss";

export const CreateDAOPage = React.memo(function CreateDAOPage() {
  const [daoName, setDaoName] = React.useState<string>("");
  const [daoTokenName, setDaoTokenName] = React.useState<string>("");
  const [daoTokenSymbol, setDaoTokenSymbol] = React.useState<string>("");
  const [selectedTabIdx, setSelectedTabIdx] = React.useState<number>(0);
  const [walletAddresses, setWalletAddresses] = React.useState<string[]>([
    "",
    "",
    "",
  ]);
  const [consensus, setConsensus] = React.useState<number>(1);
  const [consensusPercent, setConsensusPercent] = React.useState<number>(50);
  const { setIsHeaderShown, setIsMenuShown } = store.useApp();

  useBackButton();

  const tabs: ITab[] = React.useMemo(() => {
    return [
      {
        title: "Equal",
        content: (
          <TabEqual
            walletAddresses={walletAddresses}
            setWalletAddresses={setWalletAddresses}
            consensus={consensus}
            setConsensus={setConsensus}
          />
        ),
      },
      {
        title: "Proportional",
        content: (
          <TabProportional
            onInfo={() => toast.error("Unimplemented")}
            currentConsensus={consensusPercent}
            setCurrentConsensus={setConsensusPercent}
          />
        ),
      },
    ];
  }, [consensus, consensusPercent, walletAddresses]);

  React.useEffect(() => {
    setIsHeaderShown(true);
    setIsMenuShown(true);
  }, [setIsHeaderShown, setIsMenuShown]);

  return (
    <div className={css.page}>
      <div className={css.block}>
        <Title value="Create DAO" variant="medium" />
        <Input
          value={daoName}
          placeholder="Create DAO name"
          onChange={(e) => setDaoName(e.target.value)}
        />
        <Input
          value={daoTokenName}
          placeholder="Create DAO name"
          onChange={(e) => setDaoTokenName(e.target.value)}
        />
        <Input
          value={daoTokenSymbol}
          placeholder="Create DAO token symbol"
          onChange={(e) => setDaoTokenSymbol(e.target.value)}
        />
      </div>

      <Tabs
        selectedTabIdx={selectedTabIdx}
        onSelect={setSelectedTabIdx}
        tabs={tabs}
      />

      <div className={css.createButton}>
        <Button onClick={() => toast.error("Unimplemented")}>Create</Button>
      </div>
    </div>
  );
});
