import { ArrowRight, Download, Github, Linkedin, Mail, MapPin, RadioTower, Send, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { labDemos } from "./data/labDemos";
import { certifications, education, focusPoints, profile } from "./data/profile";
import { formatNoteDate, notes } from "./data/notes";
import { projects } from "./data/projects";
import type { Project } from "./types/portfolio";

const navItems = [
  { href: "#inicio", label: "Inicio" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#laboratorio", label: "Laboratorio" },
  { href: "#notas", label: "Notas técnicas" },
  { href: "#contacto", label: "Contacto" },
];

function App() {
  return (
    <>
      <Header />
      <main id="inicio">
        <Hero />
        <ProjectsSection />
        <ProjectTimeline />
        <LabSection />
        <NotesSection />
        <ProfileSection />
      </main>
      <Footer />
    </>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="Ir al inicio">
        <span className="brand-mark" aria-hidden="true">
          <RadioTower size={22} />
        </span>
        {profile.name}
      </a>
      <nav className="site-nav" aria-label="Navegación principal">
        {navItems.map((item) => (
          <a href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="hero-copy">
        <h1 id="hero-title">{profile.headline}</h1>
        <p>{profile.intro}</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#proyectos">
            <Sparkles aria-hidden="true" size={18} />
            Ver proyectos
          </a>
          <a className="button button-ghost" href="#laboratorio">
            <RadioTower aria-hidden="true" size={18} />
            Explorar laboratorio
          </a>
          <a className="button button-outline" href={profile.cv} target="_blank" rel="noreferrer">
            <Download aria-hidden="true" size={18} />
            Descargar CV
          </a>
        </div>
        <ul className="focus-row" aria-label="Puntos de enfoque">
          {focusPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>

      <div className="hero-visual">
        <div className="portrait-card">
          <TechnicalBackdrop />
          <img src={profile.photo} alt={`Retrato de ${profile.name}`} />
        </div>
      </div>
    </section>
  );
}

function TechnicalBackdrop() {
  return (
    <svg className="technical-backdrop" viewBox="0 0 520 420" aria-hidden="true">
      <path d="M74 326V132l42-72 42 72v194" />
      <path d="M88 132h88M103 104h58M74 166h158M74 214h120M74 268h150" />
      <path d="M116 60c58 34 82 82 88 148M116 60C58 96 30 156 28 248" />
      <path d="M322 94c18-38 58-38 76 0s58 38 76 0" />
      <path d="M318 178h154" />
      <path d="M330 214c42-42 110-42 152 0s42 110 0 152-110 42-152 0-42-110 0-152Z" />
      <path d="M406 232v134M339 299h134M360 252l92 92M452 252l-92 92" />
      <text x="318" y="148">Pr = Pt + Gt + Gr - Lp</text>
    </svg>
  );
}

function ProjectsSection() {
  return (
    <section className="section" id="proyectos" aria-labelledby="projects-title">
      <SectionHeader
        actionHref="#mapa"
        actionLabel="Ver mapa completo"
        title="Proyectos destacados"
        subtitle="Una selección de experiencias que combinan investigación aplicada, prototipado, medidas y aprendizaje técnico."
      />

      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <div className="project-illustration" aria-hidden="true">
        <RadioTower size={34} />
      </div>
      <div className="project-card-body">
        <p className="card-meta">{project.period}</p>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
      </div>
      <div className="tag-row">
        {project.tags.slice(0, 3).map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </article>
  );
}

function ProjectTimeline() {
  const [activeProjectId, setActiveProjectId] = useState(projects[0].id);
  const activeProject = projects.find((project) => project.id === activeProjectId) ?? projects[0];

  return (
    <section className="section timeline-section" id="mapa" aria-labelledby="timeline-title">
      <SectionHeader
        actionHref="#laboratorio"
        actionLabel="Abrir laboratorio"
        title="Mapa de proyectos"
        subtitle="Una lectura temporal y conceptual de las experiencias: qué problema había, qué se construyó y qué se aprendió."
      />

      <div className="timeline-shell">
        <div className="timeline-rail" aria-label="Línea temporal de proyectos">
          {projects.map((project, index) => (
            <button
              className={`timeline-node timeline-node-${index + 1} ${activeProject.id === project.id ? "is-active" : ""}`}
              key={project.id}
              onClick={() => setActiveProjectId(project.id)}
              type="button"
            >
              <span>{project.period}</span>
              <strong>{project.title}</strong>
            </button>
          ))}
        </div>

        <article className="timeline-detail">
          <p className="panel-label">{activeProject.organization}</p>
          <h3>{activeProject.title}</h3>
          <p>{activeProject.summary}</p>
          <ul>
            {activeProject.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

function LabSection() {
  const [activeDemoId, setActiveDemoId] = useState(labDemos[0].id);
  const activeDemo = labDemos.find((demo) => demo.id === activeDemoId) ?? labDemos[0];
  const ActiveDemoComponent = activeDemo.component;

  return (
    <section className="section lab-section" id="laboratorio" aria-labelledby="lab-title">
      <SectionHeader
        actionHref="#notas"
        actionLabel="Leer notas"
        title="Laboratorio interactivo"
        subtitle="Demos client-side para enseñar ideas de comunicaciones de forma técnica, manipulable y visual."
      />

      <div className="lab-layout">
        <div className="lab-tabs" role="tablist" aria-label="Módulos del laboratorio">
          {labDemos.map((demo) => (
            <button
              aria-controls={`panel-${demo.id}`}
              aria-selected={activeDemo.id === demo.id}
              className={`lab-tab ${activeDemo.id === demo.id ? "is-active" : ""}`}
              id={`tab-${demo.id}`}
              key={demo.id}
              onClick={() => setActiveDemoId(demo.id)}
              role="tab"
              type="button"
            >
              <span>{demo.title}</span>
              <small>{demo.summary}</small>
            </button>
          ))}
        </div>

        <div
          aria-labelledby={`tab-${activeDemo.id}`}
          className="lab-stage"
          id={`panel-${activeDemo.id}`}
          role="tabpanel"
        >
          <div className="lab-stage-header">
            <div>
              <p className="panel-label">{activeDemo.difficulty}</p>
              <h3>{activeDemo.title}</h3>
            </div>
            <div className="tag-row">
              {activeDemo.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          <ActiveDemoComponent />
        </div>
      </div>
    </section>
  );
}

function NotesSection() {
  const [selectedSlug, setSelectedSlug] = useState(notes[0]?.slug);
  const selectedNote = useMemo(
    () => notes.find((note) => note.slug === selectedSlug) ?? notes[0],
    [selectedSlug],
  );

  if (!selectedNote) {
    return null;
  }

  return (
    <section className="section notes-section" id="notas" aria-labelledby="notes-title">
      <SectionHeader
        actionHref="#contacto"
        actionLabel="Contactar"
        title="Notas técnicas"
        subtitle="Apuntes breves para convertir proyectos, pruebas y lecturas en conocimiento reutilizable."
      />

      <div className="notes-layout">
        <div className="notes-list" aria-label="Listado de notas técnicas">
          {notes.map((note) => (
            <button
              className={`note-row ${selectedNote.slug === note.slug ? "is-active" : ""}`}
              key={note.slug}
              onClick={() => setSelectedSlug(note.slug)}
              type="button"
            >
              <span className="note-icon" aria-hidden="true">
                <Send size={18} />
              </span>
              <span>
                <strong>{note.title}</strong>
                <small>{note.summary}</small>
              </span>
              <em>
                {formatNoteDate(note.date)}
                <br />
                {note.readingTime}
              </em>
            </button>
          ))}
        </div>

        <article className="note-reader">
          <p className="panel-label">{formatNoteDate(selectedNote.date)}</p>
          <h3>{selectedNote.title}</h3>
          <div className="tag-row">
            {selectedNote.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{selectedNote.body}</ReactMarkdown>
        </article>
      </div>
    </section>
  );
}

function ProfileSection() {
  return (
    <section className="section profile-section" id="sobre-mi" aria-labelledby="profile-title">
      <div>
        <h2 id="profile-title">Formación y certificaciones</h2>
        <p>
          La base académica se complementa con certificaciones y aprendizaje práctico orientado a
          herramientas, programación y análisis técnico.
        </p>
      </div>
      <div className="profile-columns">
        <article>
          <p className="panel-label">Formación</p>
          <h3>{education.title}</h3>
          <p>
            {education.center}
            <br />
            {education.period}
          </p>
        </article>
        <article>
          <p className="panel-label">Certificaciones</p>
          <ul>
            {certifications.map((certification) => (
              <li key={certification}>{certification}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer" id="contacto">
      <div>
        <h2>Contacto</h2>
        <p>Abierto a oportunidades de prácticas, investigación y proyectos colaborativos.</p>
        <address>
          <a href={`mailto:${profile.email}`}>
            <Mail aria-hidden="true" size={18} />
            {profile.email}
          </a>
          <span>
            <MapPin aria-hidden="true" size={18} />
            {profile.location}
          </span>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            <Linkedin aria-hidden="true" size={18} />
            LinkedIn
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            <Github aria-hidden="true" size={18} />
            GitHub
          </a>
        </address>
      </div>
      <div className="footer-actions">
        <a className="button button-primary" href={`mailto:${profile.email}`}>
          <Mail aria-hidden="true" size={18} />
          Enviar email
        </a>
        <a className="button button-outline light" href={profile.cv} target="_blank" rel="noreferrer">
          <Download aria-hidden="true" size={18} />
          Descargar CV
        </a>
      </div>
    </footer>
  );
}

interface SectionHeaderProps {
  actionHref: string;
  actionLabel: string;
  subtitle: string;
  title: string;
}

function SectionHeader({ actionHref, actionLabel, subtitle, title }: SectionHeaderProps) {
  return (
    <div className="section-header">
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <a className="section-link" href={actionHref}>
        {actionLabel}
        <ArrowRight aria-hidden="true" size={16} />
      </a>
    </div>
  );
}

export default App;
