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
    console.log(`Client ${req.body.username} was logout`);
    res.status(200).send(`Client ${req.body.username} was logout`);
}

const joinRoom = (req, res) =>{
    
}

const leaveRoom = (req, res) =>{
}

const getUsers = (req, res) =>
{
    res.status(200).json(userCollection.getAllUsers());
}

module.exports = {
    loginUser,
    logoutUser,
    joinRoom,
    leaveRoom,
    getUsers
};