const Coin = require('../models/Coin');

// Get all coins
const getAllCoins = async (req, res) => {
  try {
    const coins = await Coin.find({},{_id:false});
    res.json(coins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Set prices for a specific coin
const setCoinPrices = async (req, res) => {
  const { usdtPrice, ethereumPrice, btcPrice } = req.body;

  try {
    let coin = await Coin.findOne();

    if (!coin) {
      coin = new Coin({
        usdtPrice,
        ethereumPrice,
        btcPrice,
      });
    } else {
      coin.usdtPrice = usdtPrice;
      coin.ethereumPrice = ethereumPrice;
      coin.btcPrice = btcPrice;
    }

    await coin.save();

    res.json({ message: 'Prices set successfully' ,coin});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllCoins,
  setCoinPrices,
};