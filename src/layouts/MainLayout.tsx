import Menu from "@components/Nav/Menu";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-flow-col grid-cols-1 md:grid-cols-[200px_1fr]">
      <header className="md:col-span-2 p-4 border-b border-zinc-700">
        <h1 className="text-4xl font-bold">Video Social Manager</h1>
      </header>
      <Menu />
      <main className="row-span-5 row-start-2 col-span-1 md:col-span-2 p-4">
        {children}
      </main>
      <footer className="row-span-1 col-span-1 md:col-span-2"></footer>
    </div>
  );
};

export default MainLayout;
