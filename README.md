# Backend ADMIN AVE version: 0.1.0

# Admin AVE
## Instalacion
Para poder correr de manera local en su maquina, debe tener instalado [Node.js](https://nodejs.org/es/) y [MongoDB](https://www.mongodb.com/es) en su maquina. En caso de no tener mongoDB instalado, puede crear un cluster [aqui](https://cloud.mongodb.com) y enlazar el mongoDB de su cluster con el proyecto.

### Instalacion de dependencias
Para instalar las dependencias, debe ejecutar el siguiente comando en la raiz del proyecto:
```bash
npm install
```

### Correr el proyecto
Para correr el proyecto, debe ejecutar el siguiente comando en la raiz del proyecto:
```bash
npm start
```

### Correr el proyecto en modo desarrollo
Para correr el proyecto en modo desarrollo, debe ejecutar el siguiente comando en la raiz del proyecto:
```bash
npm run dev
```

### Endpoints
Para la mayoria de los endpoints que requieran autenticacion, se debe enviar el token en los headers de la siguiente manera:
```json
{
  "Authorization": "Bearer <token>"
}
```
#### Token
##### Generar token
Para poder obtener el token deberan ingresar su usuario y contraceña a la siguiente ruta:
```bash
POST /admin/login
```
La cual le devolvera un token que tiene una expiracion entre 1 hora y 3 dias. Este token debe ser enviado en los headers de los siguientes endpoints para poder acceder a ellos.
#### Usuarios Admin
##### Loguear con un usuario
```bash
POST /admin/login
```
Body:
```json
{
    "email": ""
    "password": ""
}
```
Este enpoint devuelve un token que debe ser enviado en los headers de los siguientes endpoints para poder acceder a ellos.


