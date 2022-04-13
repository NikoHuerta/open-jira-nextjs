# NextJS Open Jira App
Para correr localmente, se necesita la base de datos
```
docker-compose up -d
```
* -d  __detached__

* MongoDB URL Local:
```
mongodb://localhost:27017/entriesdb
```
## Configurar las variables de entorno
Renombrar el archivo __.env.example__ a __.env__
## Llenar la base de datos con informacion de pruebas
Llamar a
```
localhost:3000/api/seed
```