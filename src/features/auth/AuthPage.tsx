import Button from "@components/Button/Button";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import useOAuth2 from "./hooks/useOAuth2";

const AuthPage = () => {
  const requestAuthorization = useOAuth2();
  const handleOAuthSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    requestAuthorization();
  };

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
