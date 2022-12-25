const express = require("express");
const router = express.Router();

const
{
  getRooms,
  createRoom,
  removeRoom,
  addUserToRoom,
  removeUserFromRoom
} = require('../controllers/api-room-controller');

const
{
  loginUser,
  logoutUser,
  getUsers
} = require('../controllers/api-user-controller');

router.post('/api/v1/login', loginUser);
router.post('/api/v1/logout', logoutUser);
router.post('/api/v1/newroom/', createRoom);
router.post('/api/v1/removeroom/', removeRoom);
router.post('/api/v1/join/', addUserToRoom);
router.post('/api/v1/leave/', removeUserFromRoom);

router.get('/api/v1/rooms', getRooms);
router.get('/api/v1/users', getUsers);

module.exports = router;