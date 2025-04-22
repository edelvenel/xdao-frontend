import cn from "classnames";
import React from "react";
import toast from "react-hot-toast";
import { Icon } from "shared/icons";
import { IDao } from "shared/types";
import { Button } from "shared/ui/Button";
import { EditableInputNumber } from "shared/ui/EditableInputNumber";
import css from "./styles.module.scss";

interface ISettingsTabProps {
  dao: IDao;
}

export function SettingsTab({ dao }: ISettingsTabProps) {
  const [consensus, setConsensus] = React.useState<number>(51);

  const handleOnConsensusSave = React.useCallback(() => {
    toast.error("Save unimplemented");
  }, []);

  //TODO: get data with dao
  if (!dao) {
    return null;
  }

  return (
    <div className={css.tab}>
      <div className={css.field}>
        <div className={css.name}>Current consensus</div>
        <EditableInputNumber
          max={100}
          min={0}
          onUpdate={(value) => setConsensus(Number(value))}
          value={consensus > 0 ? consensus : ""}
          placeholder="Enter amount manual"
          onSave={handleOnConsensusSave}
        />
      </div>
      <div className={css.block}>
        <div className={css.title}>GP Holders:</div>
        <div className={css.distributionRule}>
          <div className={cn(css.item, css.wallet)}>0x...123</div>
          <div className={cn(css.item, css.gpTokens)}>GP tokens</div>
          <div className={cn(css.item, css.percent)}>30%</div>
          <div
            className={cn(css.item, css.cancel)}
            onClick={() => toast.error("Unimplemented")}
          >
            <Icon.Common.Cancel />
          </div>
        </div>
        <div className={css.distributionRule}>
          <div className={cn(css.item, css.wallet)}>0x...123</div>
          <div className={cn(css.item, css.gpTokens)}>GP tokens</div>
          <div className={cn(css.item, css.percent)}>30%</div>
          <div
            className={cn(css.item, css.cancel)}
            onClick={() => toast.error("Unimplemented")}
          >
            <Icon.Common.Cancel />
          </div>
        </div>
        <div className={css.actions}>
          <Button
            variant="primary"
            onClick={() => toast.error("Unimplemented")}
          >
            Add more
          </Button>
          <Button
            variant="secondary"
            onClick={() => toast.error("Unimplemented")}
          >
            Change transfer status
          </Button>
        </div>
      </div>
    </div>
  );
}
