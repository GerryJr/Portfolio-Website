export const Footer = () => {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Gerardo Lopez Jr.</p>
          <p>Last updated: {__BUILD_DATE__}</p>
        </div>
      </div>
    </footer>
  );
};
