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
firebase.analytics();

var database = firebase.database();

var postID = "";
var getPostID = "";
var getPostCategory = "";

//these vars are for adding new posts to a specific place
var postRef = "/posts";
var booksPostsRef = "/posts/books";
var moviesPostsRef = "/posts/movies";
var musicPostsRef = "/posts/music";
var videoGamesPostsRef = "/posts/videogames";

var areCommentsShowing = false;

//Materialize========================================
$(document).ready(function () {
  $(".dropdown-trigger").dropdown();
});

$(document).ready(function () {
  $("select").formSelect();
});

$(document).ready(function () {
  $(".tooltipped").tooltip();
});

$(".brand-logo").on("click", function () {
  location.reload();
});

$(".modal").modal();

//Create new post modal shows
$("#makeAPost-btn").on("click", function() {
  $("#createAPost-modal").modal("open");
});

$("#push-to-database").on("click", function() {
  $("#post-username").val("");
  $("#post-title").val("");
  $("#post-content").val("");
});

//=====================================================

//Music
database.ref(musicPostsRef).on("child_added", function (data) {
  showPostUI(data);
});

//Video Games
database.ref(videoGamesPostsRef).on("child_added", function (data) {
  showPostUI(data);
});

//Movies
database.ref(moviesPostsRef).on("child_added", function (data) {
  showPostUI(data);
});
//Books
database.ref(booksPostsRef).on("child_added", function (data) {
  showPostUI(data);
});

//this is the function the pushes the post info the the correct db category
function pushPostToDatabase() {
  var post_username = $("#post-username")
    .val()
    .trim();
  //this is only because the dropdown on the modal isn't working
  var post_category = $("#post-category")
    .val()
    .trim();
  var post_title = $("#post-title")
    .val()
    .trim();
  var post_content = $("#post-content")
    .val()
    .trim();

  var newPostRef = "";

  if (post_category === "Music") {
    postID = database
      .ref(musicPostsRef)
      .push()
      .getKey();
    newPostRef = musicPostsRef + "/" + postID;
  } else if (post_category === "Books") {
    postID = database
      .ref(musicPostsRef)
      .push()
      .getKey();
    newPostRef = booksPostsRef + "/" + postID;
  } else if (post_category === "Movies") {
    postID = database
      .ref(musicPostsRef)
      .push()
      .getKey();
    newPostRef = moviesPostsRef + "/" + postID;
  } else if (post_category === "Video Games") {
    postID = database
      .ref(musicPostsRef)
      .push()
      .getKey();
    newPostRef = videoGamesPostsRef + "/" + postID;
  }

  var commentsRef = newPostRef + "/comments";

  var likesRef = newPostRef + "/likes";

  //post info is getting set here
  database.ref(newPostRef).set({
    postTitle: post_title,
    postUsername: post_username,
    postCategory: post_category,
    postContent: post_content,
    postid: postID
  });

  //post comments are getting set here
  database.ref(commentsRef).set({
    allComments: ""
  });

  database.ref(likesRef).set({
    numLikes: 0
  })
}


function showPostUI(data) {
  var newPost_Username = data.val().postUsername;
  var newPost_Category = data.val().postCategory;
  var newPost_Title = data.val().postTitle;
  var newPost_Content = data.val().postContent;
  var newPost_ID = data.val().postid;

  var onclickFunction = "$('#postReply-modal').modal('open');";

  var newPost = $(
    "<div class='card indigo darken-1'>" +
      "<div class='card-content white-text'>" +
        "<div class='card-header'>" +
          "<a href='#'><span>" +
            newPost_Username +
          "</span></a></br>" +
          "<a href='#'><span>" +
            newPost_Category +
          "</span></a>" +
          "<hr>" +
        "</div>" +
      "<span class='card-title'>" +
      "<h5 class='center-align'>" +
        newPost_Title +
      "</h5>" +
      "</span>" +
      "<p>" +
        newPost_Content +
      "</p>" +
      "</div>" +
    "<div class='card-action'>" +
    "<span class='num-favories' id='num-likes-span" + newPost_ID + "'>0</span> &nbsp; <a href='#'><i id='like-button-" + newPost_ID + "' data-postID='" + newPost_ID +  "' data-postCategory ='" + newPost_Category + "' class='tiny material-icons'>favorite" +
    "</i></a>" +
    "<a id='reply-modal-btn' class='reply-modal-btn' href='#postReply-modal' data-postID='" + newPost_ID + "' data-postCategory='" + newPost_Category + "'>Comment</a>" +
    "<a href='#' id='view-reply-btn' class='view-replies' data-postID='" + newPost_ID + "' data-postCategory='" + newPost_Category + "'>View Comments </a>" +
    "</div>" +
    "<div class='comments-div' id='comments-" + newPost_ID + "'>" +
    "<p>dfsd</p>" +
    "</div>" +
    "</div>"
  );

  if (newPost_Category === "Movies") {
    $("#movies-activity-div").prepend(newPost);
    $("#mainContent").prepend(newPost);
  } else if (newPost_Category === "Books") {
    $("#books-activity-div").prepend(newPost);
    $("#mainContent").prepend(newPost);
  } else if (newPost_Category === "Music") {
    $("#music-activity-div").prepend(newPost);
    $("#mainContent").prepend(newPost);
  } else if (newPost_Category === "Video Games") {
    $("#videogames-activity-div").prepend(newPost);
    $("#mainContent").prepend(newPost);
  } else $("#mainContent").prepend(newPost);

  $(".reply-modal-btn").attr("onclick", onclickFunction);

  $("#reply-modal-btn").on("click", function () {
    getPostID = $(this).attr("data-postid");
    getPostCategory = $(this).attr("data-postCategory");
  });


  $("#view-reply-btn").on("click", function () {

    if (areCommentsShowing == false){
      getPostID = $(this).attr("data-postid");
      getPostCategory = $(this).attr("data-postCategory");
      $("#comments-" + getPostID).show();
      showComments();
      $("#view-reply-btn").text("Hide Comments");
      areCommentsShowing = true;

    }
    else {
      areCommentsShowing = false;
      console.log("else statement")
      $("#view-reply-btn").text("View Comments");
      $("#comments-" + getPostID).hide();
      $("#comments-" + getPostID).text("")
    }
    
  });

  $("#like-button-" + newPost_ID).on("click", function(){
    console.log("heart heart")
    getPostID =$(this).attr("data-postid");
    getPostCategory= $(this).attr("data-postCategory");
    addLike();

  })
}

function addLike() {

  var newPostCategory = getPostCategory.toLowerCase();
  newPostCategory = newPostCategory.replace(/\s/g, '');

  var newLikeRef = "/posts/" + newPostCategory + "/" + getPostID + "/likes";
  var numberLikes = 0;
  database.ref(newLikeRef).on("value", function(data) {
    numberLikes = data.val().numLikes;
  })
  numberLikes++
  database.ref(newLikeRef).set({
    numLikes: numberLikes
  });
 
  $("#num-likes-span" + getPostID).text(numberLikes);
  console.log("#num-likes-span" + getPostID);

}


function createNewComment() {
  console.log("create a comment on: " + getPostID);

  var comment_username = $("#comment-username").val().trim();
  var comment = $("#comment-content").val().trim();

  var postCategory = getPostCategory.toLowerCase();

  var get_allComments = "";
  var newComment = "{" + comment_username + ": " + comment + "},";
  console.log(newComment);

  postCategory = postCategory.replace(/\s/g, '');
  var postCommentRef = "/posts/" + postCategory + "/" + getPostID + "/" + "comments";

  database.ref(postCommentRef).on("value", function(data) {
    get_allComments = data.val().allComments
  });

  database.ref(postCommentRef).set({
    allComments: get_allComments + newComment
  })
}

function showComments(){
  var newPostCategory = getPostCategory.toLowerCase();
  newPostCategory = newPostCategory.replace(/\s/g, '');

  var newPostRef = "/posts/" + newPostCategory + "/" + getPostID + "/comments";

  var postComments = "";
  var seperatedComments = [];

  database.ref(newPostRef).on("value", function(data){
    postComments = data.val().allComments;
    $("#comments-" + getPostID).text("")


    seperatedComments = postComments.split(',');

    for(var i = 0; i < seperatedComments.length; i++){
      if(seperatedComments[i] !== ""){ 
        var newComment = $("<h5>" +seperatedComments[i].replace(/[{()}]/g, '') + "</h5>")
        $("#comments-" + getPostID).append(newComment);

      }
    }

  })
}

function musicSort() {
  // sort through firebase for music category posts / list
  var query = firebase.database().ref("/posts/music");

  query.once("value").then(function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      // title of each instance of music
      var key = childSnapshot.key;
      console.log(key);

      // data within each instance
      var childData = childSnapshot;
      console.log(childData.val());

      showPostUI(childData, key);
    });
  });
}
  
$(".music-button").click(function() {
  $("#mainContent").hide();
  $("#music-activity-div").show();
  $("#category-name").text("Music");
  console.log("Music button pushed.");

  musicSort();
});

function videogamesSort() {
  // sort through firebase for books category posts / list
  var query = firebase.database().ref("/posts/videogames");

  query.once("value").then(function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      // title of each instance of books
      var key = childSnapshot.key;
      console.log(key);

      // data within each instance
      var childData = childSnapshot;
      console.log(childData.val());

      showPostUI(childData, key);
    });
  });
}

$(".videogames-button").click(function() {
  $("#mainContent").hide();
  $("#videogames-activity-div").show();
  $("#category-name").text("Video Games");
  console.log("video games button pushed.");
  videogamesSort();
});

function moviesSort() {
  // sort through firebase for movies category posts / list
  var query = firebase.database().ref("/posts/movies");
  query.once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      // title of each instance of movies
      var key = childSnapshot.key;
      console.log(key);

      // data within each instance
      var childData = childSnapshot;
      console.log(childData.val());

      showPostUI(childData, key);
    });
  });
}

$(".movies-button").click(function() {
  $("#mainContent").hide();
  $("#movies-activity-div").show();
  console.log("movies button pushed.");
  $("#category-name").text("Movies");
  moviesSort();
});

// javascript for materialize api button
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.fixed-action-btn');
  var instances = M.FloatingActionButton.init(elems, {
    direction: 'left'
  });
});
