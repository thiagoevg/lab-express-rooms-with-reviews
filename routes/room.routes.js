const router = require('express').Router()
const RoomModel = require('../models/RoomModel')

// Crud http post - CREATE 

router.post('/rooms', async (req, res) => {
  try {
    const result = RoomModel.create(req.body)
    return res.status(201).json(result)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ msg: JSON.stringify(err) })
  }
})

// cRud http get - READ 

router.get('/rooms', async (req, res) => {
  try {
    const result = RoomModel.find()
    return res.status(200).json(result)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ msg: JSON.stringify(err) })
  }
})

// crUd http put - UPDATE 

router.put('/rooms/:roomId', async (req, res) => {
  const { roomId } = req.params

  try {
    const result = RoomModel.findOneAndUpdate({ _id: roomId }, { $set: req.body }, { new: true })
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

router.delete('/rooms/:roomId', async(req, res)=> {
  const {roomId} = req.params

  try{
    const result = RoomModel.deleteOne({_id: roomId})

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
