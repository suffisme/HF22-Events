const dotenv = require('dotenv');
const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
  console.log(`Uncaught Exception!!!`);
  console.log(err);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection established'));

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`listening on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log(`Unhandled rejection!!!`);
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
