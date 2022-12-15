const room = require('../models/room');
const { v4: uuidv4 } = require('uuid'); 
const utils = require('../utils/utils');

var child = require('child_process').execFile;
var executablePath = "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";
var parameters = ["-log -port 1234"];

const rooms = []

const handleError = (res, error) => {
    res.status(500).send(error.message);
}

const getRooms = (req, res) =>{
    res.json(rooms);
}

const createRoom = (req, res) =>{
    var roomPort = getAvaliblePort();
    var roomName = verifyRoomName(req);

    if(roomName == 0)
    {
        res.status(405).send("A room with that name already exists");
        return;
    }

    if(roomPort == 0){
        res.status(404).send("No port available. Room has not been created");
        return;
    }
    
    var roomParams = {
        id: uuidv4(),
        name: roomName,
        gameServerIP: utils.getlocalIP(),
        port: roomPort
    };

    rooms.push(roomParams);

    // parameters = [`-log -port ${roomPort}`];

    // child(executablePath, parameters, function(err, data) {
    //     console.log(err)
    //     console.log(data.toString());
    // });

    console.log("Room was created");
    res.status(200).json(roomParams);
}


var verifyRoomName = function(req){
    for (let index = 0; index < rooms.length; index++) {
        if(rooms[index].name == req.body.name)
        {
            return 0;
        }
    }
    return req.body.name;
}

var getAvaliblePort = function()  {
    var port = Math.floor(Math.random() * (9009 - 9000) + 9000);
    for (let index = 0; index < rooms.length; index++) {
        if(rooms[index].port == port)
        {
            if(index == 8)
            {
                return 0;
            }
            return getAvaliblePort();
        }
    }
    
    return port;
}

const removeRoom = (req, res) =>{
    roomNameForRemove = req.body.name;
    var deletedRoom = rooms.splice(utils.findRoomByName(roomNameForRemove), 1);
    console.log(deletedRoom.name);
    // res.status(200).send(`Room ${deletedRoom.name} has been deleted `);
}

module.exports = {
    getRooms,
    createRoom,
    removeRoom
};