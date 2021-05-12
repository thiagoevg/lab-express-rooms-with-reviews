const router = require('express').Router()

const RoomModel = require('../models/RoomModel')
const UserModel = require('../models/UserModel')
const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");

// Crud http post - CREATE 

router.post('/rooms', isAuthenticated, attachCurrentUser, async (req, res) => {
  try {
    const loggedInUser = req.currentUser;

    if (loggedInUser) {
      const result = await RoomModel.create(req.body)
      const updatedUser = await UserModel.findOneAndUpdate({ _id: loggedInUser._id }, { $push: { rooms: result._id } })
      console.log(updatedUser)
      return res.status(201).json(result)
    } else {
      return res.status(401).json({ msg: "Unauthorized" });
    }
  } catch (err) {
    console.error(err)
    return res.status(500).json({ msg: JSON.stringify(err) })
  }
})

// cRud http get - READ 

router.get('/rooms', async (req, res) => {
  try {
    const result = await RoomModel.find()
    return res.status(200).json(result)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ msg: JSON.stringify(err) })
  }
})

// crUd http put - UPDATE 

router.put('/rooms/:roomId', isAuthenticated, attachCurrentUser, async (req, res) => {
  const { roomId } = req.params

  try {
    const result = await RoomModel.findOneAndUpdate({ _id: roomId }, { $set: req.body }, { new: true })
    if (!result) {
      return res.status(404).json({ msg: 'Room not found.' })
    }
    res.status(200).json(result)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ msg: JSON.stringify(err) })
  }
})

// cruD http delete - DELETE

router.delete('/rooms/:roomId', isAuthenticated, attachCurrentUser, async(req, res)=> {
  const { roomId } = req.params

  try{
    const result = await RoomModel.deleteOne({_id: roomId})

    if(result.n === 0) {
      res.status(404).json({msg: 'Room not found.'})
    }
    return res.status(200).json({})
  } catch(err) {
    console.error(err)
    return res.status(500).json({msg: JSON.stringify(err)})
  }
})


module.exports = router
