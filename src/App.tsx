import "./App.css";
import Auth from "./components/Auth/Auth";
import { Route, Routes, Navigate } from "react-router-dom";
import SearchPage from "@features/search/SearchPage";
import DetailsPage from "@/features/contentDetails/ContentDetailsPage";
import DashboardPage from "@/features/dashboard/DashboardPage";
import { Provider } from "react-redux";
import { store } from "@store/index";
import { useLocalStorageWithExpiration } from "./hooks/useLocalStorage";

function App() {
  const [accessToken, setAccessToken] = useLocalStorageWithExpiration<
    string | null
  >("access_token", null);

  const handleTokenChange = (token: string) => {
    setAccessToken(token);
    localStorage.setItem("access_token", token);
  };

  //const match = useMatch("/details/:videoId");
  //const matchedVideoId = match?.params.videoId ?? "";

  return (
    <Provider store={store}>
      <Routes>
        <Route
          path="/"
          element={
            accessToken ? (
              <Navigate to="/dashboard" />
            ) : (
              <Auth handleTokenChange={handleTokenChange} />
            )
          }
        />
        <Route
          path="/search"
          element={
            accessToken ? (
              <SearchPage accessToken={accessToken} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            accessToken ? (
              <DashboardPage accessToken={accessToken} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/details/:videoId"
          element={
            accessToken ? (
              <DetailsPage accessToken={accessToken} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Provider>
  );
}

export default App;
