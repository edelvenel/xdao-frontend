import css from "./styles.module.scss";

interface ISplashScreenProps {
  onClick: () => void; //TODO: rewrite with store
}

export function SplashScreen({ onClick }: ISplashScreenProps) {
  return (
    <div className={css.splash}>
      <div className={css.figures}>
        <div className={css.button} onClick={onClick}>
          <span>Connect Wallet</span>
        </div>
      </div>
    </div>
  );
}
