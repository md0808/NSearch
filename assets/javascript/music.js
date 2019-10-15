var search = "eminem";

var settings = {
  async: true,
  crossDomain: true,
  url: "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + search,
  method: "GET",
  headers: {
    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    "x-rapidapi-key": "34214cd962msh6f467762645269fp1e67a4jsnb9a440c8ca60"
  }
};

$.ajax(settings).done(function(response) {
  console.log(response);
});
