# Documentación de LiveStreamFront

## Descripción general
LiveStreamFront es una aplicación front-end basada en React creada con Vite. Utiliza herramientas modernas de desarrollo web y mejores prácticas para ofrecer una experiencia de usuario eficaz y escalable.

## Características clave
- **React + Vite**: garantiza ciclos de desarrollo rápidos con reemplazo de módulo en caliente (HMR).
- **Axios**: Se utiliza para realizar solicitudes HTTP e interactuar con la API.
- **React Router DOM**: Gestiona el enrutamiento y la navegación dentro de la aplicación.
- **Módulos CSS**: permite un estilo modular y de ámbito para los componentes.

## Mejores prácticas
- **Autenticación mediante contexto**: la aplicación utiliza React Context para administrar el estado y la lógica de autenticación, lo que garantiza un enfoque centralizado y coherente.
- **Técnica de polling**: Debido a limitaciones de tiempo, Socket.IO no se implementó. En cambio, se utilizó la técnica de polling para simular actualizaciones en tiempo real.

## Ejecutando la aplicación
Para iniciar la aplicación, utilice el siguiente comando:

## Nota
Les anexe el .env para que vean las variables a cambiar

```golpecito
npm run dev
