import React from "react";
import { BrowserRouter } from "react-router";
import { NAVIGATION_HEIGHT } from "shared/constants";
import { store } from "shared/store";
import { AppErrorBoundary } from "./app-error-boundary";
import { NotificationLayer } from "./notifications";
import { AppRouter } from "./router/AppRouter";
import { SplashScreen } from "./splash";
import "./styles/root.scss";

export function App() {
  const [isWalletConnected, setIsWalletConnected] =
    React.useState<boolean>(false);

  const { navigationHeight, setNavigationHeight } = store.useApp();

  React.useEffect(() => {
    setNavigationHeight(NAVIGATION_HEIGHT);
  }, [setNavigationHeight]);

  console.log(navigationHeight);

  if (!isWalletConnected) {
    return <SplashScreen onClick={() => setIsWalletConnected(true)} />;
  }

  return (
    <AppErrorBoundary>
      <BrowserRouter>
        <AppRouter />
        <NotificationLayer />
      </BrowserRouter>
    </AppErrorBoundary>
  );
}
