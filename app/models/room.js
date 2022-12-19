const utils = require('../utils/utils');
const User = require('./user');

module.exports = class Room
{
    roomuid = "default"
    roomname = 'default'
    serverAddress = 'default';
    webrtcAddress = 'default';
    port = '7777';
    participants = [];

    constructor(obj){
        obj && Object.assign(this, obj);
    }

    addParticipant = function(participant)
    {
        this.participants.push(participant);
    }
    
    removeParticipant = function(participant)
    {
        this.participants.splice(utils.findIndexByName(participant, this.participants), 1);
    }
    
    getAllParticipant = function()
    {
        return participants;
    }
}