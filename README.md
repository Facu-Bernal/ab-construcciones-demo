# AB Construcciones — Sitio conceptual v0.1

Prototipo estático, **sin frameworks, sin bases de datos, sin trackers y sin necesidad de hosting de pago**. Compatible con GitHub Pages desde la raíz de la rama `main`.

## Qué incluye
- Portada editorial con imagen IA, retícula arquitectónica y parallax.
- Sección de transición «Del trazo a la materia», animada durante el scroll.
- Tres áreas de servicio: construcción, instalaciones y arquitectura/interiorismo.
- Ámbitos de proyecto, portfolio conceptual con filtros y ventanas de detalle operativas.
- Navegación adaptable para móviles, tablets y computadoras.
- Formulario de demostración: **no envía datos**; prepara texto y permite copiarlo.
- SEO estructural de prueba: título, descripción, idiomas, datos Open Graph, imágenes con texto alternativo, encabezados semánticos y medidas básicas de accesibilidad.
- Modo de movimiento reducido, imágenes optimizadas en WebP, JavaScript y CSS sin dependencias externas.

**Importante:** Todas las fotos son imágenes generadas con IA. No son obras realizadas por AB. El nombre AB es provisional. No se incorporan clientes, métricas, dirección, correos ni números ficticios.

## Vista local
Abrir `index.html` en un navegador moderno. Si el navegador bloquea alguna función local, levantar un servidor desde el directorio raíz:

```bash
python -m http.server 8000
```

Y abrir `http://localhost:8000`.

## GitHub Pages (publicación de prueba)
1. Crear un repositorio público, por ejemplo `ab-construcciones-demo`.
2. Descomprimir el ZIP y subir **todos los archivos y carpetas extraídos**, incluidos `index.html` y `.nojekyll`, a la raíz del repositorio.
3. En **Settings → Pages → Build and deployment**, elegir **Deploy from a branch**.
4. Seleccionar **main** y carpeta **/(root)**, guardar.
5. Abrir la URL que publique GitHub, normalmente `https://USUARIO.github.io/ab-construcciones-demo/`.

GitHub Pages publica sitios estáticos. Este proyecto utiliza exclusivamente rutas relativas, por lo que funciona tanto desde la raíz del dominio como desde un subdirectorio `/nombre-repositorio/`.

## Archivos importantes
- `index.html`: estructura y textos visibles.
- `assets/css/styles.css`: visual, layouts, colores y responsive.
- `assets/js/main.js`: menú, parallax, filtros, demostración de contacto.
- `assets/images/`: fotos conceptuales IA y miniatura para redes.
- `assets/favicon.svg`: identificador temporal AB.
- `.nojekyll`: evita procesamiento de Jekyll al publicar por rama.
- `PREPUBLICACION.md`: tareas de SEO y lanzamiento pendientes.

## Modificaciones sencillas
- **Cambiar marca:** reemplazar textos `AB`, `AB Construcciones`, `<title>`, `og:title` y favicon.
- **Cambiar fotos:** sustituir los archivos WebP de `assets/images/` por versiones reales conservando los nombres, o cambiar la ruta `src` correspondiente en el HTML. Respetar proporciones similares, preferentemente 16:9.
- **Cambiar colores:** editar variables de `:root` al inicio de `assets/css/styles.css`.
- **Agregar contactos reales:** definir una dirección corporativa y WhatsApp Business al lanzar; el formulario actual es demostrativo y nunca manda mensajes.

## Método de trabajo
Versión → prueba en GitHub Pages → captura/notas de fallos → revisión → v0.2, conservando el repositorio y archivos. Cambiar de nombre no exige rehacer las páginas.
