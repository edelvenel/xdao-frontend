import { IProposal } from "shared/types";
import css from "../../styles.module.scss";

interface IChangeGPDetailProps {
  proposal: IProposal;
}

export function ChangeGPDetail({ proposal }: IChangeGPDetailProps) {
  return <div className={css.page}>{proposal.name}</div>;
}
