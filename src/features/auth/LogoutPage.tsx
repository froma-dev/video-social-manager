import "ldrs/react/Squircle.css";
import useOAuth2 from "@features/auth/hooks/useOAuth2";
import Button from "@components/Button/Button";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import { Squircle } from "ldrs/react";
import "ldrs/react/Squircle.css";
import useOAuth2Context from "./hooks/useOAuth2Context";

const LogoutPage = () => {
  const { revokeAuthorization, isRevoking } = useOAuth2();
  const { accessToken } = useOAuth2Context();
  const handleOAuthLogout = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!accessToken) return;
    const revokeResult = await revokeAuthorization(accessToken);
    console.log(revokeResult);
  };

  console.log(accessToken);

  return (
    <div className="authentication grid place-items-center h-dvh">
      <section className="login max-w-2xl flex flex-col gap-2 items-center justify-between border border-zinc-700 bg-zinc-900 rounded-xl p-6">
        <header className="flex w-full items-start mb-4">
          <h3 className="text-md font-semibold text-left pb-4 w-full text-zinc-50 border-b border-zinc-700">
            Social Video Manager
          </h3>
        </header>
        <section className="flex flex-col h-full p-4 items-center justify-center gap-4">
          <div className="mb-4 text-center">
            <h1 className="text-4xl font-bold text-center">Sign Out</h1>
            <p className="text-lg">
              Sign out of your Google account to revoke access to the YouTube
              Data API.
            </p>
          </div>
          <form onSubmit={handleOAuthLogout} className="text-center">
            <Button disabled={isRevoking} className="transition-all">
              <IconBrandGoogleFilled size={24} />
              Sign out
              {isRevoking && (
                <Squircle
                  size="24"
                  stroke="5"
                  strokeLength="0.15"
                  bgOpacity="0.1"
                  speed="1.25"
                  color="black"
                />
              )}
            </Button>
          </form>
        </section>
      </section>
    </div>
  );
};

export default LogoutPage;
