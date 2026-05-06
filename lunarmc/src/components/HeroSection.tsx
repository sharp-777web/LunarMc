import { Copy, Users, Server, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/lunarmc-logo.png";

const stats = [
  { icon: Users, value: "0", label: "Giocatori Online", color: "text-emerald-400" },
  { icon: Server, value: "1.8.9-1.21.1", label: "Versione", color: "text-amber-400" },
  { icon: Sparkles, value: "24/7", label: "Uptime", color: "text-purple-400" },
];

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />

      <div className="relative z-10 text-center px-4 pt-20">
        <motion.img
          src={logo}
          alt="LunarMC"
          className="w-32 h-32 mx-auto rounded-2xl mb-6 glow-purple"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        />

        <motion.h1
          className="font-display text-5xl sm:text-7xl font-black text-gradient mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          LunarMC
        </motion.h1>

        <motion.p
          className="max-w-xl mx-auto text-muted-foreground mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Entra nel server Minecraft più magico che tu abbia mai visto. Avventure epiche, community incredibile e tanto divertimento ti aspettano!
        </motion.p>

        <motion.div
          className="inline-flex items-center gap-2 bg-primary/50 text-primary-foreground px-6 py-3 rounded-xl font-semibold cursor-default opacity-75"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 0.75 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Copy size={18} />
          Coming Soon
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-4 mt-12"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {stats.map((s) => (
            <div key={s.label} className="glass-card rounded-xl px-8 py-5 min-w-[160px]">
              <s.icon className={`mx-auto mb-2 ${s.color}`} size={24} />
              <div className="font-display font-bold text-lg text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
