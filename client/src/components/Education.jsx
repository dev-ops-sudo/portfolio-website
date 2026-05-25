import { education } from "../data/portfolio";
import "./Timeline.css";

export default function Education() {
  return (
    <section id="education">
      <div className="container">
        <span className="section-label">Education</span>
        <h2>Academic background</h2>
        <div className="timeline">
          {education.map((item) => (
            <article key={item.degree + item.school} className="timeline-item card">
              <div className="timeline-head">
                <h3>{item.degree}</h3>
                {item.period && (
                  <span className="timeline-period">{item.period}</span>
                )}
              </div>
              <p className="timeline-org">
                {item.school}
                {item.location ? ` · ${item.location}` : ""}
              </p>
              {item.note && <p className="timeline-note">{item.note}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
