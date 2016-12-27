const twit = require('twit');
const config = require('./config.js');

const Twitter = new twit(config);

const RetweetService = require('./RetweetService.js');
const FavouriteService = require('./FavouriteService.js');

const retweet = new RetweetService();
const favourite = new FavouriteService();

retweet.runTask();
favourite.runTask();
tweetedTweet();

function tweetedTweet () {
    const tweet = {
        status: '#nodeJS cool '
    };

    Twitter.post('statuses/update', tweet)
        .then(tweet => {
            if (tweet.err) {
                console.log("Something wrong!");
            } else {
                console.log("It worked!");
            }
        });
}

