import { Icon } from "shared/icons";
import { Button } from "shared/ui/Button";
import { Title } from "shared/ui/Title";
import css from "./styles.module.scss";

interface IDaoCreateResultProps {
  success: boolean;
  onDone: () => void;
  onRetry: () => void;
}

export function DaoCreateResult({
  success,
  onDone,
  onRetry,
}: IDaoCreateResultProps) {
  if (success) {
    return (
      <div className={css.daoCreateResult}>
        <div className={css.content}>
          <div className={css.icon}>
            <Icon.Special.Success />
          </div>
          <Title variant={"large"} value="DAO created" />
          <div className={css.text}>Your DAO has been successfully created</div>
        </div>
        <div className={css.button}>
          <Button variant="accent" onClick={onDone}>
            Done
          </Button>
        </div>
      </div>
    );
  } else {
    return (
      <div className={css.daoCreateResult}>
        <div className={css.content}>
          <div className={css.icon}>
            <Icon.Special.Error />
          </div>
          <Title variant={"large"} value="DAO creation failed" />
          <div className={css.text}>
            Something went wrong while creating your DAO. Please try again
          </div>
        </div>
        <div className={css.button}>
          <Button onClick={onRetry}>Retry</Button>
        </div>
      </div>
    );
  }
}
