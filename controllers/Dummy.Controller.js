const Dummy = require('../models/DummyModal');
const Admin = require('../models/AdminModel');

const createDummyData = async (req, res) => {
    try {

        const admin = await Admin.find();
        if (!admin) {
            return res.status(400).json({ error: 'No admin found' });
        }

        const { totalRegisteredMembers, totalCoinHolders, totalStakedCoins, totalSellTodayUSDT, totalSellTodayYuva, totalBuyTodayUSDT, totalBuyTodayYuva, totalUSDT, totalYuva } = req.body

        // if (!totalRegisteredMembers || !totalCoinHolders || !totalStakedCoins || !totalSellTodayUSDT || !totalSellTodayYuva || !totalBuyTodayUSDT || !totalBuyTodayYuva || !totalUSDT || !totalYuva) {
        //     return res.status(400).json({ error: 'All fields are required ' })
        // }
        // console.log(req.body)

        const dummy = await Dummy.findOne();
        if (dummy) {
            //update that dummy data if it is alreadt exist
            const updatedDummy = await Dummy.findOneAndUpdate({}, {
                totalRegisteredMembers,
                totalCoinHolders,
                totalStakedCoins,
                totalSellTodayUSDT,
                totalSellTodayYuva,
                totalBuyTodayUSDT,
                totalBuyTodayYuva,
                totalUSDT,
                totalYuva
            }, { new: true });

            return res.status(200).json(updatedDummy);
        }
        const savedDummy = await new Dummy({
            totalRegisteredMembers,
            totalCoinHolders,
            totalStakedCoins,
            totalSellTodayUSDT,
            totalSellTodayYuva,
            totalBuyTodayUSDT,
            totalBuyTodayYuva,
            totalUSDT,
            totalYuva
        }).save();

        return res.status(200).json(savedDummy);
    } catch (err) {
        return res.status(500).json(err);
    }
}


const getDummyData = async (req, res) => {
    try {

        //check if dummy data is already exist
        const dummy = await Dummy.findOne();
        if (dummy) {
            return res.status(200).json(dummy);
        }

        return res.status(200).json(dummy);
    } catch (err) {
        return res.status(500).json(err);
    }
}

module.exports = { createDummyData,getDummyData }
