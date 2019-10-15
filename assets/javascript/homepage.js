$( document ).ready(function() {
    $(".dropdown-trigger").dropdown();
})

$("#makeAPost-btn").on("click", function(){
    console.log ("post btn clicked");
    $("#createAPost-Modal").modal();
})