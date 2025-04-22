import { routes } from "app/router/routes";
import React from "react";
import { generatePath, useNavigate, useParams } from "react-router";
import { useBackButton } from "shared/hooks/useBackButton";
import { store } from "shared/store";
import { DAOS_MOCK, IDao } from "shared/types";
import { CrowdfundingTab } from "./components/CrowdfundingTab";
import { DAOBalanceTab } from "./components/DAOBalanceTab";
import { OverviewTab } from "./components/OverviewTab";
import { SettingsTab } from "./components/Settings";
import { Tabs } from "./components/Tabs";
import { ITab } from "./components/Tabs/types";
import { VotesTab } from "./components/VotesTab";
import { mapNumberTab, mapTabNumber } from "./methods";
import css from "./styles.module.scss";

export const DAOPage = React.memo(function DAOPage() {
  const { id, tab } = useParams();
  const { setIsHeaderShown, setIsMenuShown, setIsBackground } = store.useApp();

  const navigate = useNavigate();
  useBackButton();

  const dao: IDao | undefined = React.useMemo(
    () => DAOS_MOCK.find((dao) => dao.id === id),
    [id]
  );

  const selectedTabIdx = React.useMemo(() => mapTabNumber(tab), [tab]);

  const handleSelectTab = React.useCallback(
    (value: number) => {
      if (id) {
        navigate(
          generatePath(routes.dao, { id: id, tab: mapNumberTab(value) })
        );
      }
    },
    [id, navigate]
  );

  React.useEffect(() => {
    setIsHeaderShown(true);
    setIsMenuShown(true);
    setIsBackground(false);
  }, [setIsBackground, setIsHeaderShown, setIsMenuShown]);

  const tabs: ITab[] = React.useMemo(() => {
    if (!dao) {
      return [];
    }

    return [
      {
        title: "Overview",
        content: <OverviewTab dao={dao} />,
      },
      {
        title: "Votes",
        content: <VotesTab dao={dao} />,
      },
      {
        title: "Crowdfunding",
        content: <CrowdfundingTab dao={dao} />,
      },
      {
        title: "DAO Balance",
        content: <DAOBalanceTab dao={dao} />,
      },
      {
        title: "Settings",
        content: <SettingsTab dao={dao} />,
      },
    ];
  }, [dao]);

  if (!dao) {
    return null;
  }

  return (
    <div className={css.page}>
      <Tabs
        tabs={tabs}
        selectedTabIdx={selectedTabIdx}
        onSelect={handleSelectTab}
      />
    </div>
  );
});
