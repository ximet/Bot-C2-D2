const RetweetService = {
    retweet: function (TwitterInstance, params) {
        TwitterInstance.get('search/tweets', params)
            .then( tweet => {
                if (!tweet.data.errors) {
                    const retweetId = tweet.data.statuses[0].id_str;
    
                    TwitterInstance.post('statuses/retweet/:id', { id: retweetId })
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
        });
    }
};

module.exports = RetweetService;
