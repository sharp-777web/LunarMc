import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "VIP",
    price: "9.99",
    popular: false,
    features: ["Kit VIP esclusivo", "Accesso prioritario al server", "Tag [VIP] in chat", "5 home extra", "Fly nei propri claim"],
  },
  {
    name: "ORO",
    price: "19.99",
    popular: true,
    features: ["Tutto del VIP +", "Kit ORO leggendario", "Tag [ORO] dorato in chat", "10 home extra", "Accesso a /fix", "Nickname personalizzato"],
  },
  {
    name: "DIAMOND",
    price: "29.99",
    popular: false,
    features: ["Tutto del ORO +", "Kit DIAMOND supremo", "Tag [DIAMOND] luminoso", "Home illimitate", "Accesso a /fly ovunque", "Effetti particelle esclusivi"],
  },
];

const PricingSection = () => (
  <section id="shop" className="py-24 px-4">
    <div className="max-w-6xl mx-auto">
      <h2 className="font-display text-3xl sm:text-4xl font-bold text-center text-gradient mb-4">
        Scegli il tuo Rank
      </h2>
      <p className="text-center text-muted-foreground mb-16">
        Sblocca vantaggi esclusivi e supporta il server
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((p, i) => (
          <motion.div
            key={p.name}
            className={`glass-card rounded-xl p-6 relative ${p.popular ? "border-primary/50 glow-purple" : ""}`}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            {p.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                PIÙ POPOLARE
              </span>
            )}
            <h3 className="font-display text-xl font-bold text-foreground mb-1">{p.name}</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="font-display text-4xl font-black text-gradient">{p.price}</span>
              <span className="text-muted-foreground text-sm">EUR</span>
            </div>
            <ul className="space-y-3 mb-8">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check size={16} className="text-primary shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <button
              className={`w-full py-3 rounded-lg font-semibold text-sm transition-opacity hover:opacity-90 ${
                p.popular
                  ? "bg-primary text-primary-foreground glow-purple"
                  : "bg-muted text-foreground"
              }`}
            >
              Acquista Ora
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PricingSection;
