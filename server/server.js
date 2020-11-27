const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

/* connect db */
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log('DB connected'))
  .catch((err) => console.log('DB CONNECTION ERROR: ', err));

/* app middleware */
app.use(bodyParser.json());
app.use(morgan('dev'));

if (process.env.NODE_ENV === 'development') {
  app.use(
    cors({
      origin: process.env.CLIENT_URI
    })
  );
}

/* middleware */
app.get('/api', (req, res) => {
  res.json({
    message: 'Hello guy!!!'
  });
});

const port = process.env.PORT || '8000';

app.listen(port, () => {
  console.log(`API is running on port: ${port}`);
});
