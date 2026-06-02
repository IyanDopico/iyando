import rawNotes from "virtual:notes";
import type { Note } from "../types/portfolio";

const formatter = new Intl.DateTimeFormat("es-ES", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export const notes: Note[] = rawNotes;

export const formatNoteDate = (date: string) => formatter.format(new Date(date));
