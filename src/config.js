const convict = require('convict');

var config = convict ({
    env: {
        doc: "the runtime environment",
        format: ["production", "staging", "development"],
        default: "development",
        env: "NODE_ENV"
    },
    
    server: {
        port: {
            doc: "node server port number",
            format: "port",
            default: 9191,
            env: "PORT",
            arg: "port"
        },
        hostName: {
            doc: "server hostname",
            format: "*",
            default: "localhost"
        }
    },

    db: {
        connectionString: {
            doc: "database connection string",
            format: "*",
            default: "mongodb://localhost/carts"
        }

    },

    order: {
        url: {
            doc: "order URL",
            format: "*"            
        }        
    }
});

var env = config.get('env');
config.loadFile('config/' + env + '.json');

config.validate({allowed: 'strict'});
module.exports = config;