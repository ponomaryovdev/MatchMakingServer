const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger/swagger-output.json')
const routes = require('./routes/api-routes');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const log = require('./utils/logger');
const path = require('path');
const cors = require("cors");
const dbConfig = require("./config/db.config");
const { exec } = require('child_process');

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, }));
app.use(routes);

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    })     
  })

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

const db = require("./models");
const Role = db.role;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

// Start express server
const server = app.listen(3002, (error) => {
    if (error) return console.log(`Error: ${error}`);
 
    console.log(
        `%c
        ███╗   ███╗ █████╗ ████████╗ ██████╗██╗  ██╗███╗   ███╗ █████╗ ██╗  ██╗██╗███╗   ██╗ ██████╗  
        ████╗ ████║██╔══██╗╚══██╔══╝██╔════╝██║  ██║████╗ ████║██╔══██╗██║ ██╔╝██║████╗  ██║██╔════╝  
        ██╔████╔██║███████║   ██║   ██║     ███████║██╔████╔██║███████║█████╔╝ ██║██╔██╗ ██║██║  ███╗ 
        ██║╚██╔╝██║██╔══██║   ██║   ██║     ██╔══██║██║╚██╔╝██║██╔══██║██╔═██╗ ██║██║╚██╗██║██║   ██║ 
        ██║ ╚═╝ ██║██║  ██║   ██║   ╚██████╗██║  ██║██║ ╚═╝ ██║██║  ██║██║  ██╗██║██║ ╚████║╚██████╔╝ 
        ╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝  
                                                                                                      
        ███████╗███████╗██████╗ ██╗   ██╗███████╗██████╗     ██╗   ██╗     ██╗    ██████╗     ██████╗ 
        ██╔════╝██╔════╝██╔══██╗██║   ██║██╔════╝██╔══██╗    ██║   ██║    ███║   ██╔═████╗   ██╔═████╗
        ███████╗█████╗  ██████╔╝██║   ██║█████╗  ██████╔╝    ██║   ██║    ╚██║   ██║██╔██║   ██║██╔██║
        ╚════██║██╔══╝  ██╔══██╗╚██╗ ██╔╝██╔══╝  ██╔══██╗    ╚██╗ ██╔╝     ██║   ████╔╝██║   ████╔╝██║
        ███████║███████╗██║  ██║ ╚████╔╝ ███████╗██║  ██║     ╚████╔╝      ██║██╗╚██████╔╝██╗╚██████╔╝
        ╚══════╝╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝      ╚═══╝       ╚═╝╚═╝ ╚═════╝ ╚═╝ ╚═════╝ 
	`,
        'font-family:monospace',
    );
    log.server('[Status]', `Server listening on port ${server.address().port}`);
});