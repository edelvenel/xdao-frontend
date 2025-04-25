import cn from "classnames";
import React from "react";
import { useNavigate } from "react-router";
import { useDaos } from "shared/api/daos";
import {
  ICreateDaoEqualPayload,
  ICreateDaoProportionalPayload,
} from "shared/api/daos/payloads";
import { useBackButton } from "shared/hooks/useBackButton";
import { store } from "shared/store";
import { DaoType } from "shared/types";
import { Button } from "shared/ui/Button";
import { Input } from "shared/ui/Input";
import { Modal } from "shared/ui/Modal";
import { Title } from "shared/ui/Title";
import { DaoCreateResult } from "./components/DaoCreateResult";
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
  const [isManualConsensus, setIsManualConsensus] =
    React.useState<boolean>(false);
  const [consensusPercent, setConsensusPercent] = React.useState<number>(50);
  const [isSuccess, setIsSuccess] = React.useState<boolean | null>(null);
  const [isOpenSetupInfoModal, setIsOpenSetupInfoModal] =
    React.useState<boolean>(false);
  const [isInfoOpen, setIsInfoOpen] = React.useState<boolean>(false);
  const { setIsHeaderShown, setIsMenuShown } = store.useApp();
  const { createDao } = useDaos();

  const navigate = useNavigate();

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
            onSetupInfo={() => setIsOpenSetupInfoModal(true)}
          />
        ),
      },
      {
        title: "Proportional",
        content: (
          <TabProportional
            isManualConsensus={isManualConsensus}
            setIsManualConsensus={setIsManualConsensus}
            onInfo={() => setIsInfoOpen(true)}
            currentConsensus={consensusPercent}
            setCurrentConsensus={setConsensusPercent}
          />
        ),
      },
    ];
  }, [consensus, consensusPercent, isManualConsensus, walletAddresses]);

  const handleOnCreate = React.useCallback(async () => {
    if (selectedTabIdx === 0) {
      const payload: ICreateDaoEqualPayload = {
        type: DaoType.Equal,
        daoName,
        daoTokenName,
        daoTokenSymbol,
        consensus,
        walletAddresses,
      };
      try {
        await createDao(payload);
        setIsSuccess(true);
      } catch {
        setIsSuccess(false);
      }
    } else if (selectedTabIdx === 1) {
      const payload: ICreateDaoProportionalPayload = {
        type: DaoType.Proportional,
        daoName,
        daoTokenName,
        daoTokenSymbol,
        consensusPercent,
      };
      try {
        await createDao(payload);
        setIsSuccess(true);
      } catch {
        setIsSuccess(false);
      }
    }
  }, [
    consensus,
    consensusPercent,
    createDao,
    daoName,
    daoTokenName,
    daoTokenSymbol,
    selectedTabIdx,
    walletAddresses,
  ]);

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
          fieldName="DAO name"
          placeholder="Create DAO name"
          onChange={(e) => setDaoName(e.target.value)}
        />
        <Input
          value={daoTokenName}
          fieldName="DAO token name"
          placeholder="Create DAO token name"
          onChange={(e) => setDaoTokenName(e.target.value)}
        />
        <Input
          value={daoTokenSymbol}
          fieldName="DAO token symbol"
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
        <Button onClick={handleOnCreate}>Create</Button>
      </div>

      {isOpenSetupInfoModal && (
        <Modal
          title="Set-up consensus"
          onClose={() => setIsOpenSetupInfoModal(false)}
        >
          <div className={css.infoBlock}>
            <div className={css.textBlock}>
              Defines how many GP holders must approve a proposal for it to
              pass.
            </div>
            <div className={css.textBlock}>
              For example, “2 of 3” means that out of 3 total GPs, at least 2
              must vote in favor.
            </div>
            <div className={css.textBlock}>
              You can adjust this number depending on how decentralized or
              strict the decision-making should be.
            </div>
          </div>
        </Modal>
      )}

      {isInfoOpen && (
        <Modal title="Current consensus" onClose={() => setIsInfoOpen(false)}>
          <div className={css.infoBlock}>
            <div className={css.textBlock}>
              This is the minimum percentage of GP token votes needed to approve
              a proposal.
            </div>
            <div className={css.textBlock}>
              Increasing the consensus makes decisions harder to pass, while
              lowering it makes them easier.
            </div>
          </div>
        </Modal>
      )}

      {isSuccess !== null && (
        <Modal
          onClose={() => navigate(-1)}
          className={cn(isSuccess && css.success)}
        >
          <DaoCreateResult
            success={isSuccess}
            onDone={() => navigate(-1)}
            onRetry={() => setIsSuccess(null)}
          />
        </Modal>
      )}
    </div>
  );
});
