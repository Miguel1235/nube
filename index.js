const AWS = require('aws-sdk');
const createId = require('hash-generator')
const { createTable, createIndex } = require('./tableCreation')

const handler = async ({ pathParameters, httpMethod, body }) => {

    const dynamodb = new AWS.DynamoDB({
        apiVersion: '2012-08-10',
        endpoint: 'http://dynamodb:8000',
        region: 'us-west-2',
        credentials: {
            accessKeyId: '2345',
            secretAccessKey: '2345'
        }
    });
    const docClient = new AWS.DynamoDB.DocumentClient({
        apiVersion: '2012-08-10',
        service: dynamodb
    });

    const { TableNames: tablas } = await dynamodb.listTables().promise()
    if (!tablas.includes('Envio')) {
        createTable(dynamodb)
        createIndex(dynamodb)
    }

    switch (httpMethod) {
        case 'GET':
            const findParams = {
                TableName: 'Envio',
                IndexName: "EnviosPendientesIndex"
            };

            try {
                const envios = await docClient.scan(findParams).promise()
                return { body: JSON.stringify(envios) }
            } catch {
                return { statusCode: 500, headers: { "content-type": "text/plain" }, body: 'No se pudo obtener los envíos' };
            }

        case 'POST':
            const createParams = {
                TableName: 'Envio',
                Item: {
                    id: createId(8),
                    fechaAlta: new Date().toISOString(),
                    ...JSON.parse(body),
                    pendiente: new Date().toISOString(),
                }
            }

            try {
                await docClient.put(createParams).promise()
                return { body: JSON.stringify(createParams.Item) };
            } catch {
                return { statusCode: 500, headers: { "content-type": "text/plain" }, body: 'No se pudo crear el envío' };
            }

        case 'PUT':
            const idEnvio = (pathParameters || {}).idEnvio || false;

            const updateParams = {
                TableName: 'Envio',
                Key: {
                    id: idEnvio
                },
                UpdateExpression: 'REMOVE pendiente',
                ConditionExpression: 'attribute_exists(pendiente)'
            }

            try {
                await docClient.update(updateParams).promise()
                return { statusCode: 200, headers: { "content-type": "text/plain" }, body: `El envío con el id ${idEnvio} fue entregado correctamente` };
            } catch {
                return { statusCode: 500, headers: { "content-type": "text/plain" }, body: `No se pudo entregar el envío ${idEnvio}` };
            }

        default:
            return { statusCode: 501, headers: { "content-type": "text/plain" }, body: `Método ${httpMethod} no soportado` };
    }
}

exports.handler = handler;