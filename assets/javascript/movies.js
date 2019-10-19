var title;

// setting default of hiddenDiv to hidden lol
$(".hiddenDiv").hide();
// on click event for music api button
$("#gamingApi").click(function() {
  // show hidden div
  $(".hiddenDiv").show(function() {
    // scroll down to hidden div
    $(".modal-content.container").animate({ scrollTop: "550px" });
  });

  $(".hiddenDiv").html(
    $(
      "<div class='gamingApiDiv'>" +
        "<h5 class='gamingHeader center-align'>Looking for a Video Game?</h5>" +
        "<div class='musicApiSearch col s6'>" +
        "<h5 class='center-align'>Game's Name</h5>" +
        "<input id='gameSearch' type='text'>" +
        "<h5 class='center-align'>Platform</h5>" +
        "<input id='platformSearch' type='text'>" +
        "<button class='gamingApiSubmit'>search</button>" +
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

  $(".gamingApiSubmit").click(function() {
    // title of video game equal to user input
    var movie = $("#gameSearch").val();

    // platform relative to user input eg. pc, playstation 4, etc
    var platform = $("#platformSearch").val();

    var fullUrl = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

    var settings = {
      url: fullUrl,
      method: "GET",
    };
    // ajax call
    $.ajax(settings).done(function(response) {
      console.log(response);
    });
    $("#gameSearch").val("")
  });

  // on submit or close -> hide & clear div
  $(".modal-close").click(function() {
    $(".hiddenDiv").html("");
    $(".hiddenDiv").hide();
  });
});
