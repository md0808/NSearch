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

//these vars are for adding new posts to a specific place
var postRef = "/posts";
var booksPostsRef = "/posts/books";
var moviesPostsRef = "/posts/movies";
var musicPostsRef = "/posts/music";
var videoGamesPostsRef = "/posts/videogames";

$(document).ready(function() {
  $(".dropdown-trigger").dropdown();
});

$(document).ready(function() {
  $("select").formSelect();
});

$(document).ready(function() {
  $(".tooltipped").tooltip();
});

//Music
database.ref(musicPostsRef).on("child_added", function(data) {
  showPostUI(data, postID);
});

//Video Games
database.ref(videoGamesPostsRef).on("child_added", function(data) {
  showPostUI(data, postID);
});

//Movies
database.ref(moviesPostsRef).on("child_added", function(data) {
  showPostUI(data, postID);
});
//Books
database.ref(booksPostsRef).on("child_added", function(data) {
  showPostUI(data, postID);
});

//Create new post modal shows
$("#makeAPost-btn").on("click", function() {
  $("#createAPost-modal").modal();
});

$(".reply-modal-btn").on("click", function() {
  $("#reply-modal").modal();
});

//this is the function the pushes the post info the the correct db category
function pushPostToDatabase() {
  //var newPostRef = "";

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

  database.ref(newPostRef).set({
    postTitle: post_title,
    postUsername: post_username,
    postCategory: post_category,
    postContent: post_content
  });

  createNewPost(postID);
}

//This function creates the UI Post Elements
function createNewPost(postID) {
  var newPost_Username = "";
  var newPost_Category = "";
  var newPost_Title = "";
  var newPost_Content = "";

  console.log("create new post function called");
}

function showPostUI(data, postID) {
  newPost_Username = data.val().postUsername;
  newPost_Category = data.val().postCategory;
  newPost_Title = data.val().postTitle;
  newPost_Content = data.val().postContent;

  var newPost = $(
    "<div class='card indigo darken-1'>" +
      "<div class='card-content white-text'>" +
      "<div data-id='" +
      postID +
      "'class='card-header'>" +
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
      "<span class='num-favories'>32</span> &nbsp; <a href='#'><i class='tiny material-icons'>favorite" +
      "</i></a>" +
      "<a href='#' class='reply'>Reply </a>" +
      "<a href='#' class='view-replies'>View Replies </a>" +
      "</div>" +
      "</div>"
  );

  $("#mainContent").prepend(newPost);
}

function musicSort() {
  // sort through firebase for music category posts / list
  var query = firebase.database().ref("/posts/music");

  query.once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
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
  $("#mainContent").empty();
  musicSort();
});
