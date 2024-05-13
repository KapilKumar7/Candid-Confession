const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const confessionCategory = require("../utils/Enuums/confessionCategory");

const confessionSchema = new mongoose.Schema({
  confession: String,
  category: {
    type: String, // Single string
    enum: Object.values(confessionCategory),
    required: true,
  },
  userId: ObjectId,
  name: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("confessions", confessionSchema);
