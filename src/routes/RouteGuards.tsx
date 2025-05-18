import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import MainLayout from "@layouts/MainLayout";

const PrivateRoute = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const isAuthenticated = accessToken !== null;

  return isAuthenticated ? (
    <MainLayout>
      <Outlet context={{ accessToken }} />
    </MainLayout>
  ) : (
    <MainLayout>
      <Navigate to="/auth" />
    </MainLayout>
  );
};

const PublicRoute = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const isAuthenticated = accessToken !== null;

  return isAuthenticated ? (
    <MainLayout>
      <Navigate to="/dashboard" />
    </MainLayout>
  ) : (
    <MainLayout>
      <Outlet context={{ accessToken }} />
    </MainLayout>
  );
};

export { PrivateRoute, PublicRoute };
