import { useState } from "react";
import { navLinks, profile } from "../data/portfolio";
import "./Header.css";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#" className="logo" onClick={() => setOpen(false)}>
          {profile.name.split(" ")[0]}
          <span className="logo-accent">.</span>
        </a>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={`nav ${open ? "nav-open" : ""}`}>
          <ul>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={profile.resume}
            className="btn btn-outline nav-resume"
            download="Devansh_Mishra_Resume.pdf"
            onClick={() => setOpen(false)}
          >
            Resume
          </a>
          <a href="#contact" className="btn btn-primary nav-cta" onClick={() => setOpen(false)}>
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
