import "./App.css";
import { Provider } from "react-redux";
import { store } from "@store/index";
import AppRoutes from "@routes/index";

function App() {
  //const match = useMatch("/details/:videoId");
  //const matchedVideoId = match?.params.videoId ?? "";
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}

export default App;
