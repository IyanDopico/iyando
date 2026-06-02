import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import matter from "gray-matter";
import { readdirSync, readFileSync } from "node:fs";
import { basename, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";

const countReadingTime = (body: string) => {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 180))} min`;
};

const notesPlugin = (): Plugin => ({
  name: "portfolio-notes",
  resolveId(id) {
    return id === "virtual:notes" ? "\0virtual:notes" : null;
  },
  load(id) {
    if (id !== "\0virtual:notes") {
      return null;
    }

    const projectRoot = fileURLToPath(new URL(".", import.meta.url));
    const notesDir = resolve(projectRoot, "src/content/notes");
    const notes = readdirSync(notesDir)
      .filter((file) => file.endsWith(".md"))
      .map((file) => {
        const parsed = matter(readFileSync(resolve(notesDir, file), "utf8"));
        const data = parsed.data as {
          date?: string;
          summary?: string;
          tags?: string[];
          title?: string;
        };

        return {
          slug: basename(file, ".md"),
          title: data.title ?? "Nota técnica",
          date: data.date ?? "2026-01-01",
          summary: data.summary ?? "Apunte técnico breve.",
          tags: data.tags ?? [],
          readingTime: countReadingTime(parsed.content),
          body: parsed.content,
        };
      })
      .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

    return `export default ${JSON.stringify(notes)};`;
  },
});

export default defineConfig({
  base: "./",
  plugins: [react(), notesPlugin()],
});
