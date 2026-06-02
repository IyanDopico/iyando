# Iyán Dopico Martínez - Portfolio

Repositorio de la página personal de Iyán Dopico Martínez. Es una web estática, sin paso de build, pensada para publicarse directamente en Cloudflare Pages o GitHub Pages.

## Estructura

```text
.
+-- index.html
+-- 404.html
+-- _headers
+-- .nojekyll
+-- assets/
|   +-- files/
|   |   +-- cv-iyan-dopico.pdf
|   +-- images/
|   |   +-- fotoperfil-iyan.png
|   +-- styles/
|       +-- main.css
+-- README.md
```

## Desarrollo local

La página funciona abriendo `index.html` directamente en el navegador. Si prefieres servirla con un servidor local:

```powershell
python -m http.server 8000
```

Después abre `http://localhost:8000`.

## Despliegue en Cloudflare Pages

1. Crea un proyecto nuevo conectado a este repositorio.
2. Usa el preset `None` o `Static site`.
3. Deja el comando de build vacío.
4. Usa `.` como directorio de salida.

El archivo `_headers` se aplicará automáticamente en Cloudflare Pages.

## Despliegue en GitHub Pages

1. Entra en `Settings` > `Pages`.
2. Selecciona `Deploy from a branch`.
3. Elige la rama principal y la carpeta `/ (root)`.
4. Guarda los cambios.

El archivo `.nojekyll` evita que GitHub Pages intente procesar el sitio con Jekyll.
