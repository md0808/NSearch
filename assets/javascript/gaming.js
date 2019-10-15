var title = "call of duty";
// title of video game equal to user input
var platform = "pc";
// platform relative to user input eg. pc, playstation 4, etc

var settings = {
  async: true,
  crossDomain: true,
  url:
    "https://chicken-coop.p.rapidapi.com/games/" +
    title +
    "?platform=" +
    platform,
  method: "GET",
  headers: {
    "x-rapidapi-host": "chicken-coop.p.rapidapi.com",
    "x-rapidapi-key": "34214cd962msh6f467762645269fp1e67a4jsnb9a440c8ca60"
  }
};

$.ajax(settings).done(function(response) {
  console.log(response);
});
