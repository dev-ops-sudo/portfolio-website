import { profile } from "../data/portfolio";

export default function About() {
  return (
    <section id="about">
      <div className="container">
        <span className="section-label">About</span>
        <h2>Professional Summary</h2>
        <p className="section-intro">{profile.summary}</p>
      </div>
    </section>
  );
}
