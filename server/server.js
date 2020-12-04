const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

/* import Routes */
const userRoute = require('./routes/user');

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
app.use(
  cors({
    origin: '*'
  })
);

/* middleware */
app.use('/api/v1', userRoute);

const port = process.env.PORT || '8000';

app.listen(port, () => {
  console.log(`API is running on port: ${port} (${process.env.NODE_ENV})`);
});
