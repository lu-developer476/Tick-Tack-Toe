# Ta Te Tí con Django

Aplicación web de **Ta Te Tí** desarrollada con Django y JavaScript, con una interfaz minimalista en escala de grises y una estructura simple para desplegar en plataformas como Render.

## Descripción
Este proyecto implementa una partida de Ta Te Tí para dos jugadores en el navegador. El frontend renderiza el tablero y maneja la lógica principal del juego, mientras que Django actúa como servidor de la aplicación y gestor de archivos estáticos.

## Características principales
- Interfaz limpia, responsive y enfocada en la jugabilidad.
- Dos modos de juego: Jugador vs Jugador y Jugador vs IA.
- IA configurable con 5 niveles de dificultad (de muy fácil a experto).
- Lógica de juego en JavaScript (turnos, victoria, empate y reinicio).
- Backend en Django listo para entorno local o despliegue en la nube.
- Configuración de estáticos con WhiteNoise para entornos productivos.

## Requisitos
- Python 3.10 o superior.
- `pip` actualizado.

## Ejecución local
1. Clonar el repositorio.
2. Instalar dependencias:

```bash
pip install -r requirements.txt
```

3. Aplicar migraciones:

```bash
python manage.py migrate
```

4. Iniciar el servidor de desarrollo:

```bash
python manage.py runserver
```

5. Abrir en navegador:

```text
http://127.0.0.1:8000/
```

## Despliegue (Render)
Para desplegar en Render, se recomienda usar un comando de build que instale dependencias, ejecute `collectstatic` y aplique migraciones. Este repositorio ya incluye dependencias y configuración base para ese flujo.

## Estructura general
- `tictactoe_project/`: configuración principal de Django.
- `game/`: app del juego (vista, plantilla HTML, estilos y scripts).
- `requirements.txt`: dependencias del proyecto.

## Estado del proyecto
Proyecto funcional y utilizable como base para prácticas de Django, frontend básico y despliegue de aplicaciones web ligeras.
