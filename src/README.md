# BackEnd-III-Entrega Final

## Docente: Samuel Tocaimaza

### acceso rutas desde la base de datos(carga a la base de datos)
### POST
### localhost:8080/api/users

### localhost:8080/api/pets
#### GET , idem devuelve lo cargado

#### acceso rutas desde el navegador, carga 100 y 50 
### localhost:8080/api/mocks/mockingpets

### localhost:8080/api/mocks/mockingusers

# enlace de la app dockerhub: 
## https://hub.docker.com/repository/docker/ignaciolopezbarg/adoptme/general

# enlaces a railway:

## Produccion: https://entregafinalbendiii-production.up.railway.app/
## Desarrollo: https://entregafinalbendiii-dev.up.railway.app/
## QA: https://entregafinalbendiii-qa.up.railway.app/

## Rutas acceso a documentacion de la app con Swagger:
### http://localhost:8080/apidocs/

## Se agregan las variables de entorno solo para correccion del proyecto

### PORT = 8080

### MONGO_URL=mongodb+srv://nacho:holanacho@cluster0.g6mfb4u.mongodb.net/adoptme?retryWrites=true&w=majority&appName=Cluster0

### las distintas BD son para entorno dev: Dev, para qa: QA, con el mismo cluster, y para produccion: adoptme.

### JWT_SECRET= nuevaclaveultrasecreta