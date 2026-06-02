# Iyan Dopico Martinez - Portfolio

Repositorio de la pagina personal de Iyan Dopico Martinez. Es una app React + Vite estatica, pensada para publicarse en Cloudflare Pages, Cloudflare Workers con static assets o GitHub Pages desde el directorio `dist`.

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
+-- wrangler.jsonc
+-- README.md
```

## Desarrollo local

Instala dependencias y arranca Vite en Windows:

```powershell
npm.cmd install
npm.cmd run dev
```

Para generar la version publicable:

```powershell
npm.cmd run build
```

En Linux/macOS o en CI, usa `npm`, no `npm.cmd`:

```bash
npm install
npm run build
```

## Despliegue en Cloudflare Pages

En el dashboard de Cloudflare Pages:

- `Root directory`: vacio o `/`
- `Build command`: `npm run build`
- `Build output directory`: `dist`
- `Deploy command`: vacio

No configures `dist` como `Root directory`: esa carpeta se crea despues de ejecutar el build.

El archivo `_headers` se aplica automaticamente en Cloudflare Pages.

## Despliegue en Cloudflare Workers con static assets

Si el proyecto esta configurado como Worker, no como Pages:

- `Root directory`: vacio o `/`
- `Build command`: `npm run build`
- `Deploy command`: `npx wrangler deploy`

El archivo `wrangler.jsonc` usa `dist` como carpeta de assets.

## Despliegue en GitHub Pages

1. Entra en `Settings` > `Pages`.
2. En `Build and deployment`, selecciona `GitHub Actions`.
3. Usa el workflow incluido en `.github/workflows/pages.yml`.
4. Cada push a `main` compilara Vite y publicara `dist`.

El archivo `.nojekyll` evita que GitHub Pages intente procesar el sitio con Jekyll.
