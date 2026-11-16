# Guía rápida: trabajar con buba-app (Windows + VS Code)

## 1. Abrir el proyecto

1. Abrí **VS Code**.
2. Menú **File → Open Folder...** (Archivo → Abrir carpeta).
3. Elegí la carpeta `C:\Users\jiessi\Documents\BubaApp\buba-app` y tocá **Seleccionar carpeta**.
   - Si pregunta "¿Confiás en los autores de esta carpeta?", respondé que sí.
4. Abrí la terminal: menú **Terminal → New Terminal** (o `Ctrl + ñ`).
   La terminal aparece abajo y ya está parada en la carpeta del proyecto.

## 2. Chequear que estén las herramientas (solo si algo falla)

```
node -v
npm -v
git --version
```

Cada uno tiene que mostrar un número de versión. Si `node` no existe, instalalo desde https://nodejs.org (versión LTS).

## 3. Traer la última versión desde GitHub

Siempre antes de empezar a trabajar:

```
git checkout main
git pull
```

## 4. Instalar dependencias

```
npm install
```

Hacelo la primera vez, y cada vez que cambie `package.json` o `package-lock.json`
(por ejemplo después de un `git pull` que trae actualizaciones). Tarda 1 o 2 minutos.
Crea la carpeta `node_modules` (no se sube a GitHub, es normal que sea pesada).

## 5. Ver la app en tu PC mientras editás

```
npm start
```

Se abre el navegador en http://localhost:3000/buba-app/. Cada vez que guardás un archivo,
la página se actualiza sola. Para frenarlo: hacé clic en la terminal y apretá `Ctrl + C`
(si pregunta "¿Terminar el trabajo por lotes?", respondé `S`).

## 6. Guardar tus cambios en GitHub

Desde el panel **Source Control** de VS Code (el ícono de ramitas a la izquierda, o `Ctrl + Shift + G`):

1. Escribí un mensaje que describa el cambio.
2. Tocá **Commit** (si pregunta por agregar todos los cambios, sí).
3. Tocá **Sync Changes** / **Push**.

O por terminal:

```
git add .
git commit -m "descripción del cambio"
git push
```

## 7. Publicar en el sitio (juaniessi.github.io/buba-app)

```
npm run deploy
```

Esto compila la app (`npm run build`) y la sube a la rama `gh-pages`.
A los 1–2 minutos el sitio queda actualizado. Si no ves el cambio, recargá con `Ctrl + F5`.

## 8. Revisar alertas de seguridad

```
npm audit
```

Muestra vulnerabilidades en las dependencias. **No uses `npm audit fix --force`**:
puede instalar versiones incompatibles y romper la app. Las alertas que quedan hoy
son de herramientas de desarrollo y no afectan al sitio publicado.

## Problemas comunes

| Síntoma | Solución |
|---|---|
| `'react-scripts' no se reconoce...` | Falta `npm install`. |
| `Something is already running on port 3000` | Ya hay un `npm start` abierto en otra terminal. Cerralo o respondé `Y` para usar otro puerto. |
| Errores raros después de actualizar | Borrá la carpeta `node_modules` y corré `npm install` de nuevo. |
| `git pull` dice que hay cambios locales | Hacé commit de tus cambios (paso 6) antes del pull. |
