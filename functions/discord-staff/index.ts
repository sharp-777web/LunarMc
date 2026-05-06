// Edge function: recupera lo staff dal server Discord LunarMC
// Mappa i ruoli Discord ai rank visualizzati sul sito.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Ordine di priorità: il rank più alto trovato per un membro vince.
const STAFF_ROLES = [
  "Owner",
  "Sr.Admin",
  "Admin",
  "Sr.Mod",
  "Mod",
  "Sr.Helper",
  "Helper",
  "Media",
  "Youtuber",
  "VIP",
];

// Sinonimi/varianti del nome del ruolo Discord -> rank canonico del sito
const ROLE_ALIASES: Record<string, string> = {
  owner: "Owner",
  "sr.admin": "Sr.Admin",
  "sr admin": "Sr.Admin",
  "senior admin": "Sr.Admin",
  admin: "Admin",
  "sr.mod": "Sr.Mod",
  "sr mod": "Sr.Mod",
  "senior mod": "Sr.Mod",
  "senior moderator": "Sr.Mod",
  mod: "Mod",
  moderator: "Mod",
  "sr.helper": "Sr.Helper",
  "sr helper": "Sr.Helper",
  "senior helper": "Sr.Helper",
  helper: "Helper",
  media: "Media",
  youtuber: "Youtuber",
  youtube: "Youtuber",
  vip: "VIP",
};

function normalizeRole(name: string): string | null {
  // Tiene solo lettere ASCII, numeri, punti e spazi -> rimuove emoji e simboli unicode
  const cleaned = name
    .replace(/[^a-zA-Z0-9. ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
  return ROLE_ALIASES[cleaned] ?? null;
}

interface DiscordRole {
  id: string;
  name: string;
  color: number;
  position: number;
}

interface DiscordMember {
  user?: { id: string; username: string; global_name?: string | null; avatar?: string | null; discriminator?: string };
  nick?: string | null;
  avatar?: string | null;
  roles: string[];
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const BOT_TOKEN = Deno.env.get("DISCORD_BOT_TOKEN");
    const GUILD_ID = Deno.env.get("DISCORD_GUILD_ID");

    if (!BOT_TOKEN) throw new Error("DISCORD_BOT_TOKEN is not configured");
    if (!GUILD_ID) throw new Error("DISCORD_GUILD_ID is not configured");

    const headers = {
      Authorization: `Bot ${BOT_TOKEN}`,
      "Content-Type": "application/json",
    };

    // 1) Lista ruoli del server
    const rolesRes = await fetch(
      `https://discord.com/api/v10/guilds/${GUILD_ID}/roles`,
      { headers },
    );
    if (!rolesRes.ok) {
      const txt = await rolesRes.text();
      throw new Error(`Discord roles fetch failed [${rolesRes.status}]: ${txt}`);
    }
    const roles: DiscordRole[] = await rolesRes.json();

    // Crea mappa roleId -> rank canonico
    const roleIdToRank = new Map<string, string>();
    for (const r of roles) {
      const rank = normalizeRole(r.name);
      if (rank) roleIdToRank.set(r.id, rank);
    }

    // 2) Lista membri (paginated, fino a 1000 per il sito staff è ampio a sufficienza)
    const allMembers: DiscordMember[] = [];
    let after = "0";
    while (true) {
      const url = `https://discord.com/api/v10/guilds/${GUILD_ID}/members?limit=1000&after=${after}`;
      const memRes = await fetch(url, { headers });
      if (!memRes.ok) {
        const txt = await memRes.text();
        throw new Error(`Discord members fetch failed [${memRes.status}]: ${txt}`);
      }
      const batch: DiscordMember[] = await memRes.json();
      if (batch.length === 0) break;
      allMembers.push(...batch);
      if (batch.length < 1000) break;
      after = batch[batch.length - 1].user!.id;
    }

    // 3) Filtra membri con ruoli staff e prendi il rank di più alta priorità
    const rankPriority = new Map(STAFF_ROLES.map((r, i) => [r, i]));
    const staff: { name: string; role: string; username: string; avatar: string | null }[] = [];

    for (const m of allMembers) {
      if (!m.user) continue;
      let bestRank: string | null = null;
      let bestPriority = Infinity;
      for (const roleId of m.roles) {
        const rank = roleIdToRank.get(roleId);
        if (!rank) continue;
        const p = rankPriority.get(rank) ?? Infinity;
        if (p < bestPriority) {
          bestPriority = p;
          bestRank = rank;
        }
      }
      if (bestRank) {
        // Pulisce nickname tipo "Owner • _SharpX09_" -> "_SharpX09_"
        const rawName = m.nick || m.user.global_name || m.user.username;
        const name = rawName.replace(/^.*?[•·\-|:]\s*/, "").trim() || rawName;

        // Costruisci URL avatar Discord
        let avatar: string | null = null;
        if (m.user.avatar) {
          const ext = m.user.avatar.startsWith("a_") ? "gif" : "png";
          avatar = `https://cdn.discordapp.com/avatars/${m.user.id}/${m.user.avatar}.${ext}?size=256`;
        } else {
          // Avatar di default in base al discriminator/id
          const idx = m.user.discriminator && m.user.discriminator !== "0"
            ? Number(m.user.discriminator) % 5
            : Number((BigInt(m.user.id) >> 22n) % 6n);
          avatar = `https://cdn.discordapp.com/embed/avatars/${idx}.png`;
        }

        staff.push({ name, role: bestRank, username: (m.user.username || "").toLowerCase(), avatar });
      }
    }

    // Ordina per priorità del rank, con _SharpX09_ (anas23097) sempre primo tra gli Owner
    staff.sort((a, b) => {
      const pa = rankPriority.get(a.role) ?? 99;
      const pb = rankPriority.get(b.role) ?? 99;
      if (pa !== pb) return pa - pb;
      if (a.username === "anas23097") return -1;
      if (b.username === "anas23097") return 1;
      return a.name.localeCompare(b.name);
    });

    // Rimuovi il campo username prima di inviare al frontend
    const publicStaff = staff.map(({ name, role, avatar }) => ({ name, role, avatar }));

    return new Response(
      JSON.stringify({ staff: publicStaff, updatedAt: new Date().toISOString() }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("discord-staff error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: message, staff: [] }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
