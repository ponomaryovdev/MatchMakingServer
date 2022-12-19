const log = require('../utils/logger');

const
{
    getAllRooms,
    removeRoomByName,
    verifyRoomName,
    getAvaliblePort,
    createNewRoom,
} = require('../collections/api-room-collection');


const handleError = (res, error) => {
    res.status(500).send(error.message);
}

const getRooms = (req, res) =>{
 /* #swagger.description = 'Get all rooms'
    #swagger.responses[200] = {
     description: 'Array of all rooms',
     schema: { $ref: '#/definitions/Room' }
 } */
    res.json(getAllRooms());
}

const createRoom = (req, res) =>{
    createNewRoom(req, res);
}

const removeRoom = (req, res) =>{
    removeRoomByName(req.body.roomname);
    res.status(200).send(`Room "${req.body.name}" has been deleted`);
}

module.exports = {
    getRooms,
    createRoom,
    removeRoom,
};