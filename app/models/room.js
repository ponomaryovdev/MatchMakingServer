const utils = require('../utils/utils');

module.exports = class Room
{
    roomuid = "default"
    roomname = 'default'
    serverAddress = 'default';
    webrtcAddress = 'default';
    port = '7777';
    participants = [];
    processpid = 0;
    password = "";

    constructor(obj){
        obj && Object.assign(this, obj);
    }

    addParticipant = function(participant)
    {
        this.participants.push(participant);
    }
    
    removeParticipant = function(participant)
    {
        this.participants.splice(utils.findUserIndexByName(participant, this.participants), 1);
    }
    
    getAllParticipant = function()
    {
        return this.participants;
    }
}