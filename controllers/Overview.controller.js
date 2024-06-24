const Member = require("../models/memberModel");
const Stake = require("../models/stake");
const Deposit = require("../models/deposit");
const Admin = require("../models/AdminModel");
const { Task, CompletedTask } = require("../models/Task");
const StakeHistory = require("../models/stakingHistory");
const ReferralHistory = require("../models/referralModel");
const Withdraw = require("../models/withdrawModel");

const { userRegToday, stakeToday, withdrawSToday, withdrawRToday, withdrawPToday, usdtDepositToday, referralToday } = require("../controllers/AdminController");

async function getOverview(req, res) {
  try {
    const allMembers = await Member.find();
    const activeMembers = await Member.find({ isActive: true });
    const inactiveMembers = await Member.find({ isActive: false });
    const allTasks = await Task.find();
    const allStakes = await Stake.find();
    const allCoin = await Member.find();
    const allDeposits = await Deposit.find();

    const adminData = await Admin.findOne()

    const completedTasksCount = await CompletedTask.countDocuments({ status: 'confirmed' });
    const pendingTasksCount = await CompletedTask.countDocuments({ status: 'pending' });

    const totalStakesInvestment = allStakes.reduce((total, stake) => total + stake.investment, 0);
    const totalMemberCoins = allCoin.reduce((total, member) => total + member.coins, 0);
    // const totalDepositAmount = allDeposits.reduce((total, deposit) => total + deposit.amount, 0);

    const totalDepositUsdt = allDeposits.reduce((total, deposit) => (deposit.deposit_type === 'usdt' ? total + deposit.amount : total), 0);
    const totalDepositYuva = allDeposits.reduce((total, deposit) => (deposit.deposit_type === 'yuva' ? total + deposit.amount : total), 0);

    const totalTaskCoins = await CompletedTask.aggregate([
      { $match: { status: 'confirmed' } },
      { $group: { _id: null, totalCoins: { $sum: "$coins" }, }, },
      { $project: { _id: 0, totalCoins: 1, }, },
    ]);

    const totalReferralEarned = await ReferralHistory.aggregate([
      { $match: { referral_user_isRefered: true }, },
      { $group: { _id: null, totalCoins: { $sum: "$user_earned" }, }, },
      { $project: { _id: 0, totalCoins: 1, }, },
    ])

    const userRegToday = await Member.aggregate([
      { $match: { createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)), $lt: new Date(new Date().setHours(23, 59, 59, 999)), }, }, },
      { $group: { _id: null, count: { $sum: 1 }, }, },
    ]);

    const stakeToday = await Stake.aggregate([
      { $match: { sys_date: { $gte: new Date(new Date().setHours(0, 0, 0, 0)), $lt: new Date(new Date().setHours(23, 59, 59, 999)), }, }, },
      { $group: { _id: null, count: { $sum: 1 }, }, },
    ]);


    const withdrawSToday = await Withdraw.aggregate([
      { $match: { status: 'Approved', processing_date: { $gte: new Date(new Date().setHours(0, 0, 0, 0)), $lt: new Date(new Date().setHours(23, 59, 59, 999)), }, }, },
      { $group: { _id: null, count: { $sum: 1 }, }, },
    ]);

    const withdrawRToday = await Withdraw.aggregate([
      { $match: { status: 'Rejected', processing_date: { $gte: new Date(new Date().setHours(0, 0, 0, 0)), $lt: new Date(new Date().setHours(23, 59, 59, 999)), }, }, },
      { $group: { _id: null, count: { $sum: 1 }, }, },
    ]);

    const withdrawPToday = await Withdraw.aggregate([
      { $match: { status: 'Pending', with_date: { $gte: new Date(new Date().setHours(0, 0, 0, 0)), $lt: new Date(new Date().setHours(23, 59, 59, 999)), }, }, },
      { $group: { _id: null, count: { $sum: 1 }, }, },
    ]);

    const usdtDepositToday = await Deposit.aggregate([
      { $match: { deposit_type: 'usdt', createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)), $lt: new Date(new Date().setHours(23, 59, 59, 999)), }, }, },
      { $group: { _id: null, count: { $sum: "$amount" }, }, },
      // { $group: { _id: null, count: { $sum: 1 }, }, },
    ]);

    const yuvaDepositToday = await Deposit.aggregate([
      { $match: { deposit_type: 'yuva', createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)), $lt: new Date(new Date().setHours(23, 59, 59, 999)), }, }, },
      { $group: { _id: null, count: { $sum: "$amount" }, }, },
      // { $project: { _id: 0, totalCoins: 1, }, },
      // { $group: { _id: null, count: { $sum: 1 }, }, },
    ]);

    const referralToday = await ReferralHistory.aggregate([
      { $match: { referral_user_isRefered: true,createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)), $lt: new Date(new Date().setHours(23, 59, 59, 999)), }, }, },
  { $group: { _id: null, count: { $sum: 1 }, }, },
    ]);

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
      totalTaskCoins: totalTaskCoins.length > 0 ? totalTaskCoins[0].totalCoins : 0,
      totalStakesInvestment,
      totalMemberCoins,
      // totalDepositAmount,
      totalDepositUsdt: totalDepositUsdt,
      totalDepositYuva: totalDepositYuva,
      totalReferralEarned: totalReferralEarned.length > 0 ? totalReferralEarned[0].totalCoins : 0,
      yuva: adminData.yuva,
      usdt: adminData.usdt,
      userRegToday: userRegToday.length > 0 ? userRegToday[0].count : 0,
      stakeToday: stakeToday.length > 0 ? stakeToday[0].count : 0,
      withdrawSToday: withdrawSToday.length > 0 ? withdrawSToday[0].count : 0,
      withdrawRToday: withdrawRToday.length > 0 ? withdrawRToday[0].count : 0,
      withdrawPToday: withdrawPToday.length > 0 ? withdrawPToday[0].count : 0,
      usdtDepositToday: usdtDepositToday.length > 0 ? usdtDepositToday[0].count : 0,
      yuvaDepositToday: yuvaDepositToday.length > 0 ? yuvaDepositToday[0].count : 0,
      referralToday: referralToday.length > 0 ? referralToday[0].count : 0,
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


async function getUserOverview(req, res) {
  try {
    const userId = req.user.member_user_id;

    // Retrieve data specific to the user
    const memberData = await Member.findOne({ member_user_id: userId });

    const completedTasksCount = await CompletedTask.countDocuments({ userId, status: 'confirmed' });
    const pendingTasksCount = await CompletedTask.countDocuments({ userId, status: 'pending' });


    // Count total tasks (tasks without status)
    const totalTasksCount = await Task.countDocuments();

    // Count staking duration for 3, 6 and 12 months
    const stakeDuration3months = await StakeHistory.find({ member_user_id: userId, stakingDuration: 3, stake_type: 'Wallet' });
    const stakeDuration6months = await StakeHistory.find({ member_user_id: userId, stakingDuration: 6, stake_type: 'Wallet' });
    const stakeDuration12months = await StakeHistory.find({ member_user_id: userId, stakingDuration: 12, stake_type: 'Wallet' });

    let total3months = 0
    stakeDuration3months.forEach(stake => {
      total3months += stake.investment
    })

    let total6months = 0
    stakeDuration6months.forEach(stake => {
      total6months += stake.investment
    })

    let total12months = 0
    stakeDuration12months.forEach(stake => {
      total12months += stake.investment
    })
    // const stakingTotals = [total3months = total3months, total6months = total6months, total12months = total12months];

    return res.status(200).json({
      status: true,
      message: "Overview for user",
      overview: {
        totalTasks: totalTasksCount,
        completedTasks: completedTasksCount,
        pendingTasks: pendingTasksCount,
        stakingTotals: {
          total3months: total3months,
          total6months: total6months,
          total12months: total12months
        },
        coins: memberData ? memberData.coins : 0,
        deposit_usdt: memberData ? memberData.deposit_usdt : 0,
      }
    });
  } catch (error) {
    console.error("Error fetching user overview data:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
}
module.exports = {
  getOverview, getUserOverview,
}
