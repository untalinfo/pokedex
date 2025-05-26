# Pokedex - Frontend Project

Este proyecto es una aplicación frontend basada en React que sigue una arquitectura limpia, usando la API de https://pokeapi.co/. Está diseñada para ser una base reutilizable para aplicaciones frontend modernas.

## Tecnologías incluidas

- **React**: Biblioteca para construir interfaces de usuario.
- **Redux Toolkit**: Manejo del estado global.
- **React Router DOM**: Enrutamiento para aplicaciones de una sola página.
- **SASS**: Preprocesador CSS para estilos avanzados.
- **Husky y lint-staged**: Para mantener la calidad del código en los commits.
- **Prettier y ESLint**: Para formateo y linting del código.

## Estructura del proyecto

```
src
|--- domains/
|    |--- authentication/
|          |--- application/
|              |--- slices/
|                   |--- user.js
|              |--- selectors/
|          |--- infrastructure/
|              |--- api.js
|              |--- router.js
|              |--- routes.js
|          |--- presentation/
|              |--- components/
|                   |--- Login
|                        |--- index.js
|                        |--- Login.scss
|              |--- pages/
|                   |--- Login.js
|    |--- project/
|--- shared/
```

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- **Node.js** (versión 16.x o superior)
- **Yarn** (opcional, pero recomendado)

## Instrucciones para correr el proyecto en local

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/pokedex.git
   cd pokedex
   ```

2. **Instalar dependencias**:
   ```bash
   yarn install
   ```

3. **Configurar variables de entorno**:
   Crea un archivo `.env` en la raíz del proyecto y define las variables necesarias. Por ejemplo:
   ```
   REACT_APP_URL_PROD=https://pokeapi.co/api/v2/
   ```

4. **Iniciar el servidor de desarrollo**:
   ```bash
   yarn start
   ```

   Esto abrirá la aplicación en `http://localhost:3000`.

5. **Construir para producción**:
   Si deseas generar una versión optimizada para producción, ejecuta:
   ```bash
   yarn build
   ```

6. **Ejecutar pruebas**:
   Para correr las pruebas unitarias:
   ```bash
   yarn test
   ```

## Última actualización

**12/05/2024**