import WebApp from "@twa-dev/sdk";
import { App } from "app/App";
import { createRoot } from "react-dom/client";

async function enableMocking() {
  if (!import.meta.env.DEV) {
    return;
  }

  const { worker } = await import("./app/mocks/browser");

  return worker.start();
}

if (WebApp.isVersionAtLeast("6.1")) {
  WebApp.setHeaderColor("#333333");
  WebApp.setBackgroundColor("#000000");
}

// if (WebApp.isVersionAtLeast("8.0")) {
//   WebApp.requestFullscreen();
// } TODO: uncomment for fullscreen mode

WebApp.expand();

enableMocking().then(() =>
  createRoot(document.getElementById("root")!).render(<App />)
);
