# Devansh Mishra — Portfolio

Professional portfolio site built with **React (Vite)** and **Node.js (Express)**. Includes contact form and meeting scheduler.

## Sections

- Hero, About, Skills, Experience, Education, Projects, Certifications
- **Contact box**: send a direct message or request a meeting (date + time)

## Quick start

```bash
# From project root
npm install
cd client && npm install && cd ..
cd server && npm install && cd ..

# Copy env and add Gmail App Password (see below)
copy server\.env.example server\.env

# Run both (frontend + API)
npm run dev
```

- **Frontend:** http://localhost:5173  
- **API:** http://localhost:5000  

## Email setup (recommended)

1. Enable 2FA on your Gmail account.
2. Create an [App Password](https://myaccount.google.com/apppasswords).
3. Edit `server/.env`:

```
SMTP_USER=devanshk0011@gmail.com
SMTP_PASS=your_16_char_app_password
CONTACT_TO=devanshk0011@gmail.com
```

Submissions are also saved to `server/data/inbox.json` if email is not configured.

## Customize content

Edit `client/src/data/portfolio.js` — add project demo/repo URLs, photo, or Calendly link.

## Go live

See **[DEPLOY.md](./DEPLOY.md)** for step-by-step deployment to Render (free).

```bash
npm run install:all
npm run build
# NODE_ENV=production npm start  →  http://localhost:5000
```
