<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" />
</p>

# Client Gateway

Un gateway puede verse como otro microservicio el cual no es más que una puerta o punto de entrada hacia nuestros microservicios. Nuestros clientes se comunican con el gateway mediante API Rest tradicional y nuestro gateway es el que se encarga de ir a hablar con los microservicios usando cualquier método que ellos necesiten para comunicarse como puede ser TCP, REST, colas de mensajes, etc.

## Dev

1. Clonar el repositorio
2. Instalar las dependencias
3. Crear un archivo `.env` basado en el `.env.template`
4. ejecutar `npm run start:dev`
