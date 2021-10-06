# :cloud: Computación en la nube: Trabajo Práctico 3

## :bust_in_silhouette: Datos personales

- Nombre: **Miguel Del Corso**
- Legajo: **44052**

## :crystal_ball: Instalación

### Correr proyecto

```bash
npm i
docker container rm dynamodb
docker network create awslocal
docker run --rm -p 8000:8000 --network awslocal --name dynamodb amazon/dynamodb-local -jar DynamoDBLocal.jar -sharedDb
sam local start-api --docker-network awslocal
```

### Crear tablas e indices
Abrir `http://localhost:8000/shell/` y copiar el contenido de tableCreation.js

## :pushpin: [EndPoints](requests.http)

### :package: Crear un envío

> El usuario desea crear un envio, especificando el destino y el email

```http request
POST http://localhost:3000/envios
Content-Type: application/json

{
  "destino": "MDZ",
  "email": "migueldelcorso@gmail.com"
}
```

#### Respuesta

```json
{
  "id": "kdfxq6h5",
  "fechaAlta": "2021-10-03T03:39:13.888Z",
  "destino": "MDZ",
  "email": "migueldelcorso@gmail.com",
  "pendiente": "2021-10-03T03:39:13.888Z"
}
```

### :mailbox_closed: Obtener envíos pendientes

> El usuario desea obtener los envios que se encuentran pendientes, en caso de necesitar mas informacion sobre un envio particular puede utilizar el endPoint de obtener envio

```http request
GET http://localhost:3000/envios/pendientes
```

#### Respuesta

```json
{
  "Items": [
    {
      "pendiente": "2021-10-03T03:40:33.712Z",
      "id": "ifv9r112"
    },
    {
      "pendiente": "2021-10-03T03:39:13.888Z",
      "id": "kdfxq6h5"
    },
    {
      "pendiente": "2021-10-03T03:40:50.464Z",
      "id": "qkto2y1c"
    }
  ],
  "Count": 3,
  "ScannedCount": 3
}
```

### :incoming_envelope: Entregar un pedido

> El usuario desea eliminar el atributo pendiente de un envio en particular, entregado de esta forma el pedido

```http request
PUT http://localhost:3000/envios/kdfxq6h5/entregado
```

#### Respuesta

```text
El envío con el id kdfxq6h5 fue entregado correctamente
```

### :email: Obtener un envío en particular

> El usuario desea obtener mas informacion acerca de un envio en particular, se encuentre pendiente o no

```http request
GET http://localhost:3000/envio/kdfxq6h5
```

#### Respuesta

```json
{
  "Item": {
    "destino": "MDZ",
    "id": "kdfxq6h5",
    "fechaAlta": "2021-10-03T03:39:13.888Z",
    "email": "migueldelcorso@gmail.com"
  }
}
```
