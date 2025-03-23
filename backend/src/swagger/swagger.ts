import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Pago Plux',
            version: '1.0.0',
            description: 'API for payment management (with payment button) and transaction query',
            contact: {
                name: 'William Zapata',
            },
            servers: [
                {
                    url: 'http://localhost:3001',
                    description: 'Local server',
                }
            ]
        }
    },
    apis: ['./src/swagger/*.yml']
};

const specs = swaggerJsdoc(options);
export default specs;