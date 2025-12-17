import { Link, useLocation } from "wouter";
import { Home, Stethoscope, GraduationCap, CloudSun, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/diagnosis", label: "Diagnosis", icon: Stethoscope },
    { href: "/learn", label: "Learn", icon: GraduationCap },
    { href: "/weather", label: "Weather", icon: CloudSun },
  ];

  return (
    <>
      {/* Desktop Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 hidden md:block">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-display text-xl font-bold text-primary">
            <span>🌱 EduFarma AI</span>
          </div>
          <nav className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                    location === item.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </a>
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background md:hidden pb-safe">
        <nav className="flex h-16 items-center justify-around px-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <a
                className={cn(
                  "flex flex-col items-center justify-center gap-1 min-w-[64px] rounded-lg py-1 transition-colors",
                  location === item.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon className={cn("h-6 w-6", location === item.href && "fill-current")} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </a>
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Top Bar (Logo & Profile) */}
      <div className="fixed top-0 left-0 right-0 z-40 flex h-14 items-center justify-between border-b bg-background px-4 md:hidden">
         <div className="flex items-center gap-2 font-display text-lg font-bold text-primary">
            <span>🌱 EduFarma AI</span>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                     <Button variant="ghost" className="w-full justify-start gap-2">
                       <item.icon className="h-4 w-4" />
                       {item.label}
                     </Button>
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
      </div>
    </>
  );
}
