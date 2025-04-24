import { useOutletContext } from "react-router-dom";

const useOAuth2Context = () => {
  const { accessToken } = useOutletContext<{ accessToken: string | null }>();
  return { accessToken };
};

export default useOAuth2Context;
