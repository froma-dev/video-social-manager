import { Route, Routes, Navigate } from "react-router-dom";
import AuthPage from "@features/auth/AuthPage";
import DashboardPage from "@features/dashboard/DashboardPage";
import SearchPage from "@features/search/SearchPage";
import DetailsPage from "@features/contentDetails/ContentDetailsPage";
import { PrivateRoute, PublicRoute } from "./RouteGuards";

interface AppRoutesProps {
  accessToken: string | null;
}
const AppRoutes = ({ accessToken }: AppRoutesProps) => {
  return (
    <Routes>
      <Route element={<PublicRoute accessToken={accessToken} />}>
        <Route
          path="/"
          element={<AuthPage />}
        />
      </Route>

      <Route element={<PrivateRoute accessToken={accessToken} />}>
        <Route path="/search" element={<SearchPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/details/:videoId" element={<DetailsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
