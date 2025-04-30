import "ldrs/react/Squircle.css";
import useOAuth2 from "@features/auth/hooks/useOAuth2";
import Spinner from "@components/Spinner/Spinner";

const LoggingPage = () => {
  useOAuth2();
  return <Spinner title="Logging in" message="Please wait..." />;
};

export default LoggingPage;
