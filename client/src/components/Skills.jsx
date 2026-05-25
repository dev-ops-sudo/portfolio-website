import { skills } from "../data/portfolio";
import "./Skills.css";

export default function Skills() {
  return (
    <section id="skills">
      <div className="container">
        <span className="section-label">Skills</span>
        <h2>Technical toolkit</h2>
        <p className="section-intro">
          Languages, frameworks, and domains I work with regularly.
        </p>
        <div className="skills-grid">
          {skills.map((group) => (
            <article key={group.category} className="skill-card card">
              <h3>{group.category}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
