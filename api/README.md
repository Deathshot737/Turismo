# 🧭 Turismo API

API desarrollada para gestionar reservas, usuarios y servicios turísticos. Construida con FastAPI y SQLAlchemy, diseñada para ser modular, escalable y fácil de mantener.

---

## 🧰 Tecnologías

1. **Python**  
    Lenguaje de programación versátil y fácil de aprender, ampliamente utilizado para desarrollo web, automatización y ciencia de datos.

2. **FastAPI**  
    Framework moderno y rápido para construir APIs con Python, que destaca por su rendimiento, facilidad de uso y soporte para tipado estático.

3. **MySQL**  
    Sistema de gestión de bases de datos relacional, popular por su fiabilidad, escalabilidad y facilidad de integración con aplicaciones web.

4. **Uvicorn**  
    Servidor ASGI ligero y eficiente, ideal para ejecutar aplicaciones web asíncronas desarrolladas con FastAPI y otros frameworks modernos.

---

## 🚀 Características

- Gestión de usuarios con autenticación segura.
- CRUD de reservas, servicios y rutas.
- Integración con base de datos SQL (PostgreSQL, MySQL, etc.).
- Arquitectura modular con controladores y utilidades reutilizables.
- Configuración dinámica mediante archivos `.env` y Pydantic.

---

## 🛠 Instalación

Sigue estos pasos para instalar y configurar el proyecto. Todos los comandos están listos para copiar y pegar.

1. **Clona el repositorio:**

    ```bash
    git clone https://github.com/Deathshot737/Turismo.git
    cd Turismo
    ```

2. **Verifica que Python esté instalado:**

    ```bash
    python --version
    ```

3. **Crea y activa un entorno virtual:**

    - **Windows:**
        ```bash
        python -m venv .venv
        .venv\Scripts\activate
        ```
    - **Linux/MacOS:**
        ```bash
        python3 -m venv .venv
        source .venv/bin/activate
        ```

4. **Instala las dependencias necesarias:**

    ```bash
    pip install -r api/requirements.txt
    ```

5. **Modifica el archivo `.env` (si es necesario):**

    Ajusta las siguientes variables según tu configuración:

    - `DATABASE_URL`: Cambia el servidor de la base de datos, nombre de la BD, usuario, contraseña o el gestor de base de datos.
    - `SECRET_KEY`: Cambia la clave secreta para un cifrado más seguro.
    - `DEBUG`: Cambia el estado de depuración.
    - `ALGORITHM`: Cambia el algoritmo de cifrado de tokens.

---

## 🚦 Iniciar Servicio

Inicia el servidor de desarrollo con el siguiente comando:

```bash
uvicorn api.app.main:app --reload
```
