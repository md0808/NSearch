// setting default of hiddenDiv to hidden lol
$(".hiddenDiv").hide();
// on click event for music api button
$("#gamingApi").click(function() {
  console.log("gaming button pressed");
  // show hidden div
  $(".hiddenDiv").show(function() {
    // scroll down to hidden div
    $(".modal-content.container").animate({ scrollTop: "550px" });
  });

  $(".hiddenDiv").html(
    $(
      "<div class='moviesApiDiv'>" +
        "<h5 class='gamingHeader center-align'>Looking for Something to Watch?</h5>" +
        "<div class='musicApiSearch col s6'>" +
        "<h5 class='center-align'>Title</h5>" +
        "<input id='titleSearch' type='text' placeholder='21 Jump Street'>" +
        "<h5 class='center-align'>Year of Release</h5>" +
        "<input id='yearSearch' type='text' placeholder='2016'>" +
        "<button class='moviesApiSubmit'>search</button>" +
        "</div>" +
        "<div class='musicApiResult col s6'>" +
        "<h5 class='center-align'>Result</h5>" +
        "<div class='moviesTitleSpacing' id='songNameResult' type='text'></div>" +
        "<a class='minorSpacing' id='songLinkResult' href='' target='_blank'></a>" +
        "<div class='minorSpacing' id='apiDescription'></div>" +
        "<div class='middleSpacing' id='movieRating'></div>" +
        "<div class='middleSpacing' id='movieRelease'></div>" +
        "<div class='middleSpacing' id='apiShareLink'></div>" +
        "</div>" +
        "</div>"
    )
  );

  $(".moviesApiSubmit").click(function() {
    // clear results display prior to creating new content
    $("#songNameResult").text("");
    $("#apiDescription").text("");
    $("#movieRating").text("");
    $("#movieRelease").text("");

    // title of video game equal to user input
    var movie = $("#titleSearch").val();
    // year of movie related to
    var year = $("#yearSearch").val();

    var fullUrl =
      "https://www.omdbapi.com/?t=" + movie + "&y=" + year + "&apikey=trilogy";

    var settings = {
      url: fullUrl,
      method: "GET"
    };
    // ajax call
    $.ajax(settings).done(function(response) {
      console.log(response);
      var searchTitle = response.Title;
      var searchPlot = response.Plot;
      var searchRating = response.Rated;
      var searchReleased = response.Released;
      $("#songNameResult").text("Title: " + searchTitle);
      $("#apiDescription").text(searchPlot);
      $("#movieRating").text("Rating: " + searchRating);
      $("#movieRelease").text("Release Date: " + searchReleased);
    });
    // clear input fields
    $("#titleSearch").val("");
    $("#yearSearch").val("");
  });

  // on submit or close -> hide & clear div
  $(".modal-close").click(function() {
    $(".hiddenDiv").html("");
    $(".hiddenDiv").hide();
  });
});
