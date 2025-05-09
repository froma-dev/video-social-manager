import { Route, Routes, Navigate } from "react-router-dom";
import AuthPage from "@features/auth/AuthPage";
import DashboardPage from "@features/dashboard/DashboardPage";
import SearchPage from "@features/search/SearchPage";
import DetailsPage from "@features/contentDetails/ContentDetailsPage";
import { PrivateRoute, PublicRoute } from "./RouteGuards";
import LoggingPage from "@/features/auth/LoggingPage";
import SettingsPage from "@features/settings/SettingsPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<AuthPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/authorized" element={<LoggingPage />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/search" element={<SearchPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/details/:videoId" element={<DetailsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
