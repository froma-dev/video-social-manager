import Button from "@components/Button/Button";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import useOAuth2 from "./hooks/useOAuth2";

const AuthPage = () => {
  const { requestAuthorization } = useOAuth2();
  const handleOAuthSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    requestAuthorization();
  };

  return (
    <div className="authentication grid place-items-center h-dvh">
      <section className="login max-w-2xl flex flex-col gap-2 items-center justify-between border border-zinc-700 bg-zinc-900 rounded-xl p-6">
        <header className="flex w-full items-start mb-4">
          <h3 className="text-md font-semibold text-left pb-4 w-full text-zinc-50 border-b border-zinc-700">
            Sign in
          </h3>
        </header>
        <section className="flex flex-col h-full p-4 items-center justify-center gap-4">
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
      </section>
    </div>
  );
};

export default AuthPage;
