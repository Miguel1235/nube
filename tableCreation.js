const createTable = async (dynamodb) => {
    const params = {
        TableName: 'Envio',
        KeySchema: [
            {
                AttributeName: 'id',
                KeyType: 'HASH',
            }
        ],
        AttributeDefinitions: [
            {
                AttributeName: 'id',
                AttributeType: 'S',
            }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
        }
    };

    try{
        return await dynamodb.createTable(params).promise()
    }
    catch (error) {
        console.log(error)
    }
}

const createIndex = async (dynamodb) => {
    const params = {
        TableName: 'Envio',
        AttributeDefinitions: [
            {
                AttributeName: 'id',
                AttributeType: 'S'
            },
            {
                AttributeName: 'pendiente',
                AttributeType: 'S'
            }],
        GlobalSecondaryIndexUpdates: [{
            Create: {
                IndexName: 'EnviosPendientesIndex',
                KeySchema: [
                    {
                        'AttributeName': 'id',
                        'KeyType': 'HASH'
                    },
                    {
                        'AttributeName': 'pendiente',
                        'KeyType': 'RANGE'
                    }
                ],
                Projection: {
                    ProjectionType: 'INCLUDE',
                    NonKeyAttributes: ['pendiente']
                },
                ProvisionedThroughput: {
                    ReadCapacityUnits: 1,
                    WriteCapacityUnits: 1,
                },
            },
        },
        ],
    };

    try{
        return await dynamodb.updateTable(params).promise()
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = {
    createTable,
    createIndex
}