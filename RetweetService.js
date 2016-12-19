const TemplateBot = require('./TemplateService.js');
const twit = require('twit');
const config = require('./config.js');

const Twitter = new twit(config);

class RetweetService extends TemplateBot {
    taskBot (tweet) {
        if (!tweet.data.errors) {
            const retweetId = tweet.data.statuses[0].id_str;

                Twitter.post('statuses/retweet/:id', { id: retweetId })
                        .then(item => {
                            if(item.resp.statusCode === 200) {
                                console.log('Retweeted');
                            }
                            else {
                                console.log('Error:', item.resp.statusMessage);
                            }
                    });
                }
                else {
                    console.log('Error: ', res.data.errors[0].message);
                }
    }
}

module.exports = RetweetService;
