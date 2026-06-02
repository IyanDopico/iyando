import { useMemo, useState } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { projects } from "../../data/projects";
import type { ProjectCategory } from "../../types/portfolio";

const allCategories = ["Todos", ...Array.from(new Set(projects.map((project) => project.category)))] as const;

export default function ProjectMapDemo() {
  const [activeCategory, setActiveCategory] = useState<(typeof allCategories)[number]>("Todos");
  const [activeProjectId, setActiveProjectId] = useState(projects[0].id);

  const filteredProjects = useMemo(
    () =>
      activeCategory === "Todos"
        ? projects
        : projects.filter((project) => project.category === (activeCategory as ProjectCategory)),
    [activeCategory],
  );

  const activeProject =
    projects.find((project) => project.id === activeProjectId) ?? filteredProjects[0] ?? projects[0];

  return (
    <div className="demo-split">
      <div className="project-map-panel" aria-label="Mapa interactivo de proyectos">
        <div className="map-filter-row">
          {allCategories.map((category) => (
            <button
              className={`filter-chip ${activeCategory === category ? "is-active" : ""}`}
              key={category}
              onClick={() => {
                setActiveCategory(category);
                const nextProject =
                  category === "Todos"
                    ? projects[0]
                    : projects.find((project) => project.category === (category as ProjectCategory));
                if (nextProject) {
                  setActiveProjectId(nextProject.id);
                }
              }}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>

        <div className="signal-map">
          <span className="signal-line" aria-hidden="true" />
          {filteredProjects.map((project, index) => (
            <button
              aria-pressed={activeProject.id === project.id}
              className={`map-node node-${index + 1} ${activeProject.id === project.id ? "is-active" : ""}`}
              key={project.id}
              onClick={() => setActiveProjectId(project.id)}
              type="button"
            >
              <MapPin aria-hidden="true" size={18} />
              <span>{project.title}</span>
            </button>
          ))}
        </div>
      </div>

      <article className="detail-panel">
        <p className="panel-label">{activeProject.category}</p>
        <h3>{activeProject.title}</h3>
        <p>{activeProject.summary}</p>
        <ul>
          {activeProject.details.slice(0, 3).map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
        <a href={activeProject.links[0]?.href ?? "#proyectos"} className="text-link">
          {activeProject.links[0]?.label ?? "Ver proyecto"}
          <ArrowUpRight aria-hidden="true" size={15} />
        </a>
      </article>
    </div>
  );
}
