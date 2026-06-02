/// <reference types="vite/client" />

declare module "virtual:notes" {
  import type { Note } from "./types/portfolio";

  const notes: Note[];
  export default notes;
}
