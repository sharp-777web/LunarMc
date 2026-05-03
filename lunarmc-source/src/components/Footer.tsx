import logo from "@/assets/lunarmc-logo.png";

const Footer = () => (
  <footer className="border-t border-border py-8 px-4">
    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <img src={logo} alt="LunarMC" className="w-7 h-7 rounded" />
        <span className="font-display text-sm font-bold text-gradient">LunarMC</span>
      </div>
      <div className="flex items-center gap-4">
        <a href="https://discord.gg/qkKaURzz3" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Discord</a>
        <p className="text-sm text-muted-foreground">© 2026 LunarMC. <span className="font-display font-bold text-gradient">Fatto da Anas</span></p>
      </div>
    </div>
  </footer>
);

export default Footer;
