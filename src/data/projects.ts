import type { Project } from "../types/portfolio";

export const projects: Project[] = [
  {
    id: "cosle",
    title: "COSLE",
    period: "2026 - actualidad",
    organization: "Laboratorio de Teoría de la Señal y Comunicaciones",
    summary:
      "Sistema de comunicación para exploración lunar con trabajo de laboratorio, prototipado e instrumentación.",
    details: [
      "Participación en el proyecto Communication System for Lunar Surface and Subsurface Exploration.",
      "Desarrollo de un sistema portátil de medida de comunicaciones.",
      "Programación en Python orientada a adquisición, análisis y validación experimental.",
      "Integración de Raspberry Pi y hardware auxiliar para campañas de medida.",
    ],
    tags: ["Python", "RF", "Raspberry Pi", "Investigación"],
    category: "Investigación",
    status: "Actual",
    links: [{ label: "Ver contexto", href: "#laboratorio" }],
  },
  {
    id: "esp32",
    title: "Sistemas con ESP32",
    period: "2024 - 2025",
    organization: "Prototipos de laboratorio",
    summary:
      "Enlaces inalámbricos emisor-receptor con microcontroladores ESP32 y validación de comportamiento en laboratorio.",
    details: [
      "Diseño de prototipos para comunicación inalámbrica de baja complejidad.",
      "Experimentación con envío, recepción y lectura de datos entre nodos.",
      "Uso de firmware y pruebas iterativas para entender pérdidas, alcance y estabilidad.",
    ],
    tags: ["ESP32", "IoT", "Wireless", "C/C++"],
    category: "Sistemas embebidos",
    status: "Completado",
    links: [{ label: "Abrir módulo", href: "#laboratorio" }],
  },
  {
    id: "propagacion",
    title: "Analysis of Propagation in Forests",
    period: "2024",
    organization: "Workshop técnico",
    summary:
      "Análisis de propagación en entornos naturales mediante medidas de campo, antenas y comparación de modelos.",
    details: [
      "Trabajo sobre propagación de señales en bosques y zonas naturales.",
      "Integración de sistemas de medida de radiofrecuencia.",
      "Análisis de datos y comparación con modelos de propagación.",
    ],
    tags: ["Medidas", "Antenas", "Propagación", "Modelado"],
    category: "Campo",
    status: "Completado",
    links: [{ label: "Ver mapa", href: "#mapa" }],
  },
  {
    id: "innovation-skills",
    title: "Uniovi Innovation Skills",
    period: "2024 - 2025",
    organization: "Universidad de Oviedo · Gijón Impulsa",
    summary:
      "Programa de innovación con trabajo colaborativo, retos reales y proyecto ganador.",
    details: [
      "Participación en retos de innovación y resolución de problemas.",
      "Trabajo en equipo con enfoque de validación y presentación de soluciones.",
      "Proyecto ganador del programa.",
    ],
    tags: ["Innovación", "Equipo", "Retos", "Comunicación"],
    category: "Innovación",
    status: "Completado",
    links: [{ label: "Ver detalle", href: "#proyectos" }],
  },
];
