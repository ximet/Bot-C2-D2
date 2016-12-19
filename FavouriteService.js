const TemplateBot = require('./TemplateService.js');
const twit = require('twit');
const config = require('./config.js');
const wordfilter = require('wordfilter');

const Twitter = new twit(config);

const randomize = (arr) =>  {
    const index = Math.floor(Math.random() * arr.length);

    return arr[index];
};

class FavouriteService extends TemplateBot {

    taskBot (tweet) {
        if (!tweet.data.errors) {
            const tweetItems = tweet.data.statuses;

            const randomTweet = randomize(tweetItems);
            if (typeof randomTweet !== 'undefined' && !wordfilter.blacklisted(randomTweet)) {
                const retweetId = randomTweet.id_str;

                Twitter.post('favorites/create', { id: retweetId })
                    .then(item => {
                        if(item.resp.statusCode === 200) {
                            console.log('Favorited');
                        }
                        else {
                            console.log('Error:', item.resp.statusMessage);
                        }
                    });
            }
        }



        else {
            console.log('Error: ', res.data.errors[0].message);
        }
    }
}

module.exports = FavouriteService;
