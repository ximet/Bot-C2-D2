const ranDom = (arr) => {
    var index = Math.floor(Math.random()*arr.length);
    return arr[index];
};

const FavouriteService = {

    favourite: function (TwitterInstance, params) {
        TwitterInstance.get('search/tweets', params)
            .then( tweet => {
                if (!tweet.data.errors) {
                    const tweetItems = tweet.data.statuses;
                    const randomTweet = ranDom(tweetItems);

                    if (typeof randomTweet !== 'undefined') {
                        const retweetId = randomTweet.id_str;

                        TwitterInstance.post('favorites/create', { id: retweetId })
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
        });
    }
};

module.exports = FavouriteService;

