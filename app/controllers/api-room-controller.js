const log = require('../utils/logger');
const Room = require('../models/room');
const User = require('../models/user');
const roomCollection = require('../collections/api-room-collection');
const userCollection = require('../collections/api-user-collection');

const getRooms = (req, res) =>{
 /* #swagger.description = 'Get all rooms'
    #swagger.responses[200] = {
     description: 'Array of all rooms',
     schema: { $ref: '#/definitions/Room' }
 } */
    res.json(roomCollection.getAllRooms());
}

const createRoom = (req, res) =>{
    roomCollection.createNewRoom(req, res);
}

const removeRoom = (req, res) =>{
    roomCollection.removeRoomByName(req.body.roomname);
    res.status(200).send(`Room "${req.body.roomname}" has been deleted`);
}

const getAllParticipantsInRoom = (req, res) =>{
}

const addUserToRoom = (req, res) =>{
    let room = new Room(roomCollection.getRoomByName(req.body.roomname));
    let user = new User(userCollection.getUserByName(req.body.username));
    room.addParticipant(user);
    log.room('[Status]', `Client "${req.body.username}" joint to room "${req.body.roomname}"`);
    res.status(200).send(`You are joined to room "${req.body.roomname}"`);
}

const removeUserFromRoom = (req, res) =>{
    let room = new Room(roomCollection.getRoomByName(req.body.roomname));
    let user = new User(userCollection.getUserByName(req.body.username));
    room.removeParticipant(user);
    log.room('[Status]', `Client "${req.body.username}" left from room "${req.body.roomname}"`);
    res.status(200).send(`You are left the room "${req.body.roomname}"`);

    // if(Object.keys(room.getAllParticipant()).length === 0)
    // {
    //     roomCollection.removeRoomByName(this.roomname);
    // }
}

module.exports = {
    getRooms,
    createRoom,
    removeRoom,
    addUserToRoom,
    removeUserFromRoom,
};