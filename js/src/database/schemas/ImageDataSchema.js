import {IMAGE_DATA_DATABSE_BASE64} from "../../constants";
import mongoose from "mongoose";

const imageDataSchema = mongoose.Schema({
  id: String,
  time: { type: Date, default: Date.now },
  position: Object,
  imagedata: [],
  jpegPath: String
})

export default imageDataBase64DB = new imageDataSchema();