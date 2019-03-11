//swagger.js

const swaggerUi = require('swagger-ui-express');

const swaggerJSDoc = require('swagger-jsdoc');

const options = {
     definition: {
       swagger: '2.0', // Specification (optional, defaults to swagger: '2.0')
       info: {
         title: 'Orders API', // Title (required)
         version: '1.0.0', // Version (required)
       },
       host: 'localhost:9090',
       basePath: '/api',
     },
     // Path to the API docs
     explorer: true,
     apis: ['routes.js'],
   };

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;