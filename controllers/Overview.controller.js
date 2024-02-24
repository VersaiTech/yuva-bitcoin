const Member = require("../models/memberModel");
const Stake = require("../models/stake");
const Deposit = require("../models/deposit");
const { Task, CompletedTask } = require("../models/Task");


async function getOverview(req, res) {
  try {
    const allMembers = await Member.find();
    const activeMembers = await Member.find({ isActive: true });
    const inactiveMembers = await Member.find({ isActive: false });
    const allTasks = await Task.find();
    const allStakes = await Stake.find();
    const allCoin = await Member.find();
    const allDeposits = await Deposit.find();

    // Count completed tasks separately
    const completedTasksCount = await CompletedTask.countDocuments({ status: 'confirmed' });
    const pendingTasksCount = await CompletedTask.countDocuments({ status: 'pending' });

    // Count pending tasks separately
    // const pendingTasksCount = allTasks.length - completedTasksCount;

    const totalStakesInvestment = allStakes.reduce((total, stake) => total + stake.investment, 0);
    const totalMemberCoins = allCoin.reduce((total, member) => total + member.coins, 0);
    const totalDepositAmount = allDeposits.reduce((total, deposit) => total + deposit.amount, 0);

    return res.status(200).json({
      status: true,
      message: "Overview for admin panel",
      overview: {
        allMembers: allMembers.length,
        activeMembers: activeMembers.length,
        inactiveMembers: inactiveMembers.length,
        allTasks: allTasks.length,
        completedTasks: completedTasksCount,
        pendingTasks: pendingTasksCount,
        totalStakesInvestment,
        totalMemberCoins,
        totalDepositAmount,
      },
    });
  } catch (error) {
    console.error("Error fetching overview data:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
}

module.exports = {
  getOverview
}