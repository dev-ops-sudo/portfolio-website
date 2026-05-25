import { certifications, achievements } from "../data/portfolio";

export default function Certifications() {
  return (
    <section id="certifications">
      <div className="container">
        <span className="section-label">Growth</span>
        <h2>Certifications & achievements</h2>
        <div className="grid-2">
          <div className="card">
            <h3>Certifications</h3>
            <ul className="simple-list">
              {certifications.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h3>Extracurricular</h3>
            <ul className="simple-list">
              {achievements.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
