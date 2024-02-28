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
  const { usdt, ethereum, btc } = req.body;

  try {
    let coin = await Coin.findOne();

    if (!coin) {
      coin = new Coin({
        price: {
          usdt,
          ethereum,
          btc,
        },
      });
    } else {
      coin.price.usdt = usdt;
      coin.price.ethereum = ethereum;
      coin.price.btc = btc;
    }

    await coin.save();

    res.json({ message: 'Prices set successfully', coin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllCoins,
  setCoinPrices,
};