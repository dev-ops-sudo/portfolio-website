import { profile } from "../data/portfolio";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div className="hero-content">
          <p className="hero-eyebrow">Professional Portfolio</p>
          <h1 className="hero-title">{profile.name}</h1>
          <p className="hero-role">{profile.title}</p>
          <p className="hero-sub">{profile.subtitle}</p>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">
              Contact &amp; Schedule
            </a>
            <a
              href={profile.resume}
              className="btn btn-outline"
              download="Devansh_Mishra_Resume.pdf"
            >
              {profile.resumeLabel}
            </a>
            <a href="#projects" className="btn btn-ghost">
              View Projects
            </a>
          </div>
          <ul className="hero-meta">
            <li>
              <span className="meta-label">Email</span>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            <li>
              <span className="meta-label">Location</span>
              <span>{profile.location}</span>
            </li>
          </ul>
        </div>

        <aside className="hero-profile card">
          <div className="profile-photo-wrap">
            <img
              src={profile.photo}
              alt={`Professional portrait of ${profile.name}`}
              className="profile-photo"
              width={280}
              height={320}
            />
          </div>
          <div className="profile-details">
            <div className="profile-row">
              <span className="profile-label">Education</span>
              <p className="profile-value">{profile.educationLine}</p>
              <p className="profile-subvalue">{profile.educationOrg}</p>
            </div>
            <div className="profile-row">
              <span className="profile-label">Upcoming Role</span>
              <p className="profile-value">{profile.upcomingRole}</p>
              <p className="profile-subvalue">{profile.upcomingOrg}</p>
            </div>
          </div>
          <div className="profile-actions">
            <a
              href={profile.resume}
              className="btn btn-primary btn-block"
              download="Devansh_Mishra_Resume.pdf"
            >
              {profile.resumeLabel}
            </a>
          </div>
          <nav className="profile-links" aria-label="Professional links">
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a>
          </nav>
        </aside>
      </div>
    </section>
  );
}
