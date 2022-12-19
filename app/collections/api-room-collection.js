const Room = require('../models/room');
const utils = require('../utils/utils');
const { v4: uuidv4 } = require('uuid');
const log = require('../utils/logger');

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
    newRoom.roomuid = uuidv4();
    newRoom.roomname = roomName;
    //newRoom.serverAddress = utils.getlocalIP();
    newRoom.webrtcAddress = 'http://51.250.25.185:3010/api/v1/join';
    newRoom.port = roomPort;
    
    rooms.push(newRoom);

    // parameters = [`-log -port ${roomPort}`];

    // child(executablePath, parameters, function(err, data) {
    //     console.log(err)
    //     console.log(data.toString());
    // });

    log.room('[Status]', `Room "${roomName}" has been created`);
    let json = JSON.stringify(newRoom, null, '\t');
    res.status(200).send(json);
}

const getRoomByName = function(roomName)
{
    return rooms[utils.findIndexByName(roomName, rooms)];
}

const removeRoomByName = function(removedRoom)
{
    log.room('[Status]', `Room "${removedRoom}" has been deleted`);
    rooms.splice(utils.findIndexByName(removedRoom, rooms), 1);
}

var verifyRoomName = (req) =>{
    var rooms = getAllRooms();
    for (let index = 0; index < rooms.length; index++) {
        if(rooms[index].roomname == req.body.roomname)
        {
            return 0;
        }
    }
    return req.body.roomname;
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
    verifyRoomName,
    getRoomByName
};