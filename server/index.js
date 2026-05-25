import "dotenv/config";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";
import { z } from "zod";
import fs from "fs";
import fsp from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const INBOX_FILE = path.join(__dirname, "data", "inbox.json");

const contactSchema = z.object({
  type: z.enum(["message", "meeting"]),
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(3).max(150).optional(),
  message: z.string().min(10).max(3000),
  meetingDate: z.string().optional(),
  meetingTime: z.string().optional(),
});

const app = express();
const PORT = process.env.PORT || 5000;
const clientDist = path.join(__dirname, "../client/dist");
const indexHtml = path.join(clientDist, "index.html");
const serveFrontend = fs.existsSync(indexHtml);

const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
].filter(Boolean);

app.use(express.json({ limit: "32kb" }));

app.use(
  "/api",
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  }),
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: { error: "Too many requests. Please try again later." },
  })
);

async function ensureInboxFile() {
  const dir = path.dirname(INBOX_FILE);
  await fsp.mkdir(dir, { recursive: true });
  try {
    await fsp.access(INBOX_FILE);
  } catch {
    await fsp.writeFile(INBOX_FILE, "[]", "utf-8");
  }
}

async function saveToInbox(entry) {
  await ensureInboxFile();
  const raw = await fsp.readFile(INBOX_FILE, "utf-8");
  const inbox = JSON.parse(raw);
  inbox.push({ ...entry, receivedAt: new Date().toISOString() });
  await fsp.writeFile(INBOX_FILE, JSON.stringify(inbox, null, 2), "utf-8");
}

function createTransporter() {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/contact", async (req, res) => {
  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid form data",
      details: parsed.error.flatten().fieldErrors,
    });
  }

  const data = parsed.data;

  if (data.type === "meeting" && (!data.meetingDate || !data.meetingTime)) {
    return res.status(400).json({
      error: "Meeting date and time are required for scheduling.",
    });
  }

  const subject =
    data.type === "meeting"
      ? `[Meeting Request] ${data.name} — ${data.meetingDate} ${data.meetingTime}`
      : `[Portfolio Message] ${data.subject || "New inquiry from " + data.name}`;

  const bodyLines = [
    `Type: ${data.type === "meeting" ? "Meeting request" : "Direct message"}`,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.type === "meeting"
      ? `Preferred slot: ${data.meetingDate} at ${data.meetingTime}`
      : `Subject: ${data.subject || "—"}`,
    "",
    data.message,
  ];

  const mailText = bodyLines.join("\n");

  await saveToInbox({
    type: data.type,
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message,
    meetingDate: data.meetingDate,
    meetingTime: data.meetingTime,
  });

  const transporter = createTransporter();
  const to = process.env.CONTACT_TO || process.env.SMTP_USER;

  if (transporter && to) {
    try {
      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
        to,
        replyTo: data.email,
        subject,
        text: mailText,
        html: `<pre style="font-family:sans-serif;white-space:pre-wrap">${mailText.replace(/</g, "&lt;")}</pre>`,
      });
      return res.json({
        success: true,
        message:
          data.type === "meeting"
            ? "Meeting request sent. I'll confirm by email shortly."
            : "Message sent successfully. I'll get back to you soon.",
      });
    } catch (err) {
      console.error("Email send failed:", err.message);
      return res.status(500).json({
        error: "Message saved but email could not be sent. Check server SMTP settings.",
      });
    }
  }

  return res.json({
    success: true,
    message:
      "Request received and saved locally. Configure SMTP in server/.env to receive email notifications.",
  });
});

if (serveFrontend) {
  app.use(express.static(clientDist));
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    if (path.extname(req.path)) return res.status(404).end();
    res.sendFile(indexHtml, (err) => {
      if (err) next(err);
    });
  });
} else {
  app.get("/", (_req, res) => {
    res
      .status(503)
      .send(
        "Frontend build not found. On Render, set Build Command to: npm run install:all && npm run build"
      );
  });
}

app.listen(PORT, () => {
  console.log(
    serveFrontend
      ? `Portfolio live on port ${PORT} (serving ${clientDist})`
      : `API running on port ${PORT} — frontend build missing at ${clientDist}`
  );
});
