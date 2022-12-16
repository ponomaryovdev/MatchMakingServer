let Room = class
{
    roomUid = "default"
    name = 'default'
    serverAddress = 'default';
    webrtcAddress = 'default';
    port = '7777';
    participants = [];

    constructor()
    {

    }

    addParticipant = function(participant)
    {
        participant.push(participant);

    }

    removeParticipant = function()
    {
        let room = new Room(rooms);
        for (let index = 0; index < room.length; index++) {
            if(room[index].roomName = roomNameToJoin)
            {
                room[index].participant.push(participant);
            }
        }
    }

    getAllParticipant = function()
    {
        return participants;
    }
}

module.exports = Room;