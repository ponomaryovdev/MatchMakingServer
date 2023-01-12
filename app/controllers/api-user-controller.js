const Room = require('../models/room.model');
const userCollection = require('../collections/api-user-collection');
const log = require('../utils/logger');

const loginUser = (req, res) =>{
    if(userCollection.getUserByName(req.body.username))
    {
        res.status(400).send(`Login unsuccessful. User already exists`);
        return;
    }
    userCollection.addUser(req.body.username);
    log.server('[Status]', `Client "${req.body.username}" was login`);
    res.status(200).send(`Login successful`);
}

const logoutUser = (req, res) =>{
    userCollection.removeUser(req.body.username);
    log.server('[Status]', `Client "${req.body.username}" was logout`);
    res.status(200).send(`Logout successful`);
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
    getUsers
};