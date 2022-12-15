const room = require('../models/user');

class Room
{
    _roomUid = "default"
    _name = 'default'
    _serverAddress = 'default';
    _webrtcAddress = 'default';
    _participants = [];

    constructor(roomUid, name, serverAddress, webrtcAddress)
    {
        this._roomUid = roomUid;
        this._name = name;
        this._serverAddress = serverAddress;
        this._webrtcAddress = webrtcAddress;
    }
}