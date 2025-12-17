import { Navbar } from "./Navbar";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground pb-20 md:pb-0">
      <Navbar />
      <main className="md:pt-0 pt-14 animate-in fade-in duration-500">
        {children}
      </main>
    </div>
  );
}
