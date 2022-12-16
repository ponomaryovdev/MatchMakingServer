const Room = require('../models/room');
const utils = require('../utils/utils');
const { v4: uuidv4 } = require('uuid'); 

var child = require('child_process').execFile;
var executablePath = "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";
var parameters = ["-log -port 7777"];

const rooms = []

const getAllRooms = function()
{
    return rooms;
}

const createNewRoom = (req, res) =>
{
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
    
    var newRoom = new Room();
    newRoom.roomUid = uuidv4();
    newRoom.name = roomName;
    newRoom.serverAddress = utils.getlocalIP();
    newRoom.webrtcAddress = 'http://51.250.25.185:3010/api/v1/join';
    newRoom.port = roomPort;

    rooms.push(newRoom);

    // parameters = [`-log -port ${roomPort}`];

    // child(executablePath, parameters, function(err, data) {
    //     console.log(err)
    //     console.log(data.toString());
    // });

    console.log(`Room ${roomName} has been created`);
    let json = JSON.stringify(newRoom, null, '\t');
    res.status(200).send(json);
}

const removeRoomByName = function(removedRoom)
{
    rooms.splice(utils.findIndexByName(removedRoom, rooms), 1);
}

var verifyRoomName = function(req){
    var rooms = getAllRooms();
    for (let index = 0; index < rooms.length; index++) {
        if(rooms[index].name == req.body.name)
        {
            return 0;
        }
    }
    return req.body.name;
}

var getAvaliblePort = function()  {
    var rooms = getAllRooms();
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

module.exports = {
    createNewRoom,
    getAllRooms,
    removeRoomByName,
    getAvaliblePort,
    verifyRoomName
};