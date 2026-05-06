LunarMC — Sito Server Minecraft Italiano
Sito web del server Minecraft LunarMC, costruito con React + Vite + Tailwind + shadcn/ui, con backend su Supabase (edge function per sincronizzare lo staff dal server Discord).
🚀 Avvio rapido
```bash
npm install
npm run dev
```
Apri http://localhost:8080
📦 Build di produzione
```bash
npm run build
npm run preview
```
🔑 Variabili d'ambiente
Crea un file `.env` nella root del progetto con:
```
VITE_SUPABASE_PROJECT_ID="ktpalciimijhimvyacvt"
VITE_SUPABASE_PUBLISHABLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0cGFsY2lpbWlqaGltdnlhY3Z0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxODEzOTIsImV4cCI6MjA5Mjc1NzM5Mn0.idpZcjXeiLQ3UHACg1P9USCbB6RBDjZsx0NW5KwYF_A"
VITE_SUPABASE_URL="https://ktpalciimijhimvyacvt.supabase.co"
```
> Queste credenziali puntano al backend Supabase **già attivo** del progetto. Se vuoi usare un backend tuo, sostituiscile con le tue.
🤖 Edge function `discord-staff`
In `supabase/functions/discord-staff/` c'è la edge function che recupera i membri staff dal Discord di LunarMC.
Per farla funzionare servono due secret configurati su Supabase (Project Settings → Edge Functions → Secrets):
`DISCORD_BOT_TOKEN` — token del bot Discord (con permesso `GUILD_MEMBERS` intent attivo)
`DISCORD_GUILD_ID` — ID del server Discord LunarMC
Per il deploy:
```bash
npx supabase functions deploy discord-staff
```
📂 Struttura
`src/pages/` — pagine (Index, NotFound)
`src/components/` — sezioni del sito (Hero, Features, Staff, Pricing, Footer, Navbar)
`src/components/ui/` — componenti shadcn/ui
`src/integrations/supabase/` — client Supabase auto-generato
`supabase/functions/discord-staff/` — edge function per lo staff
`public/` — asset statici (robots.txt, sitemap.xml)
🎨 Stack
React 18 + TypeScript
Vite 5
Tailwind CSS v3 + shadcn/ui
Framer Motion (animazioni)
React Router
Supabase (DB + Edge Functions)
Lucide Icons
🌐 Deploy
Il sito è un'app statica (Vite SPA): deployabile ovunque (Vercel, Netlify, Cloudflare Pages, VPS con nginx, ecc.).
Build output: `dist/`
