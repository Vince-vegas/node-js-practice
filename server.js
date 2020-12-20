const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({
  path: './config.env',
});

const DBPATH = process.env.DATABASE.replace(
  '<DBPASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DBPATH, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('DB Started'));

app.listen(3000, () => {
  console.log('Server Started');
});
