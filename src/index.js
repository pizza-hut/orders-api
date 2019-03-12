// FileName: index.js
// Import express
const express = require('express');
// Initialize the app
const app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const config = require('./config.js');

const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swaggerSpecs.js');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.get('/api-docs.json', (req, res) => {
     res.setHeader('Content-Type', 'application/json');
     res.send(swaggerSpecs);
   });

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use(bodyParser.urlencoded({extended:true}));

//mongoose.connect('mongodb://localhost/carts');
mongoose.connect(config.get('db.connectionString'));

var db = mongoose.connection;

//import routes
let apiRoutes = require('./routes.js')

// Orders routes
app.use('/api', apiRoutes);

// Setup server port
//var port = process.env.PORT || 9191;
var port = config.get('server.port')

// Send message for default URL
app.get('/', (req, res) => res.send('Orders API'));

// Launch app to listen to specified port
app.listen(port, function () {
     console.log("running orders api on " + port);
});