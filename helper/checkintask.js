// const cron = require('node-cron');
// const { AssignedTask } = require('../models/Task');

// const doublechecktask = async () => {
//     //write a code for checking if the task is completed and admin has confirmed
//     const tasks = await AssignedTask.find({adminConfirmed: false});
//     // console.log(tasks);
//     tasks.forEach(element => {
//        console.log(element.twitterId); 
//     });

//     //need to check that this twitterid is liked the post or not with twitter api


// }

// module.exports = doublechecktask


// const cron = require('node-cron');
// const { AssignedTask } = require('../models/Task');
// const Twit = require('twit');

// const doublechecktask = async () => {
//     //write a code for checking if the task is completed and admin has confirmed
//     const tasks = await AssignedTask.find({adminConfirmed: false});

//     tasks.forEach(async (element) => {
//         console.log(`Checking tweet with ID: ${element.twitterId}`);

//         try {
//             // Initialize Twit with your Twitter API keys and tokens
//             const T = new Twit({
//                 consumer_key: 'X8Eq7GmsZQinj9ulddxQ7r57I',
//                 consumer_secret: 'dZ1patCeux5O7AbmXdJk2M1s3Ljrnd61vvmiBjribU7WyiGt2f',
//                 access_token: '1720674783707422720-Eax5oaWYz0vBegAz3ykM8VpM3NBWwy',
//                 access_token_secret: 'tTB0SlrOTf73kWEyHsU9yUaczlBVreugLtKumfOX2KM8y'
//             });

//             // Get the details of the tweet
//             const tweetId = element.twitterId;
//             const tweetInfo = await T.get('statuses/show/:id', { id: tweetId });

//             // Check if the user's ID is present in the list of users who liked the tweet
//             const likes = tweetInfo.data.favorite_count; // Total likes on the tweet
//             const likedBy = tweetInfo.data.entities.likes; // List of users who liked the tweet

//             // Check if the user has liked the tweet
//             const userIdToCheck = element.twitterUserId;
//             const isLiked = likedBy.some(user => user.id_str === userIdToCheck);

//             console.log(`Tweet ${tweetId} has ${likes} likes.`);
//             console.log(`User ${userIdToCheck} ${isLiked ? 'has liked' : 'has not liked'} the tweet.`);
//         } catch (error) {
//             console.error(`Error occurred while checking tweet ${element.twitterId}: ${error}`);
//         }
//     });
// }

// module.exports = doublechecktask;


// const { AssignedTask } = require('../models/Task');
// const Twit = require('twit');

// const doublechecktask = async () => {
//     try {
//         // Fetch tasks that are not yet confirmed by admin
//         const tasks = await AssignedTask.find({ adminConfirmed: false });

//         tasks.forEach(async (element) => {
//             console.log(`Checking tweet with ID: ${element.twitterId}`);

//             try {
//                 // Initialize Twit with your Twitter API keys and tokens
//                 const T = new Twit({
//                     consumer_key: 'X8Eq7GmsZQinj9ulddxQ7r57I',
//                     consumer_secret: 'dZ1patCeux5O7AbmXdJk2M1s3Ljrnd61vvmiBjribU7WyiGt2f',
//                     access_token: '1720674783707422720-Eax5oaWYz0vBegAz3ykM8VpM3NBWwy',
//                     access_token_secret: 'tTB0SlrOTf73kWEyHsU9yUaczlBVreugLtKumfOX2KM8y'
//                 });

//                 // Get the details of the tweet
//                 const tweetId = element.twitterId;
//                 const tweetInfo = await T.get('tweets/:id', { id: tweetId });

//                 console.log(tweetInfo);

//                 // Check if the tweet has been liked
//                 if (tweetInfo && tweetInfo.data && tweetInfo.data.public_metrics && tweetInfo.data.public_metrics.like_count !== undefined) {
//                     const likes = tweetInfo.data.public_metrics.like_count; // Total likes on the tweet
//                     console.log(`Tweet ${tweetId} has ${likes} likes.`);

//                     // Update the task status based on like status
//                     // Your logic for updating task status goes here
//                 } else {
//                     console.log(`Tweet ${tweetId} data structure is not as expected.`);
//                 }
//             } catch (error) {
//                 console.error(`Error occurred while checking tweet ${element.twitterId}: ${error}`);
//             }
//         });
//     } catch (error) {
//         console.error('Error occurred while fetching tasks:', error);
//     }
// }

// module.exports = doublechecktask;



// const { AssignedTask } = require('../models/Task');
// const Twit = require('twit');

// const doublechecktask = async () => {
//     try {
//         // Fetch tasks that are not yet confirmed by admin
//         const tasks = await AssignedTask.find({ adminConfirmed: false });

//         tasks.forEach(async (element) => {
//             console.log(`Checking tweets for user: ${element.twitterId}`);

//             try {
//                 // Initialize Twit with your Twitter API keys and tokens
//                 const T = new Twit({
//                     consumer_key: 'X8Eq7GmsZQinj9ulddxQ7r57I',
//                     consumer_secret: 'dZ1patCeux5O7AbmXdJk2M1s3Ljrnd61vvmiBjribU7WyiGt2f',
//                     access_token: '1720674783707422720-Eax5oaWYz0vBegAz3ykM8VpM3NBWwy',
//                     access_token_secret: 'tTB0SlrOTf73kWEyHsU9yUaczlBVreugLtKumfOX2KM8y'
//                 });

//                 async function postTweet(tweetText) {
//                     try {
//                         const response = await T.post('tweets', { text: tweetText });
//                         console.log('Tweet posted successfully:', response.data);
//                     } catch (error) {
//                         console.error('Error posting tweet:', error);
//                     }
//                 }

//                 // Usage example: Call the function with the tweet text
//                 const tweetText = 'Hello, Twitter API v2!';
//                 postTweet(tweetText);
//             } catch (error) {
//                 console.error(`Error occurred while checking tweets for user ${element.twitterId}: ${error}`);
//             }

//         });
//     } catch (error) {
//         console.error('Error occurred while fetching tasks:', error);
//     }
// }
//                 // Fetch tweets by the user
//                 //                 const tweetsResponse = await T.get('tweets', {
//                 //                     screen_name: element.twitterId,
//                 //                     count: 10 // adjust count as per your requirement
//                 //                 });


//                 //                 // Extract tweet IDs from the response
//                 //                 const tweetIds = tweetsResponse.data;
//                 //                 console.log(tweetsResponse.data);
//                 //                 // const tweetIds = tweetsResponse.data.map(tweet => tweet.id_str);

//                 //                 // Iterate over tweet IDs and fetch tweet information
//                 //                 for (const tweetId of tweetIds) {
//                 //                     const tweetInfo = await T.get('tweets/:id', { id: tweetId });

//                 //                     // Check if the tweet has been liked
//                 //                     if (tweetInfo && tweetInfo.data && tweetInfo.data.public_metrics && tweetInfo.data.public_metrics.like_count !== undefined) {
//                 //                         const likes = tweetInfo.data.public_metrics.like_count; // Total likes on the tweet
//                 //                         console.log(`Tweet ${tweetId} has ${likes} likes.`);

//                 //                         // Update the task status based on like status
//                 //                         // Your logic for updating task status goes here
//                 //                     } else {
//                 //                         console.log(`Tweet ${tweetId} data structure is not as expected.`);
//                 //                     }
//                 //                 }
//                 //             } catch (error) {
//                 //                 console.error(`Error occurred while checking tweets for user ${element.twitterUsername}: ${error}`);
//                 //             }
//                 //         });
//                 //     } catch (error) {
//                 //         console.error('Error occurred while fetching tasks:', error);
//                 //     }
//                 // }

//                 module.exports = doublechecktask;



const { AssignedTask } = require('../models/Task');
const Twit = require('twit');

const doublechecktask = async () => {
    try {
        // Fetch tasks that are not yet confirmed by admin
        const tasks = await AssignedTask.find({ adminConfirmed: false });

        tasks.forEach(async (element) => {
            console.log(`Checking tweets for user: ${element.twitterId}`);

            try {
                // Initialize Twit with your Twitter API keys and tokens
                const T = new Twit({
                    consumer_key: 'X8Eq7GmsZQinj9ulddxQ7r57I',
                    consumer_secret: 'dZ1patCeux5O7AbmXdJk2M1s3Ljrnd61vvmiBjribU7WyiGt2f',
                    access_token: '1720674783707422720-Eax5oaWYz0vBegAz3ykM8VpM3NBWwy',
                    access_token_secret: 'tTB0SlrOTf73kWEyHsU9yUaczlBVreugLtKumfOX2KM8y'
                });

                // Function to post a tweet
                async function postTweet(tweetText) {
                    try {
                        const response = await T.post('/2/tweets', { text: tweetText });
                        console.log('Tweet posted successfully:', response);
                        
                    } catch (error) {
                        console.error('Error posting tweet:', error);
                    }
                }

                // Example: Post a tweet for each task
                const tweetText = 'Hello, Twitter API v2!';
                await postTweet(tweetText);

            } catch (error) {
                console.error(`Error occurred while checking tweets for user ${element.twitterId}: ${error}`);
            }

        });
    } catch (error) {
        console.error('Error occurred while fetching tasks:', error);
    }
}

module.exports = doublechecktask;


