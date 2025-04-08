import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Auth from "./components/Auth/Auth";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";

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

  return (
    <Router>
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
            accessToken ? <div>You shall Pass!</div> : <Navigate to="/" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
