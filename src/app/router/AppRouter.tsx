import { NotFoundPage } from "pages/tech/not-found-page";
import { RootPage } from "pages/tech/root-page";
import React from "react";
import { Route, Routes } from "react-router";
import { AppLayout } from "shared/layouts";
import { routes } from "./routes";

const techRoutes = {
  [routes.root]: <RootPage />,
};

const mainRoutes = {
  [routes.home]: { page: <div>Home</div>, layout: AppLayout },
  [routes.earn]: { page: <div>Earn</div>, layout: AppLayout },
  [routes.friends]: { page: <div>Friends</div>, layout: AppLayout },
};

export const AppRouter = React.memo(function AppRouter() {
  return (
    <Routes>
      {Object.entries(mainRoutes).map(([path, route]) => {
        const Layout = route.layout;
        return (
          <Route
            key={path}
            path={path}
            element={<Layout>{route.page}</Layout>}
          />
        );
      })}
      {Object.entries(techRoutes).map(([path, page]) => (
        <Route key={path} path={path} element={page} />
      ))}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
});
