import { Squircle } from "ldrs/react";
import "ldrs/react/Squircle.css";
import useOAuth2 from "@features/auth/hooks/useOAuth2";

const LoggingPage = () => {
  useOAuth2();
  return (
    <div className="authentication grid place-items-center h-dvh">
      <section className="flex flex-col items-center gap-4">
        <Squircle
          size="54"
          stroke="5"
          strokeLength="0.15"
          bgOpacity="0.1"
          speed="0.9"
          color="white"
        />
        <h1 className="text-4xl font-bold text-zinc-50">Logging in...</h1>
      </section>
    </div>
  );
};

export default LoggingPage;
