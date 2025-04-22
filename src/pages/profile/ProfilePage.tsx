import { TopContent } from "app/navigation/components/top-content";
import { routes } from "app/router/routes";
import { Filter } from "pages/proposal-list/components/Filter";
import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";
import { Icon } from "shared/icons";
import { store } from "shared/store";
import { DAOS_MOCK, PROPOSALS } from "shared/types";
import { Button } from "shared/ui/Button";
import { IconButton } from "shared/ui/IconButton";
import { Modal } from "shared/ui/Modal";
import { Title } from "shared/ui/Title";
import { DaoCard } from "./components/DaoCard";
import { ProposalCard } from "./components/ProposalCard";
import { SearchBlock } from "./components/SearchBlock";
import css from "./styles.module.scss";

const PROPOSALS_FILTER_OPTIONS: string[] = [
  "All proposals",
  "Active",
  "Where I'm a GP",
  "Confirmed",
  "Rejected",
];

const DAOS_FILTER_OPTIONS: string[] = [
  "All DAOs",
  "Where I'm a GP",
  "Where I'm a LP",
  "With active proposals",
];

export const ProfilePage = React.memo(function ProfilePage() {
  const [isProposalsFilterOpen, setIsProposalsFilterOpen] =
    React.useState<boolean>(false);
  const [proposalsFilter, setProposalsFilter] = React.useState<number>(0);
  const [isDAOsFilterOpen, setIsDAOsFilterOpen] =
    React.useState<boolean>(false);
  const [daosFilter, setDaosFilter] = React.useState<number>(0);
  const [proposalShowAll, setProposalShowAll] = React.useState<boolean>(false);
  const [daoShowAll, setDaoShowAll] = React.useState<boolean>(false);
  const [searchText, setSearchText] = React.useState<string>("");
  const [isCreateOpen, setIsCreateOpen] = React.useState<boolean>(false);

  const { me } = store.useMe();

  const { setIsMenuShown, setIsHeaderShown, setIsBackground } = store.useApp();

  React.useEffect(() => {
    setIsBackground(false);
    setIsHeaderShown(true);
    setIsMenuShown(true);
  }, [setIsBackground, setIsHeaderShown, setIsMenuShown]);

  return (
    <div className={css.page}>
      <div className={css.userInfo}>
        <div
          className={css.avatar}
          style={{ backgroundImage: `url(${me?.photoUrl})` }}
        />
        <div className={css.name}>{me?.username}</div>
        <div
          className={css.editButton}
          onClick={() => toast.error("Unimplemented")}
        >
          Edit
        </div>
      </div>

      <div className={css.block}>
        <div className={css.title}>
          <Title value="Claim Airdrop via DAO:" variant="medium" />
        </div>
        <div className={css.text}>
          You haven’t selected a DAO yet. To receive your $DAO tokens, join a
          DAO as an GP and reserve one of 5 available Airdrop slots.
        </div>

        <Button variant="primary" onClick={() => toast.error("Unimplemented")}>
          Select DAO
        </Button>
      </div>

      <div className={css.proposalList}>
        <div className={css.header}>
          <Title value="My proposals" variant="medium" />
          <IconButton
            variant="secondary"
            onClick={() => setIsProposalsFilterOpen(true)}
          >
            <Icon.Common.Filter />
          </IconButton>
        </div>
        <div className={css.list}>
          {(proposalShowAll
            ? PROPOSALS
            : PROPOSALS.filter((_, index) => index < 2)
          ).map((proposal) => (
            <ProposalCard key={proposal.id} proposal={proposal} />
          ))}
        </div>
        <div
          className={css.seeMoreButton}
          onClick={() => setProposalShowAll(!proposalShowAll)}
        >
          {proposalShowAll ? "Hide" : "See more"}
        </div>
      </div>

      <div className={css.daoList}>
        <div className={css.header}>
          <Title value="My DAOs" variant="medium" />
          <IconButton
            variant="secondary"
            onClick={() => setIsDAOsFilterOpen(true)}
          >
            <Icon.Common.Filter />
          </IconButton>
        </div>
        <div className={css.list}>
          {(daoShowAll
            ? DAOS_MOCK
            : DAOS_MOCK.filter((_, index) => index < 2)
          ).map((dao) => (
            <DaoCard key={dao.id} dao={dao} />
          ))}
        </div>
        <div
          className={css.seeMoreButton}
          onClick={() => setDaoShowAll(!daoShowAll)}
        >
          {daoShowAll ? "Hide" : "See more"}
        </div>
      </div>

      <TopContent>
        <SearchBlock
          searchText={searchText}
          onChange={setSearchText}
          onCreate={() => setIsCreateOpen(true)}
        />
      </TopContent>

      {isProposalsFilterOpen && (
        <Modal
          title="Filter proposals"
          onClose={() => setIsProposalsFilterOpen(false)}
        >
          <Filter
            selected={proposalsFilter}
            options={PROPOSALS_FILTER_OPTIONS}
            onApply={setProposalsFilter}
            onClose={() => setIsProposalsFilterOpen(false)}
          />
        </Modal>
      )}

      {isDAOsFilterOpen && (
        <Modal title="Filter DAOs" onClose={() => setIsDAOsFilterOpen(false)}>
          <Filter
            selected={daosFilter}
            options={DAOS_FILTER_OPTIONS}
            onApply={setDaosFilter}
            onClose={() => setIsDAOsFilterOpen(false)}
          />
        </Modal>
      )}

      {isCreateOpen && (
        <Modal title="Select action" onClose={() => setIsCreateOpen(false)}>
          <div className={css.actions}>
            <Link to={routes.createDao} className={css.cardButton}>
              <div className={css.icon}>
                <Icon.Common.DAO />
              </div>
              <span>Create</span>
              <span>DAO</span>
            </Link>
            <Link to={routes.createProposal} className={css.cardButton}>
              <div className={css.icon}>
                <Icon.Common.Proposal />
              </div>
              <span>Create</span>
              <span>Proposal</span>
            </Link>
          </div>
        </Modal>
      )}
    </div>
  );
});
