import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Auth from "./components/Auth/Auth";
import { Route, Routes, Navigate, useMatch } from "react-router-dom";
import { useEffect } from "react";
import Search from "./pages/Search/Search";
import Details from "./pages/Details/Details";

function App() {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      setAccessToken(token);
    }
  }, []);

  const handleTokenChange = (token: string) => {
    setAccessToken(token);
    localStorage.setItem("access_token", token);
  };

  //const match = useMatch("/details/:videoId");
  //const matchedVideoId = match?.params.videoId ?? "";

  return (
    <Routes>
      <Route
        path="/"
        element={
          accessToken ? (
            <Navigate to="/search" />
          ) : (
            <Auth handleTokenChange={handleTokenChange} />
          )
        }
      />
      <Route
        path="/search"
        element={
          accessToken ? (
            <Search accessToken={accessToken} />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/details/:videoId"
        element={
          accessToken ? (
            <Details accessToken={accessToken} />
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  );
}

export default App;
