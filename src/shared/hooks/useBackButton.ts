import WebApp from "@twa-dev/sdk";
import React from "react";
import { useNavigate } from "react-router";

export function useBackButton(onBack?: () => void) {
  const navigate = useNavigate();

  const handleBackButton = React.useCallback(() => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  }, [onBack, navigate]);

  React.useEffect(() => {
    if (WebApp.isVersionAtLeast("6.1")) {
      WebApp.BackButton.show();
      WebApp.BackButton.onClick(handleBackButton);

      return () => {
        WebApp.BackButton.offClick(handleBackButton);
        WebApp.BackButton.hide();
      };
    }
  }, [handleBackButton]);
}
