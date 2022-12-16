const User = require('../models/user');
const { v4: uuidv4 } = require('uuid'); 
const utils = require('../utils/utils');

const users = []

const addUser = function(username)
{
    users.push(new User(uuidv4(), username));
}

const removeUser = (req, res) =>
{
    users.splice(utils.findIndexByName(removedRoom, users), 1);
}

const getUserByName = function(username)
{
    return new User(users[utils.findIndexByName(username, users)]);
}

const getAllUsers = function()
{
    return users;
}


module.exports = {
    addUser,
    removeUser,
    getUserByName,
    getAllUsers
};