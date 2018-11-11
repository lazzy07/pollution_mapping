var IMAGE_DATA_DATABSE_BASE64 = require("../../constants").IMAGE_DATA_DATABSE_BASE64;
var mongoose =  require("mongoose");

var imageDataSchema = new mongoose.Schema({
  id: String,
  time: { type: Date, default: Date.now },
  imagedata: [],
  jpegPath: String
})

var imageDB = mongoose.model(IMAGE_DATA_DATABSE_BASE64, imageDataSchema);

module.exports = imageDB;