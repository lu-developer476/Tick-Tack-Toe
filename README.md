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

Videojuego web del **Ta Te Tí / Tic-Tac-Toe** hecho con **Python y Django**, con lógica de partida en **JavaScript**, estilos responsivos en **CSS** y configuración simple para ejecución local o despliegue en plataformas como Render.

## Estado actual del proyecto

El proyecto se encuentra en estado **funcional**. Actualmente permite jugar partidas completas desde el navegador, conservar preferencias y marcador en `localStorage`, servir la interfaz desde Django y preparar archivos estáticos para producción con WhiteNoise.

### Funcionalidades disponibles

- Juego **Jugador vs Jugador**.
- Juego **Jugador vs IA** con 5 niveles de dificultad.
- IA con jugadas aleatorias, bloqueos, búsqueda de victoria y estrategia Minimax en niveles avanzados.
- Selector de jugador inicial: X u O.
- Selector de tema visual: modo oscuro y modo claro.
- Marcador persistente de victorias de X, victorias de O/IA y empates.
- Botones para reiniciar partida, deshacer jugada y borrar marcador.
- Interfaz responsive para escritorio, tablet y móvil.
- Favicon SVG propio del juego.
- Backend Django mínimo para renderizar la vista principal y servir recursos estáticos.
- Configuración base para despliegue WSGI con Gunicorn y WhiteNoise.

## Stack tecnológico

| Capa | Tecnología | Uso en el proyecto |
| --- | --- | --- |
| Backend | Python 3.10+ | Runtime principal de la aplicación. |
| Backend web | Django 4.2+ | Servidor, ruteo y renderizado de la plantilla del juego. |
| Frontend | HTML5, CSS3 y JavaScript ES6+ | Interfaz, estilos, estado de partida e IA del juego. |
| Persistencia local | `localStorage` | Preferencias del usuario y marcador. |
| Base de datos | SQLite | Configuración por defecto de Django para entorno local. |
| Producción | Gunicorn | Servidor WSGI recomendado para despliegue. |
| Archivos estáticos | WhiteNoise | Servicio de estáticos en entornos productivos. |
| Deploy sugerido | Render | Plataforma objetivo documentada para despliegue. |

## Requisitos

- Python 3.10 o superior.
- `pip` actualizado.
- Navegador moderno con soporte para JavaScript y `localStorage`.

## Ejecución local

1. Clonar el repositorio.
2. Crear y activar un entorno virtual (opcional, recomendado):

```bash
python -m venv .venv
source .venv/bin/activate
```

3. Instalar dependencias:

```bash
pip install -r requirements.txt
```

4. Aplicar migraciones:

```bash
python manage.py migrate
```

5. Iniciar el servidor de desarrollo:

```bash
python manage.py runserver
```

6. Abrir en el navegador:

```text
http://127.0.0.1:8000/
```

## Despliegue en Render

Para desplegar en Render u otra plataforma compatible con WSGI, se recomienda usar un comando de build que instale dependencias, ejecute `collectstatic` y aplique migraciones.

Comando sugerido de build:

```bash
pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate
```

Comando sugerido de inicio:

```bash
gunicorn tictactoe_project.wsgi:application
```

> Nota: la configuración actual usa `DEBUG = True`, `SECRET_KEY` de desarrollo y `ALLOWED_HOSTS = ['*']`. Para un despliegue público conviene mover esos valores a variables de entorno y desactivar `DEBUG`.

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
├── manage.py
├── requirements.txt
└── README.md
```

## Próximos pasos sugeridos

- Externalizar `SECRET_KEY`, `DEBUG` y `ALLOWED_HOSTS` mediante variables de entorno.
- Agregar pruebas automatizadas para vistas Django y funciones críticas del frontend.
- Incorporar una pantalla de ayuda con reglas del juego y descripción de niveles de IA.
- Evaluar empaquetado de assets o linting para JavaScript/CSS si el frontend crece.
