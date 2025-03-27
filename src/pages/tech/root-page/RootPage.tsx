import { routes } from "app/router/routes";
import React from "react";
import { Navigate } from "react-router";

export const RootPage = React.memo(function RootPage() {
  return <Navigate to={routes.home} replace />;
});
