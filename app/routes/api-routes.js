const express = require("express");
const router = express.Router();

const
{
  getRooms,
  createRoom,
  removeRoom,
} = require('../controllers/api-room-controller');

const
{
  loginUser,
  joinRoom,
  leaveRoom
} = require('../controllers/api-user-controller');

//API POST
router.post('/api/v1/login', loginUser);
router.post('/api/v1/newroom/', createRoom);
router.post('/api/v1/removeroom/', removeRoom);
router.post('/api/v1/join/', joinRoom);
router.post('/api/v1/leaveroom/', leaveRoom);


//API GET
router.get('/api/v1/rooms', getRooms);
router.post('/api/v1/docs', loginUser);


module.exports = router;