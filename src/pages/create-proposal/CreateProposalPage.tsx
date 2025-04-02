import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { Button } from "shared/ui/Button";
import { Dropdown } from "shared/ui/Dropdown";
import { Title } from "shared/ui/Title";
import { objectIdMatcher } from "shared/utils/Mathcer";
import css from "./styles.module.scss";

type IDao = {
  id: number;
  logo: string;
  name: string;
};

type IProposalType = {
  id: number;
  logo: string;
  name: string;
};

const LOGO_URL =
  "https://s3-alpha-sig.figma.com/img/42ae/6ec1/60426ed7c2345cb0f3fa82362c4448c6?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=FP2xA~duxcKvBndxlZshuwejmfv2HCx870FkWLQEFtLghUqURStu727g9JfMKmssLHH9zgeuPBXuJR5Ezg6a7EC1tFMuJToC3Orumoi9BJwOSbA7YPhmevC4-knkwzFpeybPEAq9yIFuyr78og6X6NP5XA~z7Ci-EAiYDWyL32rlP8JojRL8PvVl5g03KJQhp0TU5tAlT-Mw-73jLVeAK3DMVMghFpqBcPS73Ewf6OcMSCxRQgSPV266ShogW4wP1u3u-0DnOaRISt75RhILpD~eO32EYUQ4dwI2RwsTAd7OBJiYI7P8RHsinn1FgxNmUPT86RkWmAahPOelmqJHGA__";

const DAOS_MOCK: IDao[] = [
  { id: 1, logo: LOGO_URL, name: "Example DAO 1" },
  { id: 2, logo: LOGO_URL, name: "Example DAO 2" },
  { id: 3, logo: LOGO_URL, name: "Example DAO 3" },
];
const PROPOSAL_TYPES_MOCK: IProposalType[] = [
  { id: 1, logo: LOGO_URL, name: "Add GP" },
  { id: 2, logo: LOGO_URL, name: "Remove GP" },
  { id: 3, logo: LOGO_URL, name: "Transfer GP Tokens" },
  { id: 4, logo: LOGO_URL, name: "Change General Consensus" },
  { id: 5, logo: LOGO_URL, name: "Send DAO Funds" },
  { id: 6, logo: LOGO_URL, name: "Transfer GP Tokens" },
  { id: 7, logo: LOGO_URL, name: "Change DAO Name" },
  { id: 8, logo: LOGO_URL, name: "Create On-Chain Poll" },
];

export const CreateProposalPage = React.memo(function CreateProposalPage() {
  const [dao, setDao] = React.useState<IDao | null>(null);
  const [proposalType, setProposalType] = React.useState<IProposalType | null>(
    null
  );

  const navigate = useNavigate();

  return (
    <div className={css.page}>
      <div className={css.title}>
        <Title variant="large" value="Create a proposal" />
      </div>
      <div className={css.form}>
        <Dropdown
          selected={dao}
          options={DAOS_MOCK}
          optionLabel={(option) => option.name}
          optionLogo={(option) => option.logo}
          matcher={objectIdMatcher}
          onSelect={setDao}
          placeholder="Select DAOs"
        />
        <Dropdown
          selected={proposalType}
          options={PROPOSAL_TYPES_MOCK}
          optionLabel={(option) => option.name}
          optionLogo={(option) => option.logo}
          matcher={objectIdMatcher}
          onSelect={setProposalType}
          placeholder="Select proposal type"
        />
      </div>
      <div className={css.actions}>
        <Button
          disabled={dao === null || proposalType === null}
          onClick={() => toast.error("Unimplemented")}
        >
          Create
        </Button>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
    </div>
  );
});
