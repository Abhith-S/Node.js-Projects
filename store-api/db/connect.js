const mongoose = require('mongoose')

const connectDB = async(uri) => {
  try {
    await mongoose.connect(uri, {
      //to remove the depricatuion warnings
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDb");
  } catch (err) {
    console.log(err);
  }
}

module.exports = connectDB
