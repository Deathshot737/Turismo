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

1. **Clona el repositorio:**

    ```bash
    git clone https://github.com/Deathshot737/Turismo.git
    cd turismo
    ```

2. **Configura el entorno Python:**

    Puedes trabajar de dos formas:

    a. **Usar el intérprete de Python directamente:**

        Verifica que Python esté instalado:

        ```bash
        python --version
        ```

    b. **Usar un entorno virtual aislado:**

        Verifica que Python esté instalado:

        ```bash
        python --version
        ```

        Crea el entorno virtual:

        ```bash
        python -m venv .venv
        ```

        Activa el entorno virtual:

        - En Windows:

          ```bash
          .venv\Scripts\activate
          ```

        - En Linux/MacOS:

          ```bash
          source .venv/bin/activate
          ```

    Instala las dependencias necesarias:

    ```bash
    pip install -r api/requirements.txt
    ```

3. **Modifica el archivo `.env` (si es necesario):**

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
