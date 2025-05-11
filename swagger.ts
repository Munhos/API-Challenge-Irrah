// swagger.ts
import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'API Challenge Irrah',
    description: 'Documentação gerada automaticamente com swagger-autogen.',
  },
  host: 'localhost:3001',
  schemes: ['http'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/index.ts'];
swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);
