const swaggerAutogen = require('swagger-autogen')()


const doc = {
    info: {
      title: 'Matchmaking API',
      description: 'Matchmakin API for control matchmaking service'
    },
    definitions: {
      Room: {
        roomuid: 'fde329b8-d471-4233-b4c4-2b79e95b21bd',
        name: 'room',
        serverAddress: '192.168.0.1',
        webrtcAddress: 'http://51.250.25.185:3010/api/v1/join',
        port: '7777',
        participants: '[]'
    },
      User: {
            useruid: "fde329b8-d471-4233-b4c4-2b79e95b21bd",
            name: "user"
            //$ref: '#/definitions/Room'
        }
    },
    host: 'localhost:3002',
    schemes: ['http']
}

const outputFile = './app/swagger/swagger-output.json'
const endpointsFiles = ['./app/routes/api-routes.js']

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./app/matchmakingserver.js')           // Your project's root file
})