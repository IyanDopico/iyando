import RfCalculator from "../components/lab/RfCalculator";
import ProjectMapDemo from "../components/lab/ProjectMapDemo";
import SignalVisualizer from "../components/lab/SignalVisualizer";
import type { LabDemo } from "../types/portfolio";

export const labDemos: LabDemo[] = [
  {
    id: "project-map",
    title: "Mapa de proyectos",
    summary: "Explora proyectos por categoría y abre un panel con contexto, aprendizajes y siguientes pasos.",
    component: ProjectMapDemo,
    difficulty: "Didáctica",
    tags: ["Portfolio", "Timeline", "Contexto"],
  },
  {
    id: "signal-visualizer",
    title: "Visualizador de señales",
    summary: "Modifica amplitud, frecuencia, fase y ruido para ver cómo cambia una señal temporal.",
    component: SignalVisualizer,
    difficulty: "Técnica",
    tags: ["Señales", "Visualización", "Parámetros"],
  },
  {
    id: "rf-calculator",
    title: "Calculadora RF",
    summary: "Calcula pérdida de espacio libre, potencia recibida y margen de enlace en un escenario RF.",
    component: RfCalculator,
    difficulty: "Técnica",
    tags: ["RF", "FSPL", "Enlace"],
  },
];
