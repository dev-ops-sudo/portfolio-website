import { useState } from "react";
import { profile } from "../data/portfolio";
import "./Contact.css";

const initial = {
  type: "message",
  name: "",
  email: "",
  subject: "",
  message: "",
  meetingDate: "",
  meetingTime: "",
};

export default function Contact() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const update = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    setStatus({ type: "", text: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", text: "" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: form.type,
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim() || undefined,
          message: form.message.trim(),
          meetingDate: form.type === "meeting" ? form.meetingDate : undefined,
          meetingTime: form.type === "meeting" ? form.meetingTime : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus({ type: "success", text: data.message });
      setForm(initial);
    } catch (err) {
      setStatus({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const minDate = new Date().toISOString().split("T")[0];

  return (
    <section id="contact">
      <div className="container">
        <span className="section-label">Contact</span>
        <h2>Contact &amp; Scheduling</h2>
        <p className="section-intro">
          Submit an inquiry or request a meeting. Correspondence is delivered to{" "}
          <a href={`mailto:${profile.email}`}>{profile.email}</a>.
        </p>

        <div className="contact-layout">
          <aside className="contact-info card">
            <h3>Reach me</h3>
            <ul>
              <li>
                <strong>Email</strong>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </li>
              <li>
                <strong>Phone</strong>
                <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a>
              </li>
              <li>
                <strong>Location</strong>
                <span>{profile.location}</span>
              </li>
              <li>
                <strong>LinkedIn</strong>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  Connect on LinkedIn
                </a>
              </li>
              <li>
                <strong>GitHub</strong>
                <a href={profile.github} target="_blank" rel="noreferrer">
                  View repositories
                </a>
              </li>
            </ul>
          </aside>

          <form className="contact-form card" onSubmit={handleSubmit} noValidate>
            <div className="form-tabs" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={form.type === "message"}
                className={form.type === "message" ? "active" : ""}
                onClick={() => update("type", "message")}
              >
                Send message
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={form.type === "meeting"}
                className={form.type === "meeting" ? "active" : ""}
                onClick={() => update("type", "meeting")}
              >
                Schedule meeting
              </button>
            </div>

            <div className="form-row">
              <label>
                Name <span aria-hidden="true">*</span>
                <input
                  type="text"
                  required
                  minLength={2}
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Your full name"
                />
              </label>
              <label>
                Email <span aria-hidden="true">*</span>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@example.com"
                />
              </label>
            </div>

            {form.type === "message" ? (
              <label>
                Subject
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => update("subject", e.target.value)}
                  placeholder="What is this about?"
                />
              </label>
            ) : (
              <div className="form-row">
                <label>
                  Preferred date <span aria-hidden="true">*</span>
                  <input
                    type="date"
                    required
                    min={minDate}
                    value={form.meetingDate}
                    onChange={(e) => update("meetingDate", e.target.value)}
                  />
                </label>
                <label>
                  Preferred time <span aria-hidden="true">*</span>
                  <input
                    type="time"
                    required
                    value={form.meetingTime}
                    onChange={(e) => update("meetingTime", e.target.value)}
                  />
                </label>
              </div>
            )}

            <label>
              {form.type === "meeting" ? "Agenda / notes" : "Message"}{" "}
              <span aria-hidden="true">*</span>
              <textarea
                required
                minLength={10}
                rows={5}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder={
                  form.type === "meeting"
                    ? "Briefly describe what you'd like to discuss..."
                    : "Write your message here..."
                }
              />
            </label>

            {status.text && (
              <p className={`form-status ${status.type}`} role="status">
                {status.text}
              </p>
            )}

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading
                ? "Sending..."
                : form.type === "meeting"
                  ? "Request meeting"
                  : "Send message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
