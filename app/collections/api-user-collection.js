const User = require('../models/user');
const { v4: uuidv4 } = require('uuid'); 
const utils = require('../utils/utils');

const users = []

const addUser = function(username)
{
    var user = new User();
    user.init(uuidv4(), username);
    users.push(user);
}

const removeUser = function(username)
{
    users.splice(utils.findIndexByName(username, users), 1);
}

const getUserByName = function(username)
{
    let user = users[utils.findIndexByName(username, users)];
    return users[utils.findIndexByName(username, users)];
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