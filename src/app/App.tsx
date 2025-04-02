import React from "react";
import { BrowserRouter } from "react-router";
import { AppErrorBoundary } from "./app-error-boundary";
import { NotificationLayer } from "./notifications";
import { AppRouter } from "./router/AppRouter";
import { SplashScreen } from "./splash";
import "./styles/root.scss";

export function App() {
  const [isWalletConnected, setIsWalletConnected] =
    React.useState<boolean>(false);

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
