const User = require('../models/user');
const Room = require('../models/room');
const roomCollection = require('../collections/api-room-collection');
const userCollection = require('../collections/api-user-collection');
const log = require('../utils/logger');

const loginUser = (req, res) =>{
    userCollection.addUser(req.body.username);
    log.server('[Status]', `Client "${req.body.username}" was login`);
    res.status(200).send(`Login successful`);
}

const logoutUser = (req, res) =>{
    userCollection.removeUser(req.body.username);
    log.server('[Status]', `Client "${req.body.username}" was logout`);
    res.status(200).send(`Logout successful`);
}

const joinUserToRoom = (req, res) =>{
    var room = new Room(roomCollection.getRoomByName(req.body.roomname));
    var user = new User(userCollection.getUserByName(req.body.username));
    room.addParticipant(user);
    log.room('[Status]', `Client "${req.body.username}" joint to room "${req.body.roomname}"`);
    res.status(200).send(`You are joined to room "${req.body.roomname}"`);
}

const leaveUserFromRoom = (req, res) =>{
    var room = new Room(roomCollection.getRoomByName(req.body.roomname));
    var user = new User(userCollection.getUserByName(req.body.username));
    room.removeParticipant(user);
    log.room('[Status]', `${req.body.username} left the room "${req.body.roomname}"`);
    res.status(200).send(`You have left the room "${req.body.roomname}"`);
}

const getUsers = (req, res) =>
{
    /* #swagger.description = 'Get all users'
    #swagger.responses[200] = {
     description: 'Array of all users',
     schema: { $ref: '#/definitions/User' }
    } */
    res.status(200).json(userCollection.getAllUsers());
}

module.exports = {
    loginUser,
    logoutUser,
    joinUserToRoom,
    leaveUserFromRoom,
    getUsers
};