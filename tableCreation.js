const createTable = (dynamodb) => {
    let params = {
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

    dynamodb.createTable(params, (err, data) => {
        if (err) console.log(err)
        else console.log(data)
    });
}

const createIndex = (dynamodb) => {
    let params = {
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
    dynamodb.updateTable(params, (err, data) => {
        if (err) console.log(err)
        else console.log(data)
    })
}

module.exports = {
    createTable,
    createIndex
}