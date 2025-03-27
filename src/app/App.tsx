import { BrowserRouter } from "react-router";
import { AppErrorBoundary } from "./app-error-boundary";
import { NotificationLayer } from "./notifications";
import { AppRouter } from "./router/AppRouter";
import "./styles/root.scss";

export function App() {
  return (
    <AppErrorBoundary>
      <BrowserRouter>
        <AppRouter />
        <NotificationLayer />
      </BrowserRouter>
    </AppErrorBoundary>
  );
}
