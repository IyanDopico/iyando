import type { ComponentType } from "react";

export type ProjectCategory = "Investigación" | "Sistemas embebidos" | "Campo" | "Innovación";

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  title: string;
  period: string;
  organization: string;
  summary: string;
  details: string[];
  tags: string[];
  category: ProjectCategory;
  status: "Actual" | "Completado" | "En desarrollo";
  links: ProjectLink[];
}

export interface LabDemo {
  id: string;
  title: string;
  summary: string;
  component: ComponentType;
  difficulty: "Didáctica" | "Técnica" | "Avanzada";
  tags: string[];
}

export interface Note {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  readingTime: string;
  body: string;
}
