# Tick Tack Toe

![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Django](https://img.shields.io/badge/Django-4.2+-092E20?style=for-the-badge&logo=django&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-Markup-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Styling-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-Default%20DB-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![Gunicorn](https://img.shields.io/badge/Gunicorn-WSGI-499848?style=for-the-badge&logo=gunicorn&logoColor=white)
![WhiteNoise](https://img.shields.io/badge/WhiteNoise-Static%20Files-444444?style=for-the-badge)
![Render](https://img.shields.io/badge/Render-Deploy-46E3B7?style=for-the-badge&logo=render&logoColor=black)
![License](https://img.shields.io/badge/License-Proprietary-red?style=for-the-badge)

Aplicación web del **Ta Te Tí / Tic-Tac-Toe** construida con **Python y Django**. El backend expone una vista Django simple y sirve la plantilla principal; la experiencia de juego vive en el frontend con **JavaScript**, **HTML** y **CSS** responsivo.

## Estado actual del proyecto

El proyecto está en estado **funcional y jugable**. La versión actual permite iniciar partidas desde el navegador, cambiar la configuración de juego, conservar preferencias y marcador en `localStorage`, y ejecutar la app localmente o en un entorno WSGI como Render.

### Alcance implementado

- Tablero 3x3 generado dinámicamente en JavaScript.
- Modo **Jugador vs Jugador**.
- Modo **Jugador vs IA**.
- 5 niveles de dificultad para la IA:
  - Nivel 1: jugadas aleatorias.
  - Nivel 2: intentos probabilísticos de ganar o bloquear.
  - Nivel 3: victoria, bloqueo, centro y movimientos preferidos.
  - Nivel 4: victoria, bloqueo y Minimax con profundidad limitada.
  - Nivel 5: Minimax completo.
- Selector de jugador inicial (**X** u **O**).
- Selector de tema visual (**oscuro** o **claro**).
- Marcador persistente para victorias de X, victorias de O/IA y empates.
- Persistencia de preferencias de modo, dificultad, primer turno y tema en `localStorage`.
- Acciones para **deshacer jugada**, **reiniciar partida** y **borrar marcador**.
- Estados de turno, victoria y empate con mensajes visibles y `aria-live`.
- Resaltado de la combinación ganadora.
- Controles y celdas con etiquetas ARIA básicas.
- Interfaz responsive para escritorio, tablet y móvil.
- Favicon SVG del juego.
- Configuración de archivos estáticos con WhiteNoise.
- Configuración WSGI lista para correr con Gunicorn.

### Limitaciones conocidas

- No hay autenticación ni perfiles de usuario.
- No hay persistencia en base de datos para partidas o marcadores; el estado se guarda localmente en el navegador.
- No hay suite de pruebas automatizadas incluida todavía.
- La configuración actual es de desarrollo: `DEBUG = True`, `SECRET_KEY` fija y `ALLOWED_HOSTS = ['*']`.
- La base de datos SQLite está configurada por defecto, aunque la app actual no define modelos propios.

## Stack tecnológico

| Capa | Tecnología | Uso en el proyecto |
| --- | --- | --- |
| Runtime | Python 3.10+ | Ejecución del proyecto Django. |
| Backend web | Django 4.2+ | Ruteo, vista principal, templates y estáticos. |
| Frontend | HTML5, CSS3 y JavaScript ES6+ | Interfaz, tablero, reglas, IA y estado de partida. |
| Persistencia local | `localStorage` | Preferencias de usuario y marcador. |
| Base de datos | SQLite | Configuración por defecto de Django para entorno local. |
| Producción | Gunicorn | Servidor WSGI recomendado para despliegue. |
| Archivos estáticos | WhiteNoise | Servicio de assets estáticos en despliegues WSGI. |
| Deploy sugerido | Render | Plataforma objetivo contemplada por la configuración actual. |

## Requisitos

- Python 3.10 o superior.
- `pip` actualizado.
- Navegador moderno con soporte para JavaScript y `localStorage`.

## Ejecución local

1. Clonar el repositorio y entrar al directorio del proyecto.

2. Crear y activar un entorno virtual (recomendado):

```bash
python -m venv .venv
source .venv/bin/activate
```

3. Instalar dependencias:

```bash
pip install -r requirements.txt
```

4. Aplicar migraciones de Django:

```bash
python manage.py migrate
```

5. Iniciar el servidor de desarrollo:

```bash
python manage.py runserver
```

6. Abrir la app en el navegador:

```text
http://127.0.0.1:8000/
```

## Comandos útiles

Verificar la configuración del proyecto:

```bash
python manage.py check
```

Recolectar archivos estáticos para producción:

```bash
python manage.py collectstatic --noinput
```

Ejecutar con Gunicorn:

```bash
gunicorn tictactoe_project.wsgi:application
```

## Despliegue en Render o WSGI

Para Render u otra plataforma compatible con WSGI, se puede usar un flujo de build que instale dependencias, recolecte estáticos y aplique migraciones.

Comando sugerido de build:

```bash
pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate
```

Comando sugerido de inicio:

```bash
gunicorn tictactoe_project.wsgi:application
```

Antes de publicar la app, se recomienda mover a variables de entorno:

- `SECRET_KEY`
- `DEBUG`
- `ALLOWED_HOSTS`

## Estructura general

```text
.
├── game/
│   ├── static/
│   │   ├── css/style.css
│   │   ├── js/game.js
│   │   └── favicon.svg
│   ├── templates/index.html
│   └── views.py
├── tictactoe_project/
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── LICENSE
├── manage.py
├── requirements.txt
└── README.md
```

## Próximos pasos sugeridos

- Externalizar `SECRET_KEY`, `DEBUG` y `ALLOWED_HOSTS` mediante variables de entorno.
- Agregar pruebas automatizadas para la vista Django y la lógica crítica del frontend.
- Incorporar una pantalla de ayuda con reglas del juego y descripción de niveles de IA.
- Guardar historial de partidas o marcadores en base de datos si se agregan usuarios.
- Evaluar linting/formateo para JavaScript y CSS si el frontend sigue creciendo.

## Licencia

Este proyecto usa una licencia propietaria. Ver `LICENSE` para más detalles.
