import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const isAuthenticated = accessToken !== null;

  return isAuthenticated ? (
    <Outlet context={{ accessToken }} />
  ) : (
    <Navigate to="/" />
  );
};

const PublicRoute = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const isAuthenticated = accessToken !== null;

  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Outlet context={{ accessToken }} />
  );
};

export { PrivateRoute, PublicRoute };
