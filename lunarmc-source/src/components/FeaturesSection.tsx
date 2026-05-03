import { Swords, Trees, Users, ShieldCheck, Coins, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: Swords, title: "PvP Arena", desc: "Combatti contro altri giocatori in arene epiche e scala la classifica" },
  { icon: Trees, title: "Survival", desc: "Esplora un mondo vastissimo, costruisci la tua base e sopravvivi" },
  { icon: Users, title: "Community", desc: "Una community attiva e amichevole pronta ad accoglierti" },
  { icon: ShieldCheck, title: "Anti-Cheat", desc: "Sistema anti-cheat avanzato per garantire un gioco equo per tutti" },
  { icon: Coins, title: "Economy", desc: "Sistema economico bilanciato con shop, aste e trading tra giocatori" },
  { icon: Calendar, title: "Eventi Settimanali", desc: "Partecipa agli eventi settimanali per vincere premi esclusivi" },
];

const FeaturesSection = () => (
  <section id="features" className="py-24 px-4">
    <div className="max-w-6xl mx-auto">
      <h2 className="font-display text-3xl sm:text-4xl font-bold text-center text-gradient mb-4">
        Perché Scegliere LunarMC?
      </h2>
      <p className="text-center text-muted-foreground mb-16 max-w-lg mx-auto">
        Scopri tutte le funzionalità che rendono il nostro server unico nel suo genere
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            className="glass-card rounded-xl p-6 hover:border-primary/30 transition-colors group"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <f.icon className="text-primary" size={24} />
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
