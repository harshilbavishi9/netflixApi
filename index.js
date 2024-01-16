const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors');
const morgan = require('morgan');
dotenv.config()
require('./config/mongoose')
const port = process.env.PORT;
const app = express();
const authRoutes = require('./routes/authRoutes')
const movieRoutes = require('./routes/movieRoutes')
const path = require('path')
app.use(morgan('dev'))
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/auth', authRoutes)
// app.use('/upload', express.static(path.join(__dirname, 'upload')))
app.use('/api/movie', movieRoutes)
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`server is running on port ${port}`);
})
