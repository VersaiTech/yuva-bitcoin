const mongoose = require('mongoose');

const coinSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Yuva Bit-Coin',
    unique: true,
  },
  usdtPrice: {
    type: Number,
    default: 0,
  },
  ethereumPrice: {
    type: Number,
    default: 0,
  },
  btcPrice: {
    type: Number,
    default: 0,
  },
});

const Coin = mongoose.model('Coin', coinSchema);

module.exports = Coin;
