const mongoose = require('mongoose')

const RoomSchema = mongoose.Schema({
  name: { type: String },
  description: { type: String },
  imageUrl: { type: String },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' } ],
  creator_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model("Room", RoomSchema)