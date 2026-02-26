# Forme Verdi — Garden Design di Magdalena Szczepanska

Sito web portfolio per Forme Verdi, progetto di garden design con base in Veneto.

**Stack:** React · TypeScript · Vite · Tailwind CSS · shadcn/ui

---

## Struttura del progetto

```
src/
├── assets/            # Immagini (hero, about, logo)
├── components/        # Componenti principali del sito
│   ├── Navbar.tsx
│   ├── Hero.tsx       # Carousel hero con parallax
│   ├── About.tsx      # Sezione chi sono + blocco SEO
│   ├── Method.tsx     # Metodo in 3 step
│   ├── Projects.tsx   # Griglia progetti (→ aggiornare contenuti)
│   ├── InstagramFeed.tsx  # Embed Instagram
│   ├── ContactForm.tsx    # Form contatti → invio via PHP
│   ├── Footer.tsx
│   └── WaveDivider.tsx
├── hooks/
│   └── use-parallax.tsx   # Hook parallax + scroll reveal
├── pages/
│   ├── Index.tsx      # Pagina principale
│   └── NotFound.tsx   # 404
└── index.css          # Design tokens e animazioni
```

---

## Contenuti da aggiornare

I seguenti punti sono contrassegnati con commenti `TODO` nel codice:

| File | Cosa aggiornare |
|------|----------------|
| `src/components/Projects.tsx` | Titoli, descrizioni, categorie e immagini dei progetti |
| `src/components/Footer.tsx` | Partita IVA reale |
| `src/components/ContactForm.tsx` | URL endpoint PHP (`PHP_ENDPOINT`) |
| `src/components/InstagramFeed.tsx` | URL dei post embed Instagram |
| `index.html` | URL immagine OG (`og:image`, `twitter:image`) |

---

## Integrazione PHP — Invio email dal form contatti

Il form di contatto invia i dati a un endpoint PHP esterno.

### Setup

1. **Carica** il file `php/send-mail.php` sul tuo server web con supporto PHP (es. hosting condiviso, VPS)

2. **Configura** le variabili nel file PHP:
   ```php
   $recipient_email = "magdalena@formeverdi.it";  // Email destinatario
   $allowed_origin  = "https://formeverdi.it";     // Dominio del sito (per CORS)
   ```

3. **Aggiorna l'endpoint** nel frontend:
   - Apri `src/components/ContactForm.tsx`
   - Cerca `PHP_ENDPOINT` e sostituisci con l'URL del tuo file PHP:
   ```ts
   const PHP_ENDPOINT = 'https://tuoserver.com/send-mail.php';
   ```

### Funzionalità incluse

- **Honeypot anti-bot** — campo nascosto che intrappola i bot
- **Rate limiting** — max 5 invii/ora per IP
- **Protezione header injection** — sanitizzazione input
- **Validazione** — lato client (React) e lato server (PHP)
- **CORS** — configurabile per il dominio di produzione

### Test

1. Carica `send-mail.php` sul server
2. Aggiorna `$allowed_origin` con il dominio del sito
3. Aggiorna `PHP_ENDPOINT` nel frontend
4. Compila il form e verifica la ricezione dell'email

---

## Integrazione Instagram — Embed dei post

La sezione Instagram (`src/components/InstagramFeed.tsx`) utilizza gli **embed nativi di Instagram** (oEmbed via `instagram.com/embed.js`).

### Come aggiornare i post

1. Apri `src/components/InstagramFeed.tsx`
2. Trova i blocchi `<blockquote className="instagram-media">`
3. Sostituisci l'URL in `data-instgrm-permalink` con il link del nuovo post:
   ```tsx
   data-instgrm-permalink="https://www.instagram.com/p/CODICE_POST/"
   ```
4. Aggiorna anche l'`href` del link `<a>` interno al blockquote

### Per aggiungere più post

Duplica un blocco `<div className="instagram-embed ...">` con il nuovo URL del post. La griglia si adatterà automaticamente.

### Note

- Gli embed richiedono che il profilo Instagram sia **pubblico**
- Lo script `embed.js` viene caricato una sola volta e gestito automaticamente
- Il componente dichiara il tipo `window.instgrm` per TypeScript

---

## Sviluppo locale

```sh
npm install
npm run dev
```

## Deploy

Pubblica tramite [Lovable](https://lovable.dev/projects/90c068ac-32d0-42b2-8a5a-198d565a6a79) → Share → Publish, oppure collega un dominio personalizzato nelle impostazioni del progetto.
