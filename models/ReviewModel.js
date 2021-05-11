const mongoose = require('mongoose')

const ReviewSchema = mongoose.Schema({
  comment: { type: String, maxlength: 200 },
  roomId: { type: Schema.Types.ObjectId, ref: "Room" },
});

module.exports = mongoose.model('Review', ReviewSchema)