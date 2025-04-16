import cn from "classnames";
import toast from "react-hot-toast";
import { Icon } from "shared/icons";
import { InputNumber } from "shared/ui/InputNumber";
import { InputStep } from "shared/ui/InputStep";
import { Title } from "shared/ui/Title";
import css from "./styles.module.scss";

interface ITabProportionalProps {
  currentConsensus: number;
  setCurrentConsensus: (value: number) => void;
  onInfo: () => void;
}

export function TabProportional({
  currentConsensus,
  setCurrentConsensus,
  onInfo,
}: ITabProportionalProps) {
  return (
    <div className={css.tab}>
      <div className={css.block}>
        <Title variant={"medium"} value="Update GP distribution" />
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
      </div>
      <div className={css.block}>
        <div className={css.setConsensusBlock}>
          <div className={css.title}>
            <div className={css.header}>
              <Title variant={"medium"} value="Current consensus" />
              <div className={css.infoButton} onClick={onInfo}>
                <Icon.Common.QuestionSmall />
              </div>
            </div>
          </div>
          <InputStep
            current={currentConsensus}
            onChange={setCurrentConsensus}
            renderLabel={(value) => `${value}%`}
          />

          <InputNumber
            max={100}
            min={0}
            onUpdate={(value) => setCurrentConsensus(Number(value))}
            value={currentConsensus > 0 ? currentConsensus : ""}
            placeholder="Enter amount manual"
          />
        </div>
      </div>
    </div>
  );
}
