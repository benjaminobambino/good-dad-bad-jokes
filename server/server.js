const express = require('express');
const db = require('./db');
const AppRouter = require('./routes/AppRouter');
const AuthRouter = require('./routes/AuthRouter');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(logger('dev'));

app.use('/api', AppRouter);
app.use('/auth', AuthRouter);

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/client/build/index.html`));
  });
}

app.listen(PORT, () => {
  console.log(`The Jokes server is running on port: ${PORT}`);
});
