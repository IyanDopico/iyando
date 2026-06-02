# Iyán Dopico Martínez - Portfolio

Repositorio de la página personal de Iyán Dopico Martínez. Es una app React + Vite estática, pensada para publicarse en Cloudflare Pages o GitHub Pages desde el directorio `dist`.

## Estructura

```text
.
+-- index.html
+-- package.json
+-- vite.config.ts
+-- src/
|   +-- App.tsx
|   +-- components/
|   +-- content/
|   +-- data/
+-- public/
|   +-- 404.html
|   +-- _headers
|   +-- .nojekyll
|   +-- assets/
|       +-- files/
|       +-- images/
+-- README.md
```

## Desarrollo local

Instala dependencias y arranca Vite:

```powershell
npm.cmd install
npm.cmd run dev
```

Para generar la versión publicable:

```powershell
npm.cmd run build
```

## Despliegue en Cloudflare Pages

1. Crea un proyecto nuevo conectado a este repositorio.
2. Usa el preset `Vite` o `Static site`.
3. Usa `npm.cmd run build` como comando de build.
4. Usa `dist` como directorio de salida.

El archivo `_headers` se aplicará automáticamente en Cloudflare Pages.

## Despliegue en GitHub Pages

1. Entra en `Settings` > `Pages`.
2. En `Build and deployment`, selecciona `GitHub Actions`.
3. Usa el workflow incluido en `.github/workflows/pages.yml`.
4. Cada push a `main` compilará Vite y publicará `dist`.

El archivo `.nojekyll` evita que GitHub Pages intente procesar el sitio con Jekyll.
