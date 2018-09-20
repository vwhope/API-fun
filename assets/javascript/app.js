// API-fun using API, AJAX, and JSON 
//
// The purpose of this code is to:
//    gain experience using an API, in this case the GIPHY API
//    use AJAX GET() method to request data using the API
//    once data is received in the JSON data format, access data needed for project
//
// lessons learned with this example
// 1. 
//

// ================================ BEGIN GLOBAL VARIABLE DEFINITIONS =======================================================
// set GLOBAL variables available to all functions - (generally don't want global- is better to make an encapsulated object)


// create an array of items to be used for the button labels
// TOPICS for this example are titles of Disney Movies
var topics = ["Snow White", "Pinocchio", "Fantasia", "Dumbo", "Bambi", "Cinderella", 
"Alice in Wonderland", "Peter Pan", "Lady and the Tramp", "Sleeping Beauty",
"Pollyanna", "101 Dalmations", "The Parent Trap", "The Sword and the Stone", 
"Jungle Book", "The Love Bug", "The Aristocats", "Robin Hood", "The Fox and the Hound",
"The Great Mouse Detective"
];


// ================================ END GLOBAL VARIABLE DEFINITIONS =========================================================

// ================================ BEGIN FUNCTION DEFINITIONS  =============================================================
//
// this function removes all buttons, then creates a new button for each movie in topics array
function recreateBtns() {
    
    // clear out all buttons first
    $('#button-list-area').empty();
    
    // create a button, with movie label for every element in the topics array, update DOM
    for (var i = 0; i < topics.length; i++) {
        var newBtn = $('<button>');
        newBtn.addClass('movieBtn');
        newBtn.attr("data-name", topics[i]);
        newBtn.text(topics[i]);
        $('#button-list-area').append(newBtn);
    }
}

// this function retrieves data using the GIPHY api
function getData() {

    // clear out all images first
    $('#GIF-display-area').empty();

    $('button').on('click', function() {
        var movieName = $(this).attr('data-name');

     // clear out all images first
     $('#GIF-display-area').empty();
    

    // test URL that I know works
    //var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=XU8hZWx5CLjtTMlTpZK8tmdwpevFJj18&q=snow white and the seven dwarfs&limit=10&offset=0&rating=G&lang=en"
    // URL to build, default response data format is json - but could add "&fmt=json" if wanted to be sure
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=XU8hZWx5CLjtTMlTpZK8tmdwpevFJj18&q=" +
    movieName + "&limit=10&offset=0&lang=en"
    
    // use AJAX request GET method to request data using queryURL string
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    
    // use "then" to wait until data request is complete before continuing
    .then(function(response) {
        // catch the data to be sure you have what you want
        console.log(queryURL);
        console.log(response);
        // store retrieved data in results variable    
        var results = response.data;
        
        // loop through each of result items to get specific data needed
        for (var i = 0; i < results.length; i++){
            
            // create/store div tag to hold both image and movie rating
            var imgRatingDiv = $('<div>');
            imgRatingDiv.attr('class', 'imgRating');
            
            // create/store image tag for movie 
            var movieImg = $('<img>');
            
            // investigate image options in response data
            movieImg.attr("src", results[i].images.fixed_height_small_still.url); 
            
            // create span tag to include rating retrieved from results
            var s = $('<span>').text('Movie Rating: ' + results[i].rating);
            s.attr('class', 'rating');
            
            // append the image and span tags to the imgRatingDiv
            imgRatingDiv.append(movieImg);
            imgRatingDiv.append(s);
            
            // add imgRatingDiv to beginning of "#GIF-display-area)"
            $('#GIF-display-area').prepend(imgRatingDiv);
        }
        
    });

    });
    
} // end getData function


// ================================ END FUNCTION DEFINITIONS  ===============================================================

// ================================ BEGIN GAME HERE =========================================================================
// HTML page loads FIRST, then this code runs 

$(document).ready(function() {
    
    recreateBtns();
    getData();
    
    
}); // end document.ready function


// ================================ END GAME ================================================================================
// my pseudo code for the game
// 1.  wait until doc is ready before running any JavaScript - document.ready() 
// 2.  create an array to hold list of topics for each button
// 3.  create HTML for locations of buttons, images, and  user input 
// 4.  upon execution of the index.html page, render the buttons with movie titles from the original array
// 5.  register on.click event to get data using the GIPHY API (10 static gifs for any .movieBtn clicked)
// 5a. build request URL including search terms, API key, limit of gifs to return
// 5b. use AJAX get() method to retrieve the response data
// 5c. interpret response data, determine data needed, save to temp variable for output to html page
// 6.  register on.click event to toggle on/off animation for each gif retrieved
// 7.  under each gif retrieved, show the movie rating for that gif
// 8.  allow user input of movie title
// 9.  create new button for the user's movie title
// 10. add functionality to that new button to retrieve movie gifs