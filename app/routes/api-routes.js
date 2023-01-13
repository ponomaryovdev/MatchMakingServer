const express = require("express");
const router = express.Router();
const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const { authJwt } = require("../middlewares");

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

router.post('/api/v1/newroom/', [authJwt.verifyToken], createRoom);
router.post('/api/v1/removeroom/', [authJwt.verifyToken], removeRoom);
router.post('/api/v1/join/', [authJwt.verifyToken], addUserToRoom);
router.post('/api/v1/leave/', [authJwt.verifyToken], removeUserFromRoom);
router.post('/api/v1/saveAvatar/', [authJwt.verifyToken], controller.saveAvatarID);

router.post(
  "/api/v1/auth/signup",
  [
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted
  ],
  controller.signup
);

router.post("/api/v1/auth/signin", controller.signin);

router.get('/api/v1/rooms', [authJwt.verifyToken], getRooms);
router.get('/api/v1/users', [authJwt.verifyToken], getUsers);

module.exports = router;