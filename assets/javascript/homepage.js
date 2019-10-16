var firebaseConfig = {
    apiKey: "AIzaSyBNbx0JW21-f2EJeIbpsDHcNdftO96nvBY",
    authDomain: "nsearch-d5965.firebaseapp.com",
    databaseURL: "https://nsearch-d5965.firebaseio.com",
    projectId: "nsearch-d5965",
    storageBucket: "nsearch-d5965.appspot.com",
    messagingSenderId: "484120172576",
    appId: "1:484120172576:web:469c250d4a9b1d0ec54445",
    measurementId: "G-MZYT0H4D0L"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics()

  var database = firebase.database();

  //these vars are for adding new posts to a specific place
  var postRef = "/posts";
  var booksPostsRef = "/posts/books";
  var moviesPostsRef = "/posts/movies";
  var musicPostsRef = "/posts/music";
  var videoGamesPostsRef = "/posts/videogames";


$( document ).ready(function() {
    $(".dropdown-trigger").dropdown();
})

$(document).ready(function(){
  $('select').formSelect();
});

//Create new post modal shows
$("#makeAPost-btn").on("click", function(){
    console.log ("post btn clicked");
    $("#createAPost-modal").modal();
})

$(".reply-modal-btn").on("click", function(){
    console.log ("post btn clicked");
    $("#reply-modal").modal();
})



//this is the function the pushes the post info the the correct db category
function pushPostToDatabase(){
    console.log("Create a new post btn clicked");

    var newPostRef = "";

    var post_username = $("#post-username").val().trim();
    //this is only because the dropdown on the modal isn't working
    var post_category = "video games";
    var post_title = $("#post-title").val().trim();
    var post_content = $("#post-content").val().trim();

    console.log(post_username + " : " + post_category + " : " + post_title + " : " + post_content);

    if(post_category === "video games"){
        newPostRef = videoGamesPostsRef + "/" + post_title;
        console.log("newPostRef: " + newPostRef);

        database.ref(newPostRef).set({
            postTitle: post_title,
            postUsername: post_username,
            postCategory: post_category,
            postContent: post_content
        })
    }
    
    createNewPost();
}

//This function creates the UI Post Elements
function createNewPost(){
    var newPost_Username = "";
    var newPost_Category = "";
    var newPost_Title = "";
    var newPost_Content = "";

    database.ref(videoGamesPostsRef).on("child_added", function(data) {
        console.log(data.val());

        newPost_Username = data.val().postUsername;
        newPost_Category = data.val().postCategory;
        newPost_Title= data.val().postTitle;
        newPost_Content = data.val().postContent;
      });

      var newPost = $("<div class='card indigo darken-1'>" +
      "<div class='card-content white-text'>" +
        "<div class='card-header'>" +
          "<a href='#'><span>" + newPost_Username + "</span></a></br>" +
          "<a href='#'><span>" + newPost_Category + "</span></a>" +
          "<hr>" +
        "</div>" +
        "<span class='card-title'>" +
          "<h5 class='center-align'>" + newPost_Title + "</h5>" +
        "</span>" +
        "<p>" + newPost_Content +
        "</p>" +
      "</div>" +
      "<div class='card-action'>" +
        "<span class='num-favories'>32</span> &nbsp; <a href='#'><i class='tiny material-icons'>favorite" +
          "</i></a>" +
        "<a href='#' class='reply'>Reply </a>" +
        "<a href='#' class='view-replies'>View Replies </a>" +
      "</div>" +
    "</div>"
    );

    $("#mainContent").append(newPost);
  
}