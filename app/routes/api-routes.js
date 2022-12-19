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
  joinUserToRoom,
  leaveUserFromRoom,
  getUsers
} = require('../controllers/api-user-controller');

router.post('/api/v1/login', loginUser);
router.post('/api/v1/logout', logoutUser);
router.post('/api/v1/newroom/', createRoom);
router.post('/api/v1/removeroom/', removeRoom);
router.post('/api/v1/join/', joinUserToRoom);
router.post('/api/v1/leave/', leaveUserFromRoom);

router.get('/api/v1/rooms', getRooms);
router.get('/api/v1/users', getUsers);

module.exports = router;