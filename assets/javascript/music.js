var search;
// search term based on user input

// setting default of hiddenDiv to hidden lol
$(".hiddenDiv").hide();
// on click event for music api button
$("#musicApi").click(function() {
  // show hidden div
  $(".hiddenDiv").show("fast", function() {
    // scroll down to hidden div
    var scrollTo = $(".modal-content.container");
    scrollTo.animate({ scrollTop: scrollTo.height() });
    console.log("music button click");
  });

  $(".hiddenDiv").html(
    $(
      "<div class='musicApiDiv'>" +
        "<h5 class='musicHeader center-align'>Find an Artist</h5>" +
        "<div class='musicApiSearch col s6'>" +
        "<h5 class='center-align'>Artist's Name</h5>" +
        "<input id='songSearch' type='text' placeholder='Katy Perry'>" +
        "<button class='musicApiSubmit'>search</button>" +
        "</div>" +
        "<div class='musicApiResult col s6'>" +
        "<h5 class='center-align'>Result</h5>" +
        "<div class='minorSpacing' id='songNameResult' type='text'></div>" +
        "<a class='minorSpacing' id='songLinkResult' href='' target='_blank'></a>" +
        "<div class='minorSpacing' id='apiDescription'></div>" +
        "<div class='minorSpacing' id='apiShareLink'></div>" +
        "</div>" +
        "</div>"
    )
  );

  $(".musicApiSubmit").click(function() {
    // clear results dispaly
    $("#songNameResult").text("");
    $("#songLinkResult").text("");
    $("#apiDescription").text("");
    $("#apiShareLink").text("");

    // search is equal to user search
    var search = $("#songSearch").val();

    var musicQuery = {
      async: true,
      crossDomain: true,
      url: "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + search,
      method: "GET",
      headers: {
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        "x-rapidapi-key": "34214cd962msh6f467762645269fp1e67a4jsnb9a440c8ca60"
      }
    };

    // ajax response
    $.ajax(musicQuery).done(function(result) {
      // setting value of top song title
      var titleList = result.data[0].title;
      $("#songNameResult").text("Top Song: " + titleList);
      // setting value of url for top song
      var linkList = result.data[0].link;
      var linkHref = $("#songLinkResult").attr("href", linkList);
      // appending and displaying values
      $("#songLinkResult").text("Listen Here");
      $("#apiShareLink").text(linkList);
      $("#apiDescription").text("Share this Link!");
    });
    // set values back to nothing
    $("#songSearch").val("");
    var linkHref = "";
  });

  // on submit or close -> hide & clear div
  $(".modal-close").click(function() {
    $(".hiddenDiv").html("");
    $(".hiddenDiv").hide();
  });
});
