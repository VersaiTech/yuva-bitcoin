

const cron = require('node-cron');
const Stake = require('../models/stake');
const Member = require('../models/memberModel');
const { Task, CompletedTask } = require('../models/Task');


cron.schedule('0 0 * * *', async () => {
  console.log('Running the daily 1 cron job...');

  try {
    // Find staking Stakes with interest not credited
    const stakingStakes = await Stake.find({ interestCredited: false });

    // Iterate over staking Stakes and calculate interest
    for (const stake of stakingStakes) {
      const currentDate = new Date();
      const stakingStartDate = stake.sys_date;
      const stakingDuration = stake.stakingDuration;

      const elapsedTime = currentDate - stakingStartDate;
      const elapsedDays = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));

      // Check if the staking duration has been reached
      if (elapsedDays >= stakingDuration * 30) { // Assuming each month has 30 days
        const interestRate = getInterestRate(stakingDuration);
        if (interestRate !== null) {
          // Calculate interest based on the original investment amount
          const interest = calculateInterest(stake.investment, interestRate, stakingDuration);

          // Update member's account with interest
          const member = await Member.findOne({ member_user_id: stake.member_user_id });
          member.coins += interest;
          await member.save();

          // Mark the stake as credited
          stake.interestCredited = true;
          await stake.save();

          console.log(`Staking duration reached for stake with ID ${stake._id}. Member received ${interest} coins as interest.`);
        } else {
          console.log(`Invalid staking duration for stake with ID ${stake._id}.`);
        }
      }
    }

    console.log('Daily cron job completed.');
  } catch (error) {
    console.error('Error in the daily cron job:', error);
  }
}, {
  scheduled: true,
  timezone: 'Asia/Kolkata', // Set your timezone to IST
});

// Helper function to calculate interest based on stake duration
function calculateInterest(investment, interestRate, stakingDuration) {
  const monthlyInterestRate = interestRate / 12; // Convert annual interest rate to monthly
  return investment * monthlyInterestRate * stakingDuration; // Monthly interest for the stake duration
}

// Helper function to get interest rate based on stake duration
function getInterestRate(stakingDuration) {
  if (stakingDuration === 3) {
    return 0.05; // 5% per annum
  } else if (stakingDuration === 6) {
    return 0.07; // 7% per annum
  } else if (stakingDuration === 12) {
    return 0.10; // 10% per annum
  }
  return null; // Invalid duration
}




module.exports = {
  cron
}