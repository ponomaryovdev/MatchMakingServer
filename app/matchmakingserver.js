const routes = require('./routes/api-routes');
const bodyParser = require('body-parser');
const express = require('express');
const port = 3002;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, }));

//run services
app.use(routes);

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    })     
  })

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
    console.log(`Matchmaking server was started!`);
    console.log(`Server listening on port ${server.address().port}`);
});