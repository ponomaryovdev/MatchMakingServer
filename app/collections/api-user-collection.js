const User = require('../models/user');
const { v4: uuidv4 } = require('uuid'); 
const utils = require('../utils/utils');
const log = require('../utils/logger');

const users = []

const addUser = function(username)
{
    var user = new User();
    user.username = username;
    user.useruid = uuidv4();
    users.push(user);
}

const removeUser = function(username)
{
    users.splice(utils.findUserIndexByName(username, users), 1);
}

const getUserByName = function(username)
{
    return users[utils.findUserIndexByName(username, users)];
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