import LogoutPage from "@features/auth/LogoutPage";

const SettingsPage = () => {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-white">Settings</h1>
      <LogoutPage />
    </section>
  );
};

export default SettingsPage;
