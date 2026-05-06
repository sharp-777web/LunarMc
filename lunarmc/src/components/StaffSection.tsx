import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Crown, Shield, Star, Heart, Video, Clapperboard, Sparkles, Loader2, LucideIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type RankStyle = {
  icon: LucideIcon;
  emoji: string;
  color: string;
  borderColor: string;
  glowColor: string;
  bgIcon: string;
};

// Mappatura completa dei rank Discord di LunarMC
// I colori combaciano con i ruoli del server Discord
const RANK_STYLES: Record<string, RankStyle> = {
  Owner: {
    icon: Crown,
    emoji: "👑",
    color: "text-red-500",
    borderColor: "border-red-600/50",
    glowColor: "shadow-red-600/30",
    bgIcon: "bg-red-950/40",
  },
  "Sr.Admin": {
    icon: Shield,
    emoji: "🛡️",
    color: "text-rose-400",
    borderColor: "border-rose-500/40",
    glowColor: "shadow-rose-500/25",
    bgIcon: "bg-rose-950/40",
  },
  Admin: {
    icon: Shield,
    emoji: "🛡️",
    color: "text-orange-400",
    borderColor: "border-orange-500/40",
    glowColor: "shadow-orange-500/25",
    bgIcon: "bg-orange-950/40",
  },
  "Sr.Mod": {
    icon: Sparkles,
    emoji: "🔮",
    color: "text-purple-400",
    borderColor: "border-purple-500/40",
    glowColor: "shadow-purple-500/25",
    bgIcon: "bg-purple-950/40",
  },
  Mod: {
    icon: Sparkles,
    emoji: "🔮",
    color: "text-violet-400",
    borderColor: "border-violet-500/40",
    glowColor: "shadow-violet-500/25",
    bgIcon: "bg-violet-950/40",
  },
  "Sr.Helper": {
    icon: Heart,
    emoji: "🤍",
    color: "text-emerald-400",
    borderColor: "border-emerald-500/40",
    glowColor: "shadow-emerald-500/25",
    bgIcon: "bg-emerald-950/40",
  },
  Helper: {
    icon: Heart,
    emoji: "🤍",
    color: "text-cyan-300",
    borderColor: "border-cyan-400/40",
    glowColor: "shadow-cyan-400/25",
    bgIcon: "bg-cyan-950/40",
  },
  Media: {
    icon: Clapperboard,
    emoji: "🎬",
    color: "text-fuchsia-400",
    borderColor: "border-fuchsia-500/40",
    glowColor: "shadow-fuchsia-500/25",
    bgIcon: "bg-fuchsia-950/40",
  },
  Youtuber: {
    icon: Video,
    emoji: "📹",
    color: "text-red-400",
    borderColor: "border-red-500/40",
    glowColor: "shadow-red-500/25",
    bgIcon: "bg-red-950/40",
  },
  VIP: {
    icon: Star,
    emoji: "💎",
    color: "text-sky-300",
    borderColor: "border-sky-400/40",
    glowColor: "shadow-sky-400/25",
    bgIcon: "bg-sky-950/40",
  },
};

// Fallback per rank non mappati
const DEFAULT_STYLE: RankStyle = {
  icon: Shield,
  emoji: "⭐",
  color: "text-muted-foreground",
  borderColor: "border-border",
  glowColor: "shadow-muted/20",
  bgIcon: "bg-muted/30",
};

const getRankStyle = (role: string): RankStyle =>
  RANK_STYLES[role] ?? DEFAULT_STYLE;

type StaffMember = { name: string; role: string; avatar?: string | null };

// Fallback usato finché Discord non risponde o se la chiamata fallisce
const FALLBACK_STAFF: StaffMember[] = [
  { name: "_SharpX09_", role: "Owner" },
  { name: "Arham29", role: "Sr.Admin" },
];

const StaffSection = () => {
  const [staff, setStaff] = useState<StaffMember[]>(FALLBACK_STAFF);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("discord-staff");
        if (error) throw error;
        if (active && data?.staff?.length) {
          setStaff(data.staff as StaffMember[]);
        }
      } catch (e) {
        console.warn("Discord staff sync failed, usando fallback", e);
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    // Aggiorna ogni 5 minuti
    const id = setInterval(load, 5 * 60 * 1000);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, []);

  return (
    <section id="staff" className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Staff Team
        </motion.h2>
        <motion.p
          className="text-muted-foreground mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Sincronizzato live dal nostro Discord
        </motion.p>

        {loading && staff.length === 0 ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-8">
            {staff.map((member, i) => {
              const style = getRankStyle(member.role);
              const Icon = style.icon;
              return (
                <motion.div
                  key={`${member.name}-${i}`}
                  className={`relative flex flex-col items-center p-8 rounded-2xl border ${style.borderColor} bg-card/60 backdrop-blur-md shadow-lg ${style.glowColor} w-64`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(i * 0.08, 0.6), duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className={`w-20 h-20 rounded-full ${style.bgIcon} border-2 ${style.borderColor} flex items-center justify-center mb-4 overflow-hidden`}>
                    {member.avatar ? (
                      <img
                        src={member.avatar}
                        alt={`Avatar di ${member.name}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <Icon className={`w-9 h-9 ${style.color}`} />
                    )}
                  </div>
                  <h3 className="text-lg font-display font-bold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <span className={`text-sm font-semibold ${style.color}`}>
                    <span className="mr-1">{style.emoji}</span>
                    {member.role}
                  </span>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default StaffSection;
