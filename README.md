# :cloud: Computación en la nube: Trabajo Práctico 3

## :bust_in_silhouette: Datos personales

- Nombre: **Miguel Del Corso**
- Legajo: **44052**

## :crystal_ball: Instalación

```bash
npm i
docker container rm dynamodb
docker network create awslocal
docker run --rm -p 8000:8000 --network awslocal --name dynamodb amazon/dynamodb-local -jar DynamoDBLocal.jar -sharedDb
sam local start-api --docker-network awslocal
```

## :pushpin: [EndPoints](requests.http)

### :package: Crear un envío

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

```http request
PUT http://localhost:3000/envios/kdfxq6h5/entregado
```

#### Respuesta

```text
El envío con el id kdfxq6h5 fue entregado correctamente
```

### :email: Obtener un envío en particular

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
