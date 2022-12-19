const User = require('../models/user');
const Room = require('../models/room');
const roomCollection = require('../collections/api-room-collection');
const userCollection = require('../collections/api-user-collection');



const loginUser = (req, res) =>{
    userCollection.addUser(req.body.username);
    console.log(`Client ${req.body.username} was login`);
    res.status(200).send(`Client ${req.body.username} was login`);
}

const logoutUser = (req, res) =>{
    userCollection.removeUser(req.body.username);
    console.log(`${req.body.username} was logout`);
    res.status(200).send(`${req.body.username} was logout`);
}

const joinUserToRoom = (req, res) =>{
    var room = new Room(roomCollection.getRoomByName(req.body.roomname));
    var user = new User(userCollection.getUserByName(req.body.username));
    room.addParticipant(user);
    console.log(`${req.body.username} joint to ${req.body.roomname}`);
    res.status(200).send(`${req.body.username} joint to ${req.body.roomname}`);
}

const leaveUserFromRoom = (req, res) =>{
    var room = new Room(roomCollection.getRoomByName(req.body.roomname));
    var user = new User(userCollection.getUserByName(req.body.username));
    room.removeParticipant(user);
    console.log(`${req.body.username} leave from ${req.body.roomname}`);
    res.status(200).send(`${req.body.username} leave from ${req.body.roomname}`);
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