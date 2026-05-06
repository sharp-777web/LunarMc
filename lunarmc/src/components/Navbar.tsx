import { useState, useCallback } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/lunarmc-logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const links = ["Home", "Features", "Shop"];

  const scrollTo = useCallback((id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <img src={logo} alt="LunarMC" className="w-9 h-9 rounded-lg" />
          <span className="font-display text-lg font-bold text-gradient">LunarMC</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button key={l} onClick={() => scrollTo(l.toLowerCase())} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {l}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href="https://discord.gg/aRHusewvUu" target="_blank" rel="noopener noreferrer" className="text-sm bg-[hsl(235,86%,65%)] text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2">
            Discord
          </a>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3">
          {links.map((l) => (
            <button key={l} onClick={() => scrollTo(l.toLowerCase())} className="text-sm text-muted-foreground text-left">
              {l}
            </button>
          ))}
          <a href="https://discord.gg/aRHusewvUu" target="_blank" rel="noopener noreferrer" className="text-sm bg-[hsl(235,86%,65%)] text-white px-4 py-2 rounded-lg w-full text-center">Discord</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
