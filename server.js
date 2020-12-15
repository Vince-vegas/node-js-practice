const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({
  path: './config.env',
});

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Database Started'));

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Must contain a name'],
  },
  resolved: {
    type: String,
    required: true,
    default: true,
  },
});

const Project = mongoose.model('Project', projectSchema);

app.listen(3000, () => {
  console.log('Server Started');
});
