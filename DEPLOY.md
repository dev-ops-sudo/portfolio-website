# Deploy your portfolio live (free)

Use **Render.com** (free tier). One URL serves your React site and contact API.

---

## Step 1 — Push code to GitHub

1. Create a new repo on [github.com/new](https://github.com/new) (e.g. `devansh-portfolio`). Do **not** add README if the folder already has files.

2. In PowerShell, from the project folder:

```powershell
cd "c:\Users\dm790\Downloads\new portfolio project"
git init
git add .
git commit -m "Portfolio ready for deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/devansh-portfolio.git
git push -u origin main
```

Replace `YOUR_USERNAME` and repo name with yours.

---

## Step 2 — Deploy on Render

1. Sign up / log in at [render.com](https://render.com) (use **Sign in with GitHub**).

2. Click **New +** → **Blueprint** (or **Web Service**).

3. **Blueprint:** Connect the GitHub repo → Render reads `render.yaml` automatically.

   **Or Web Service (manual):**
   - Connect repository
   - **Build Command:** `npm run install:all && npm run build`
   - **Start Command:** `npm start`
   - **Root Directory:** leave blank

4. Add **Environment Variables** (Render dashboard → your service → Environment):

| Key | Value |
|-----|--------|
| `NODE_ENV` | `production` |
| `CLIENT_URL` | `https://YOUR-APP-NAME.onrender.com` (set after first deploy — use your real Render URL) |
| `SMTP_USER` | `devanshk0011@gmail.com` |
| `SMTP_PASS` | Gmail [App Password](https://myaccount.google.com/apppasswords) |
| `CONTACT_TO` | `devanshk0011@gmail.com` |

5. Click **Create Web Service** / **Deploy**. Wait ~5–10 minutes for the first build.

6. Open your live URL: `https://devansh-portfolio.onrender.com` (name may vary).

7. After deploy, set `CLIENT_URL` to that exact URL and **Redeploy** if the contact form fails in the browser.

---

## Step 3 — Custom domain (optional)

Render → your service → **Settings** → **Custom Domains** → add e.g. `devanshmishra.dev` and follow DNS instructions from your domain provider.

---

## Notes

- **Free tier:** The site may sleep after ~15 min idle; first visit can take ~30 seconds to wake up.
- **Contact form:** Needs `SMTP_*` env vars on Render to email you. Without them, messages still work but only log on the server (ephemeral on free tier).
- **Updates:** Push to GitHub `main` → Render auto-redeploys.

---

## Test production locally

```powershell
cd "c:\Users\dm790\Downloads\new portfolio project"
npm run install:all
npm run build
$env:NODE_ENV="production"
npm start
```

Open http://localhost:5000
