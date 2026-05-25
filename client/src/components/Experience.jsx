import { experience } from "../data/portfolio";
import "./Timeline.css";

export default function Experience() {
  return (
    <section id="experience">
      <div className="container">
        <span className="section-label">Experience</span>
        <h2>Internship & work</h2>
        <p className="section-intro">Professional exposure and upcoming roles.</p>
        <div className="timeline">
          {experience.map((job) => (
            <article key={job.company} className="timeline-item card">
              <div className="timeline-head">
                <h3>{job.role}</h3>
                <span className="timeline-period">{job.period}</span>
              </div>
              <p className="timeline-org">
                {job.company} · {job.location}
              </p>
              <ul>
                {job.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
