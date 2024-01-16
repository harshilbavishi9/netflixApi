const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL)

const db = mongoose.connection
db.once('open', (err) => {
  if (err) {
    console.log("Db is not connected");
    return false
  }
  console.log("Db is connected");
})

module.exports = db