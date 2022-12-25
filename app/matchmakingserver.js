const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger/swagger-output.json')
const routes = require('./routes/api-routes');
const bodyParser = require('body-parser');
const express = require('express');
const port = 3002;
const app = express();
const log = require('./utils/logger');
const path = require('path');

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

// Start express server
const server = app.listen(port, (error) => {
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