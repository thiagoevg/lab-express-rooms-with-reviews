const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    passwordHash: { type: String, required: true },
    phoneNumber: { type: String, required: true, trim: true },
    address: {
      street: { type: String, required: true, trim: true },
      neighbourhood: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
      postCode: { type: String, required: true, trim: true },
      stateOrProvince: { type: String, required: true, trim: true },
      country: { type: String, required: true, trim: true },
    },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }]
  }
)

module.exports = mongoose.model("User", UserSchema)