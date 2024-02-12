const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require("cors");
const { Connection } = require("./config/db.config");
require("dotenv").config();

const port = process.env.PORT || 5001;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors()); 

// const db = require('./config/db.config.js');

app.use('/api/Auth', require('./routes/Auth.route'));
app.use('/api/Dashboard', require('./routes/Dashboard.route'));
app.use('/api/Staking', require('./routes/Staking.route'));
app.use('/api/Team', require('./routes/Team.route'));
app.use('/api/Earning', require('./routes/Earning.route'));
app.use('/api/Withdraw', require('./routes/Withdraw.route'));
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}.`);
// });


//Database
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
Connection(username, password);

//listening
app.listen(5000, (req, res) => {
  console.log("=== Server is Listening on " + 5000 + " Port ===");
});