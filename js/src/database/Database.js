import mongoose from "mongoose";

const databaseConnection = "127.0.0.1:27017/pollution_database";

mongoose.connect(databaseConnection);

