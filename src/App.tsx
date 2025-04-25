import "./App.css";
import { Provider } from "react-redux";
import { store } from "@store/index";
import { useLocalStorageWithExpiration } from "@hooks/useLocalStorage";
import AppRoutes from "@routes/index";

function App() {
  const [accessToken, setAccessToken] = useLocalStorageWithExpiration<
    string | null
  >("access_token", null);

  //const match = useMatch("/details/:videoId");
  //const matchedVideoId = match?.params.videoId ?? "";

  return (
    <Provider store={store}>
      <AppRoutes accessToken={accessToken} />
    </Provider>
  );
}

export default App;
