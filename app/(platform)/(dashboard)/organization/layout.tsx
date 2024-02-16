const OrganizationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="pt-14 md:pt-20 px-4 max-w-6xl 2xl:max-w-screen-xl mx-auto">
      <div className="flex gap-x-5">
        <div className="w-64 shrink-0 hidden md:block">{/* sidebar */}</div>
        {children}
      </div>
    </main>
  );
};

export default OrganizationLayout;
