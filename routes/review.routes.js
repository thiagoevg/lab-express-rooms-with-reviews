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

// cruD (DELETE) - HTTP DELETE
router.delete('/reviews/:reviewId', isAuthenticated, attachCurrentUser, async(req, res)=> {

  const { reviewId } = req.params
  const loggedInUser = req.currentUser;

  try{
    if(!loggedInUser.reviews.includes(reviewId)) {
      return res.status(400).json({msg: `You can't delete this comment`})
    }
    const result = await ReviewModel.deleteOne({_id: roomId})
    if(result.n === 0) {
      return res.status(404).json({msg: 'Room not found.'})
    }
    return res.status(200).json({})
  } catch(err) {
    console.error(err)
    return res.status(500).json({msg: JSON.stringify(err)})
  }
})

module.exports = router


