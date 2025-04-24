import { Navigate, Outlet } from "react-router-dom";

interface PrivateRouteProps {
  accessToken: string | null;
}
interface PublicRouteProps {
  accessToken: string | null;
}
const PrivateRoute = ({ accessToken }: PrivateRouteProps) => {
  const isAuthenticated = accessToken !== null;

  return isAuthenticated ? (
    <Outlet context={{ accessToken }} />
  ) : (
    <Navigate to="/" />
  );
};

const PublicRoute = ({ accessToken }: PublicRouteProps) => {
  const isAuthenticated = accessToken !== null;

  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Outlet context={{ accessToken }} />
  );
};

export { PrivateRoute, PublicRoute };
