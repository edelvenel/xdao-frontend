import { ProposalTypes } from "app/mocks/constants";
import React from "react";
import { useDaos } from "shared/api/daos";
import { store } from "shared/store";
import { IDao, IProposalType } from "shared/types";
import { Button } from "shared/ui/Button";
import { Dropdown } from "shared/ui/Dropdown";
import { Title } from "shared/ui/Title";
import { objectIdMatcher } from "shared/utils/Mathcer";
import css from "./styles.module.scss";

interface ICreateProposalOpen {
  dao: IDao | null;
  proposalType: IProposalType | null;
  onSelectDao: (dao: IDao) => void;
  onSelectProposalType: (proposalType: IProposalType) => void;
  onBack: () => void;
  onCreate: () => void;
}

export function CreateProposalOpen({
  dao,
  proposalType,
  onSelectDao,
  onSelectProposalType,
  onBack,
  onCreate,
}: ICreateProposalOpen) {
  const { setIsBackground } = store.useApp();
  const { daos, fetchDaos } = useDaos();

  React.useEffect(() => {
    setIsBackground(true);
  }, [setIsBackground]);

  React.useEffect(() => {
    fetchDaos();
  }, [fetchDaos]);

  return (
    <div className={css.createProposalOpen}>
      <div className={css.title}>
        <Title variant="large" value="Create a proposal" />
      </div>
      <div className={css.form}>
        <Dropdown
          selected={dao}
          options={daos}
          optionLabel={(option) => option.name}
          optionLogo={(option) => option.logo}
          matcher={objectIdMatcher}
          onSelect={onSelectDao}
          placeholder="Select DAOs"
        />
        <Dropdown
          selected={proposalType}
          options={ProposalTypes}
          optionLabel={(option) => option.name}
          matcher={objectIdMatcher}
          onSelect={onSelectProposalType}
          placeholder="Select proposal type"
        />
      </div>
      <div className={css.actions}>
        <Button
          disabled={dao === null || proposalType === null}
          onClick={onCreate}
        >
          Create
        </Button>
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
      </div>
    </div>
  );
}
