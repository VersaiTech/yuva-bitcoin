const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require("cors");

const port = process.env.PORT || 3010;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors()); //Change this at the time of deployment

const db = require('./config/db.config.js');

app.use('/api/Auth', require('./routes/Auth.route'));
app.use('/api/Dashboard', require('./routes/Dashboard.route'));
app.use('/api/Staking', require('./routes/Staking.route'));
app.use('/api/Team', require('./routes/Team.route'));
app.use('/api/Earning', require('./routes/Earning.route'));
app.use('/api/Withdraw', require('./routes/Withdraw.route'));
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});