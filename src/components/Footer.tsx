export const Footer = () => {
  const currentDate = new Date();
  // const monthYear = currentDate.toLocaleDateString("en-US", {
  //   month: "long",
  //   year: "numeric",
  // });
  const monthYear = "December 2025";

  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {currentDate.getFullYear()} Gerardo Lopez</p>
          <p>Last updated: {monthYear}</p>
        </div>
      </div>
    </footer>
  );
};
