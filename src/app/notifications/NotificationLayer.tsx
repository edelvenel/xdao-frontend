import React from "react";
import { createPortal } from "react-dom";
import { Toaster } from "react-hot-toast";

export const NotificationLayer = React.memo(function NotificationLayer() {
  return createPortal(<Toaster />, document.body);
});
