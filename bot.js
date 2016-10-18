console.log("The bot is starting!");

var Twit = require('twit');

var T = new Twit({
  consumer_key:         'NkMdoItyeeZwd3eOUaOKH87AY',
  consumer_secret:      't1MqvM8pswRUy4uRiAqesPLgk6DkwEuYex9w48b9YNbAac8q1U',
  access_token:         '787810168692027393-He9ltr1DBi46sSqBg6usDouZLsCSDd6',
  access_token_secret:  'XLJO9yXEjnXSUSYBW50qeB8UZmOBKChPSGgNfoLcKtpcG',
});

var strainFromKeeper = "Lemon Haze";

var params = {
  q: 'strain OR weed OR marijuana OR cannabis ' + strainFromKeeper + ' -filter:links -RT -sale',
  lang: 'en',
  count: 5

}

T.get('search/tweets', params, gotData);

function gotData(err, data, response) {
  var tweets = data.statuses;
  // console.log(data[0].text);
  // console.log(data.statuses);
  for (var i = 0; i < tweets.length; i++) {
    console.log(tweets[i].text);
    console.log("========================================================================");
  }

}
