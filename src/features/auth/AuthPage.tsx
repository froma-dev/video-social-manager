import { useCallback, useEffect } from "react";
import Button from "@components/Button/Button";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import { requestGoogleAuthorization } from "./services/oauth2";
import useOAuth2 from "./hooks/useOAuth2";

interface AuthProps {
  handleTokenChange: (token: string) => void;
}

const AuthPage = ({ handleTokenChange }: AuthProps) => {
  async function handleOAuthSignIn(event: React.FormEvent) {
    event.preventDefault();
    requestGoogleAuthorization();
  }

  const [authorizationCode] = useOAuth2();

  useEffect(() => {}, [handleTokenChange]);

  return (
    <div className="authentication grid place-items-center h-dvh">
      <section className="login flex flex-col items-center border border-slate-700 rounded-xl p-6">
        <div className="mb-4 text-center">
          <h1 className="text-4xl font-bold text-center">
            Social Video Manager
          </h1>
          <p className="text-lg">
            Sign in using Google to authorize this application to access the
            YouTube Data API using your personal Google account.
          </p>
        </div>
        <form onSubmit={handleOAuthSignIn} className="text-center">
          <Button>
            <IconBrandGoogleFilled size={24} />
            Sign in with Google
          </Button>
        </form>
      </section>
    </div>
  );
};

export default AuthPage;
