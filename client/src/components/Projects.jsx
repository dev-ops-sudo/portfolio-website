import { projects } from "../data/portfolio";
import "./Projects.css";

export default function Projects() {
  return (
    <section id="projects">
      <div className="container">
        <span className="section-label">Projects</span>
        <h2>Selected work</h2>
        <p className="section-intro">
          Hands-on builds focused on health, fitness, and student utility.
        </p>
        <div className="projects-grid">
          {projects.map((project) => (
            <article key={project.name} className="project-card card">
              <div className="project-tags">
                <span className="project-tag">{project.tag}</span>
                <span className="project-stack">{project.stack}</span>
              </div>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <ul>
                {project.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              {(project.links.demo || project.links.repo) && (
                <div className="project-links">
                  {project.links.demo && (
                    <a href={project.links.demo} target="_blank" rel="noreferrer">
                      Live demo
                    </a>
                  )}
                  {project.links.repo && (
                    <a href={project.links.repo} target="_blank" rel="noreferrer">
                      Repository
                    </a>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
