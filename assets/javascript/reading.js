var publicKey = "c2169d72d3b2e651f15a205df293cd45";
var privateKey = "dd44fc86390588eb27316e7c9a646b1e9a1a875b";
var myHash = "adace4199ca5e890b0b866de84357260";

$.ajax({
  Url:
    "https://gateway.marvel.com:443/v1/public/characters?apikey=" + publicKey,
  Method: "GET",
  Params: {
    apikey: publicKey,
    ts: "1564731162583",
    hash: myHash
  },
  Headers: {}
}).then(function(response) {
  console.log(response);
});

// http://gateway.marvel.com/v1/public/comics?ts=1564731162583&apikey=c2169d72d3b2e651f15a205df293cd45&hash=adace4199ca5e890b0b866de84357260
