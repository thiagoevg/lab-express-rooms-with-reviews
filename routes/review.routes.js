const router = require('express').Router()

const ReviewModel = require('../models/ReviewModel')
const RoomModel = require('../models/RoomModel')
const UserModel = require('../models/UserModel')
const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");


// Crud (CREATE) - HTTP POST
router.post('/reviews', isAuthenticated, attachCurrentUser, async (req, res)=> {
  try {
    // Buscar o usuário logado que está disponível através do middleware attachCurrentUser
    const loggedInUser = req.currentUser;
    const {comment, roomId} = req.body
    if (loggedInUser && !loggedInUser.rooms.includes(roomId)) {
      const result = await ReviewModel.create(req.body)
      await RoomModel.updateOne({_id: roomId}, {$push: {reviews: result._id}})
      await UserModel.updateOne({_id: loggedInUser._id}, {$push: {reviews: result._id}})
      return res.status(201).json(result);
    } else {
      return res.status(401).json({ msg: "Action unauthorized" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
})

module.exports = router


