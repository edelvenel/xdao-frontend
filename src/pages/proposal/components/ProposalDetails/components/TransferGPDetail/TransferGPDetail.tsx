import cn from "classnames";
import React from "react";
import { useNavigate } from "react-router";
import { Icon } from "shared/icons";
import { ProposalDetailLayout } from "shared/layouts/proposal-detail-layout";
import { IProposal } from "shared/types";
import { Badge } from "shared/ui/Badge";
import { Collapse } from "shared/ui/Collapse";
import { Copy } from "shared/ui/Copy";
import { Title } from "shared/ui/Title";
import css from "../../styles.module.scss";

interface ITransferGPDetailProps {
  proposal: IProposal;
  onVote: () => void;
}

export function TransferGPDetail({ proposal, onVote }: ITransferGPDetailProps) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const navigate = useNavigate();

  return (
    <ProposalDetailLayout
      isVotingEnabled={true}
      onBack={() => navigate(-1)}
      onVote={onVote}
    >
      <div className={css.page}>
        <div className={css.card}>
          <div className={css.block}>
            <div className={css.column}>
              <div className={css.label}>Proposal name</div>
              <div className={css.value}>{proposal.name}</div>
            </div>
            <Badge text={proposal.status.label} variant="yellow" />
          </div>
          <div className={css.block}>
            <div className={css.column}>
              <div className={css.label}>Description</div>
              <div className={css.description}>{proposal.description}</div>
            </div>
          </div>
          <div className={css.block}>
            <div className={css.row}>
              <div className={css.label}>Consensus:</div>
              <div className={css.value}>{proposal.consensus}</div>
            </div>

            <div className={css.row}>
              <div className={css.label}>Ends:</div>
              <div className={css.value}>{proposal.endDate.toDateString()}</div>
            </div>
          </div>
        </div>

        <div className={css.card}>
          <div className={css.block}>
            <div className={css.column}>
              <div className={css.label}>Proposal type</div>
              <div className={css.value}>{proposal.type.name}</div>
            </div>
          </div>
          {proposal.votingType && (
            <div className={css.block}>
              <div className={css.column}>
                <div className={css.label}>Voting type</div>
                <div className={css.value}>{proposal.votingType.label}</div>
              </div>
            </div>
          )}
          <div className={css.block}>
            <div className={css.column}>
              <div className={css.label}>Transfer GP tokens</div>
              <div className={css.value}>500</div>
            </div>
          </div>
          <div className={css.block}>
            <div className={css.column}>
              <div className={css.label}>Transfer to</div>
              <div className={css.value}>
                dchE74r33P7ojS8MgbRCE8YcFcmgfynZjbTZ
              </div>
            </div>
            <Copy text="TFoctV8P7ojS8MgbRCE8YcFcmgfynZjbTZ" />
          </div>
          <div className={css.block}>
            <div className={css.column}>
              <div className={css.label}>Created by</div>
              <div className={css.value}>
                TFoctV8P7ojS8MgbRCE8YcFcmgfynZjbTZ
              </div>
            </div>
            <Copy text="TFoctV8P7ojS8MgbRCE8YcFcmgfynZjbTZ" />
          </div>
          <div className={css.block}>
            <div className={css.column}>
              <div className={css.label}>Created at</div>
              <div className={css.value}> Oct 10, 2025 | 10:08</div>
            </div>
          </div>
          <Collapse
            label="Transaction details"
            isOpen={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          >
            Content
          </Collapse>
        </div>

        <div className={css.card}>
          <Title value="Signatures" variant="medium" />
          <div className={css.blockVote}>
            <div className={cn(css.agree, css.vote)}>
              <Icon.Common.Agree />
              <span>{proposal.votes.agree}%</span>
            </div>
            <div className={cn(css.disagree, css.vote)}>
              <Icon.Common.Disagree />
              <span>{proposal.votes.disagree}%</span>
            </div>
          </div>
          <div className={css.block}>
            <div className={css.column}>
              <div className={css.value}>0x06.........234wer</div>
            </div>
            <div className={css.answer}>
              <span>Yes</span>
              <div className={css.placeholder}>(4%)</div>
            </div>
          </div>
          <div className={css.block}>
            <div className={css.column}>
              <div className={css.value}>0x06.........234wer</div>
            </div>
            <div className={css.answer}>
              <span>Yes</span>
              <div className={css.placeholder}>(4%)</div>
            </div>
          </div>
        </div>
      </div>
    </ProposalDetailLayout>
  );
}
