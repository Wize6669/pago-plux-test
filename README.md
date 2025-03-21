# ¡Bienvenido al Proyecto!

Este repositorio contiene tanto el **frontend** como el **backend** de la aplicación. Para facilitar el proceso de levantado del proyecto, puedes usar Docker Compose o hacerlo manualmente. ¡Elige el método que más te convenga!

## 🐳 Levantar el Proyecto con Docker Compose

Si prefieres no complicarte, puedes levantar tanto el **frontend** como el **backend** con Docker Compose de manera rápida y sencilla:

1. Clona este repositorio en tu máquina local.
2. Abre una terminal en la raíz del proyecto.
3. Ejecuta el siguiente comando para levantar ambos servicios:
   
   ```bash
   docker-compose up --build

##  Levantar el Proyecto Manualmente

Si prefieres hacerlo manualmente, sigue los pasos a continuación para configurar tanto el **backend** como el **frontend**.

### ⚙️ Backend

1.  Navega a la carpeta del backend:

    ```bash
    cd /backend
    ```

2.  Crea un archivo `.env` en el directorio raíz del backend. Si no sabes qué incluir, puedes revisar el archivo `.env.example`, que contiene todos los parámetros necesarios para configurar el entorno.

3.  Instala las dependencias y compila el proyecto con pnpm:

    ```bash
    pnpm run build
    ```

4.  Inicia el servidor:

    ```bash
    pnpm run start
    ```
    
### 🎨 Frontend

1.  Abre una nueva terminal y navega a la carpeta del frontend:

    ```bash
    cd /frontend
    ```

2. Revisa el archivo `environment.development.ts` y transcribe la información necesaria a tu archivo `environment.ts`. Esto es fundamental para configurar correctamente el frontend.

3.  Asegúrate de tener todas las dependencias necesarias y, si no las has instalado aún, puedes hacerlo con:

    ```bash
    npm install
    ```

4.  Finalmente, para iniciar el servidor del frontend, ejecuta:

    ```bash
    ng serve
    ```
