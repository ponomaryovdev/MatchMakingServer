const Room = require('../models/room');
const utils = require('../utils/utils');
const { v4: uuidv4 } = require('uuid');
const log = require('../utils/logger');
const session = require('../controllers/api-session-controller');
const request = require('request')

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
    newRoom.serverAddress = '158.160.22.223';
    //newRoom.serverAddress = utils.getlocalIP();
    request.post(
        {
          url: 'http://158.160.22.223:3010/api/v1/join',
          headers: { 
            'authorization': 'mirotalksfu_default_secret',
            'Content-Type': 'application/json'
          },
          form: {
            room: roomName,
            name: 'username',
            audio: '1',
            video: '0',
            screen: '0',
            notify: '1',
          },
        },
        (err, response, body) => {
            var obj = JSON.parse(response.body);
            newRoom.webrtcAddress = obj.join;
        }
      );

    newRoom.port = roomPort;
    newRoom.processpid = session.runNewSessionInstance(roomPort);
    newRoom.password = req.body.password;

    rooms.push(newRoom);

    log.server('[Status]', `Room "${roomName}" has been created`);
    let json = JSON.stringify(newRoom, null, '\t');
    res.status(200).send(json);
}

const getRoomByName = function(roomName)
{
    return rooms[utils.findRoomIndexByName(roomName, rooms)];
}

const removeRoomByName = function(removedRoom)
{
    let roomindex = utils.findRoomIndexByName(removedRoom, rooms);
    session.endSessionInstance(rooms[roomindex].processpid);
    log.server('[Status]', `Room "${removedRoom}" has been deleted`);
    rooms.splice(roomindex, 1);
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
    var port = Math.floor(Math.random() * (8000 - 7777) + 7777);
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