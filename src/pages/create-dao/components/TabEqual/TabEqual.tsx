import { Icon } from "shared/icons";
import { Button } from "shared/ui/Button";
import { Input } from "shared/ui/Input";
import { InputStep } from "shared/ui/InputStep";
import { Title } from "shared/ui/Title";
import css from "./styles.module.scss";

interface ITabEqualProps {
  walletAddresses: string[];
  consensus: number;
  setWalletAddresses: (addresses: string[]) => void;
  setConsensus: (value: number) => void;
  onSetupInfo: () => void;
}

export function TabEqual({
  walletAddresses,
  consensus,
  setWalletAddresses,
  setConsensus,
  onSetupInfo,
}: ITabEqualProps) {
  return (
    <div className={css.tab}>
      <div className={css.block}>
        <Title value="Add General Partners" variant="medium" />
        {walletAddresses.map((waddr, index) => (
          <Input
            key={index}
            value={waddr}
            placeholder="Wallet Address"
            onChange={(e) =>
              setWalletAddresses([
                ...walletAddresses.filter((_, idx) => idx < index),
                e.target.value,
                ...walletAddresses.filter((_, idx) => idx > index),
              ])
            }
          />
        ))}

        <Button
          variant="primary"
          onClick={() => setWalletAddresses([...walletAddresses, ""])}
        >
          Add more
        </Button>
      </div>

      <div className={css.block}>
        <div className={css.header}>
          <Title value="Set-up consensus" variant="medium" />
          <div className={css.infoButton} onClick={onSetupInfo}>
            <Icon.Common.QuestionSmall />
          </div>
        </div>
        <InputStep
          current={consensus}
          onChange={setConsensus}
          max={walletAddresses.length}
          min={1}
          step={1}
          renderLabel={(value) => `${value} of ${walletAddresses.length}`}
        />
      </div>
    </div>
  );
}
