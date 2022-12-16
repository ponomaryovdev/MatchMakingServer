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
  logoutUser,
  joinRoom,
  leaveRoom,
  getUsers
} = require('../controllers/api-user-controller');

//API POST
router.post('/api/v1/login', loginUser);
router.post('/api/v1/logout', logoutUser);
router.post('/api/v1/newroom/', createRoom);
router.post('/api/v1/removeroom/', removeRoom);
router.post('/api/v1/join/', joinRoom);
router.post('/api/v1/leaveroom/', leaveRoom);


//API GET
router.get('/api/v1/rooms', getRooms);
router.get('/api/v1/users', getUsers);
router.post('/api/v1/docs', loginUser);


module.exports = router;