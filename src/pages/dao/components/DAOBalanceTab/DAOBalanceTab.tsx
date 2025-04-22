import { routes } from "app/router/routes";
import toast from "react-hot-toast";
import { generatePath, Link } from "react-router";
import { Icon } from "shared/icons";
import { IDao } from "shared/types";
import { Button } from "shared/ui/Button";
import css from "./styles.module.scss";

interface IDAOBalanceProps {
  dao: IDao;
}

export function DAOBalanceTab({ dao }: IDAOBalanceProps) {
  //TODO: get data with dao
  if (!dao) {
    return null;
  }

  return (
    <div className={css.tab}>
      <div className={css.block}>
        <div className={css.title}>Main account</div>
        <div className={css.amount}>
          <div className={css.currency}>$</div>
          <span>500 000</span>
        </div>
      </div>
      <div className={css.block}>
        <div className={css.title}>
          Future $DAO tokens
          <div className={css.question}>
            <Icon.Common.QuestionTiny />
          </div>
        </div>
        <div className={css.amount}>
          <div className={css.currency}>$DAO</div>
          500 000
        </div>
      </div>
      <div className={css.card}>
        <div className={css.wallet}>
          <div className={css.info}>
            <div className={css.logo} />
            <div className={css.currency}>TON</div>
            <div className={css.amount}>20,000.00</div>
          </div>
          <div
            className={css.link}
            onClick={() => toast.error("Unimplemented")}
          >
            <Icon.Common.LittleLink />
          </div>
        </div>
        <div className={css.wallet}>
          <div className={css.info}>
            <div className={css.logo} />
            <div className={css.currency}>TON</div>
            <div className={css.amount}>20,000.00</div>
          </div>
          <div
            className={css.link}
            onClick={() => toast.error("Unimplemented")}
          >
            <Icon.Common.LittleLink />
          </div>
        </div>
        <div className={css.wallet}>
          <div className={css.info}>
            <div className={css.currency}>NFTs</div>
            <div className={css.amount}>5</div>
          </div>
          <Link to={generatePath(routes.nft, { id: "1" })} className={css.link}>
            <Icon.Common.Eye />
          </Link>
        </div>
      </div>
      <div className={css.actions}>
        <Button variant="primary" onClick={() => toast.error("Unimplemented")}>
          Send
        </Button>
        <Button
          variant="secondary"
          onClick={() => toast.error("Unimplemented")}
        >
          Receive QR
        </Button>
      </div>
    </div>
  );
}
