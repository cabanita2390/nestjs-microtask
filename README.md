# MicroTask Manager

## Descripción del Proyecto

MicroTask Manager es un sistema de gestión de tareas desarrollado utilizando NestJS y adoptando una arquitectura de microservicios. El sistema permite a los usuarios crear, actualizar, asignar y visualizar tareas en un entorno colaborativo distribuido. Este proyecto fue realizado como parte de una prueba técnica para el puesto de Desarrollador BackEnd en Inlaze, una compañía de marketing de afiliados especializada en apuestas deportivas en Colombia.

### Funcionalidades Requeridas

#### Gestión de Tareas:

- **Crear nuevas tareas**: Los usuarios pueden crear nuevas tareas especificando un título, una descripción, una fecha límite y un estado (por hacer, en progreso, completada).
- **Actualizar tareas existentes**: Los usuarios pueden actualizar la información de una tarea existente, incluyendo el título, la descripción, la fecha límite y el estado.
- **Asignar tareas**: Los usuarios pueden asignar una tarea a un usuario o equipo específico.
- **Marcar tareas como completadas**: Los usuarios pueden marcar una tarea como completada y restablecerla al estado anterior si es necesario.
- **Eliminar tareas**: Los usuarios pueden eliminar una tarea existente.

#### Arquitectura de Microservicios:

- **División de funcionalidades**: La funcionalidad de gestión de tareas está dividida en microservicios independientes, cada uno manejando una parte específica de la lógica de negocio.
- **Comunicación entre microservicios**: Cada microservicio es independiente y se comunica con los otros a través de una interfaz bien definida (por ejemplo, API RESTful o mensajería asincrónica).
- **Patrones de diseño**: Se consideran patrones de diseño como Event Sourcing o CQRS para la gestión de eventos y la separación de comandos y consultas.

#### Escalabilidad y Tolerancia a Fallos:

- **Escalabilidad horizontal**: Los microservicios están diseñados para ser escalables horizontalmente y manejar grandes volúmenes de solicitudes de manera eficiente.
- **Tolerancia a fallos y recuperación**: Se implementan estrategias de tolerancia a fallos y recuperación para garantizar la disponibilidad y fiabilidad del sistema.

## Instalación y Configuración

### Requisitos Previos

- Node.js
- npm

### Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/microtask-manager.git
   cd microtask-manager
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno en el archivo .env

## Ejemplo de configuración

```bash
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
```

## Ejecución del Proyecto

Para iniciar el servidor en modo desarrollo, ejecuta:

```bash
npm run start:dev
```

Para iniciar el servidor en modo producción, ejecuta:

```bash
npm run start:prod
```

## Estructura del Proyecto

src/
├── auth/
| ├── auth.controller.ts
│ ├── auth.module.ts
│ ├── auth.service.ts
│ ├── DTOs/
│ │ ├── login.dto.ts
│ ├── jwt-auth.guard.ts
│ ├── jwt.strategy.ts
│ ├── roles.decorator.ts
│ ├── roles.guard.ts
│ └── self.guard.ts
├── tasks/
│ ├── tasks.controller.ts
│ ├── tasks.module.ts
│ ├── tasks.service.ts
│ ├── entities/
│ │ ├── task.entity.ts
│ ├── DTOs/
│ │ ├── create-task.dto.ts
│ │ ├── update-task.dto.ts
├── users/
│ ├── users.controller.ts
│ ├── users.module.ts
│ ├── users.service.ts
│ ├── entities/
│ │ ├── user.entity.ts
│ ├── DTOs/
│ │ ├── create-user.dto.ts
│ │ ├── update-user.dto.ts
│ │ ├── user-response.dto.ts
├── main.ts
├── app.module.ts

## Uso de la API

### Autenticación

- Login: POST /auth/login

  Request Body:

  ```bash
  {
  "email": "john.doe@example.com",
  "password": "password123"
  }
  ```

* Response:

  ```bash
  {
  "access_token": "your_jwt_token"
  }
  ```

### Gestión de Usuarios

- Crear Usuario: POST /users
- Obtener Todos los Usuarios: GET /users
- Obtener Usuario por ID: GET /users/:id
- Actualizar Usuario: PUT /users/:id
- Eliminar Usuario: DELETE /users/:id
- Gestión de Tareas
- Crear Tarea: POST /tasks/:userId
- Obtener Todas las Tareas: GET /tasks
- Obtener Tarea por ID: GET /tasks/:id
- Obtener Tareas de un Usuario: GET /tasks/user/:userId
- Actualizar Tarea: PUT /tasks/:id
- Actualizar Tarea de un Usuario: PUT /tasks/user/:userId/:id
- Eliminar Tarea: DELETE /tasks/:id
- Eliminar Tarea de un Usuario: DELETE /tasks/user/:userId/:id

## Documentación de Swagger

La documentación de la API generada por Swagger está disponible en:

```bash
 http://localhost:3000/api
```

## Contribución

Actualmente, no hay una guía específica para contribuir al proyecto. Sin embargo, se agradecen las contribuciones y sugerencias.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT.

### Este proyecto fue realizado como prueba técnica para el puesto de Desarrollador BackEnd en Inlaze. Agradezco la oportunidad de participar y espero que este proyecto cumpla con las expectativas.

### Autor: Nestor Felipe Cabana Barrera
