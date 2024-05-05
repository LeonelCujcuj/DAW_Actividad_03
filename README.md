# DAW_Actividad_03

# Nombre de la Aplicación: myapp

## Descripción

Esta aplicación cuenta con un backend que proporciona funcionalidades para administrar tareas y metas. Utiliza una serie de endpoints RESTful para permitir la obtención, eliminación y adición de tareas y metas.

## Características

- **Obtención de Tareas y Metas**
  - `GET /getTasks`: Obtiene todas las tareas.
  - `GET /getGoals`: Obtiene todas las metas.

- **Eliminación de Tareas y Metas**
  - `DELETE /removeTask`: Elimina una tarea existente.
  - `DELETE /removeGoal`: Elimina una meta existente.

- **Adición de Tareas y Metas**
  - `POST /addTask`: Agrega una nueva tarea.
  - `POST /addGoal`: Agrega una nueva meta.

## Middleware de Autorización

El backend de esta aplicación está protegido por un middleware de autorización que garantiza que las solicitudes sean válidas solo si incluyen un parámetro de Authorization en el encabezado. Este parámetro Authorization debe contener una apikey generada por el estudiante, lo que garantiza un acceso seguro y controlado a los recursos del backend.

## Instalación y Uso

1. Clona el repositorio de la aplicación.
2. Instala las dependencias necesarias.
3. Crea una apikey como parámetro de Authorization.
4. Ejecuta el backend de la aplicación.
5. Accede a los diferentes endpoints utilizando las rutas mencionadas anteriormente y la apikey en el encabezado de Authorization.

## Contribución

Si deseas contribuir a esta aplicación, por favor sigue estos pasos:

1. Realiza un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-caracteristica`).
3. Realiza tus cambios y confirma (`git commit -am 'Añade nueva característica'`).
4. Sube tu rama (`git push origin feature/nueva-caracteristica`).
5. Crea una solicitud de extracción en GitHub.
