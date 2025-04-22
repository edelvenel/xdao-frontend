import WebApp from "@twa-dev/sdk";

export const hapticFeedback = (
  type: "select" | "press" | "success" | "error"
) => {
  if (WebApp.isVersionAtLeast("6.1")) {
    switch (type) {
      case "select": {
        WebApp.HapticFeedback.selectionChanged();
        break;
      }
      case "press": {
        WebApp.HapticFeedback.impactOccurred("soft");
        break;
      }
      case "success": {
        WebApp.HapticFeedback.notificationOccurred("success");
        break;
      }
      case "error": {
        WebApp.HapticFeedback.notificationOccurred("error");
        break;
      }
      default:
        break;
    }
  }
};
