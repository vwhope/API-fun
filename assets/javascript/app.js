// API-fun using API, AJAX, and JSON 
//
// The purpose of this code is to:
//    gain experience using an API, in this case the GIPHY API
//    use AJAX GET() method to request data using the API
//    once data is received in the JSON data format, access response data needed for project
//
// lessons learned with this example
// 1. use of the event.preventDefault() method
// 2. difference between event.stopPropogation() and .preventDefault()
// 3, pushing new elements into an array dynamically
// 4. importance and implementation of of error checking 
//

// ================================ BEGIN GLOBAL VARIABLE DEFINITIONS =======================================================
// set GLOBAL variables available to all functions - (generally don't want global- is better to make an encapsulated object)


// create an array of items to be used for the button labels
// TOPICS for this example are titles of Disney Movies
var topicsArr = ['Snow White', 'Pinocchio', 'Fantasia', 'Dumbo', 'Bambi', 'Cinderella', 
'Alice in Wonderland', 'Peter Pan', 'Lady and the Tramp', 'Sleeping Beauty',
'Pollyanna', '101 Dalmations', 'The Parent Trap', 'The Sword and the Stone', 
'Jungle Book', 'The Love Bug', 'The Aristocats', 'Robin Hood', 'The Fox and the Hound',
'The Great Mouse Detective'
];

var userMovieName = '';
// ================================ END GLOBAL VARIABLE DEFINITIONS =========================================================

// ================================ BEGIN FUNCTION DEFINITIONS  =============================================================
//
// this function removes all buttons, then creates a new button for each movie in topics array
function recreateBtns() {
    
    // clear out all buttons first
    $('#button-list-area').empty();
    
    // create a button, with movie label for every element in the topics array, update DOM
    for (var i = 0; i < topicsArr.length; i++) {
        var newBtn = $('<button>');
        newBtn.addClass('movieBtn');
        newBtn.attr('data-name', topicsArr[i]);
        newBtn.text(topicsArr[i]);
        $('#button-list-area').append(newBtn);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// this function retrieves data using the GIPHY api
function getData(movieName) {
    
    // clear out placeholder images first 
    $('#GIF-display-area').empty();
    
    // clear out placeholder text in more-movie-info text areas
    $('.movie-data').empty();
    
    // register on click for movie button
    //  $('.movieBtn').on('click', function(event) {
    //      event.preventDefault();
    // 
    //     var movieName = $(this).attr('data-name');
    
    // be sure to retrieve something Disney related
    //    movieName = movieName + '+Disney';
    
    // clear out all images first
    $('#GIF-display-area').empty();
    
    console.log('getData:' + movieName);
    
    // test URL that I know works
    //var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=XU8hZWx5CLjtTMlTpZK8tmdwpevFJj18&q=snow white and the seven dwarfs&limit=10&offset=0&rating=G&lang=en'
    // URL to build, default response data format is json - but could add '&fmt=json' if wanted to be sure
    var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=XU8hZWx5CLjtTMlTpZK8tmdwpevFJj18&q=' +
    movieName + '&limit=10&offset=0&lang=en';
    
    // use AJAX request GET method to request data using queryURL string
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    
    // use 'then' to wait until data request is complete before continuing
    .then(function(response) {
        // catch the data to be sure you have what you want
        console.log(queryURL);
        console.log(response);
        
        
        // store retrieved data in results variable    
        var results = response.data;
        
        // loop through results, get data needed (still and active img URL and movie rating)
        for (var i = 0; i < results.length; i++){
            
            // create/store div tag to hold both image and movie rating
            // FYI: jQuery creates both the beg and end tag element with the one variable
            // this puts both the image and the rating within the same div tag 
            var imgRatingDiv = $('<div>');
            imgRatingDiv.attr('class', 'imgRating');
            
            // create/store image tag for movie 
            var movieImg = $('<img>');
            
            // store two versions of the GIF (still, active) 
            var stillImgUrl = results[i].images.fixed_height_small_still.url;
            var activeImgUrl = results[i].images.fixed_height_small.url;
            
            // 1. set attributes related to the img source url so can toggle images
            // 2. give the giphy images a class so can work with all giphy images only
            movieImg.attr('src', stillImgUrl);
            movieImg.attr('data-active', activeImgUrl);
            movieImg.attr('data-still', stillImgUrl);
            movieImg.attr('class', 'giphyImg');
            
            // can remove after testing
            console.log(movieImg);
            
            // create span tag to include movie rating retrieved from results
            var movieRating = $('<span>').text('Rated: ' + results[i].rating.toUpperCase());
            movieRating.attr('class', 'rating');
            
            // append the constructed img and span tags to the imgRatingDiv
            imgRatingDiv.append(movieImg);
            imgRatingDiv.append(movieRating);
            
            // add imgRatingDiv to beginning of '#GIF-display-area)'
            $('#GIF-display-area').prepend(imgRatingDiv);
        }
        
        // ?? I think this is the correct location to turn on/off the animation for gifs
        // however, issue is I have to click TWICE on the image the FIRST time to get it to animate??
        // after the first time clicking twice on any image, it toggles correctly with single click
        $('.giphyImg').on('click', function() {
            // jQuery attr() method can GET or SET the value of any HTML elemnent 
            var state = $(this).attr('data-state');
            
            // If the clicked image's state is still, update its src attribute to its data-active value
            // Then, set the image's data-state to active
            // Else set src to the data-still value
            if (state === 'still') {
                $(this).attr('src', $(this).attr('data-active'));
                $(this).attr('data-state', 'active');
            } else {
                $(this).attr('src', $(this).attr('data-still'));
                $(this).attr('data-state', 'still');
            }
        }); // end FOR loop
        
        // BEGIN OMDb API request
        // clear out any previous extra movie data
        $('.movie-data').empty();
        
        // here we have to remove the '+Disney' string from movieName before we can search movie database using the OMDb api
        var extractMovie = movieName.replace('+Disney', '' );
        movieName = extractMovie;
        
        // dft plot is 'short', dft data type is 'JSON' so don't need to specify '&fmt=json' in URL string
        
        var queryURL2 = 'https://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&apikey=bfadd55b';
        
        // use AJAX request GET method to request data using queryURL string
        $.ajax({
            url: queryURL2,
            method: 'GET'
        })
        
        // use 'then' to wait until data request is complete before continuing
        .then(function(response) {
            // catch the data to be sure you have what you want
            console.log(queryURL2);
            console.log(response);
            
            // if I wanted to save this information to local storage I could do that here - but I don't need to 
            // localStorage.setItem('saveJSON', myJSON);
            
            // console.log('year: ' + response.Year);
            
            // update html with the data from OMDb api JSON object
            
            $('#year-released').text(response.Year);
            $('#short-plot').text(response.Plot);
            $('#movie-awards').text(response.Awards);  
            
        }) // end .then function for OMDb api
        
        // catch errors after OMBDb api ajax call
        .fail(function (error) {
            console.log('ERROR', error);
        }); // end .catch  
        
    })  // end .then function for GIPHY api ajax call
    
    // catch errors after GIPHY api ajax call
    .fail(function (error) {
        console.log('ERROR', error);
    }); // end .catch      
    
    // END OMDb api section to get extra movie data
    // })  //end on-click   
    
} // end getData function

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getUserMovie(userMovieName) {
    
    //    $('#submit-btn').on('click', function(event) {
    //        event.preventDefault();
    
    //        userMovieName = $('#movie-input').val().trim();
    //        console.log(userMovieName);
    
    // no duplicate values yet
    var dupMovie = false;
    $('#status-msg').text('');
    // check movie name for duplicates before adding to array
    for (var i = 0; i < topicsArr.length; i++) {
        //found a duplicate
        if (topicsArr[i].toLowerCase() === userMovieName.toLowerCase()) {
            console.log(topicsArr[i].toLowerCase());
            console.log(userMovieName.toLowerCase());
            $('#status-msg').text('*duplicate entry, try another movie');
            dupMovie = true;
            // reset user input field to blanks
            $('input[name=user-movie-name').val('');
            // clear out all images first
            $('#GIF-display-area').empty();
            $('.movie-data').empty();
            
        } 
    } // end for loop
    // no dups found so add movieName to topicsArr
    if (dupMovie === false) {
        // add user movie name to array
        topicsArr.push(userMovieName);
        // recreate all buttons based on updated array content
        recreateBtns();
        // reset user input field to blanks
        $('input[name=user-movie-name').val('');
        // get movie data
        getData(userMovieName);
    }
    
    //   }); // end submit-btn
    
} // end getUserMovie() function



// GET data using OMDb API for extra movie information (year, short plot, awards)
function getExtra() {
    // clear out any previous extra movie data
    $('.movie-data').empty();
    // temporarily force a movie title - need to fix movieName
    var movieName = 'Bambi';
    console.log('getExtra:' + movieName);
    
    // test URL that I know works
    // dft plot is 'short', dft type is 'JSON' so don't need to specify in URL string
    //var queryURL2 = 'http://www.omdbapi.com/?apikey=bfadd55b&t=bambi'
    // URL to build, default response data format is json - but could add '&fmt=json' if wanted to be sure
    
    var queryURL2 = 'https://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&apikey=bfadd55b';
    
    // use AJAX request GET method to request data using queryURL string
    $.ajax({
        url: queryURL2,
        method: 'GET'
    })
    
    // use 'then' to wait until data request is complete before continuing
    .then(function(response2) {
        // catch the data to be sure you have what you want
        console.log(queryURL2);
        console.log(response2);
        
        
        // store retrieved data in results variable    
        var results2 = response2.data;
        
        // // loop through results, get data needed (still and active img URL and movie rating)
        // for (var i = 0; i < results2.length; i++){
        
        $('#year-released').text(results2.Year);
        $('#short-plot').text(results2.Plot);
        $('#movie-awards').text(results2.Awards);    
    })  //  end .then function
    
    // catch errors on AJAX call using the OMDb api 
    .fail(function (error) {
        console.log('ERROR', error);
    })
    
} // end getExtra function

// ================================ END FUNCTION DEFINITIONS  ===============================================================

// ================================ BEGIN GAME HERE =========================================================================
// HTML page loads FIRST, then this code runs 

$(document).ready(function() {
    
    recreateBtns();
    
    // register on click for movie button
    $('.movieBtn').on('click', function(event) {
        event.preventDefault();
        // 
        var movieName = $(this).attr('data-name');
        
        // be sure to retrieve something Disney related
        movieName = movieName + '+Disney';
        getData(movieName);
    });
    
    $('#submit-btn').on('click', function(event) {
        event.preventDefault();
        
        userMovieName = $('#movie-input').val().trim();
        console.log(userMovieName);
        getUserMovie(userMovieName);
    });
    
    
}); // end document.ready function


// ================================ END GAME ================================================================================
// my pseudo code for the game
// 1.  wait until doc is ready before running any JavaScript - document.ready() 
// 2.  create an array to hold list of topics for each button
// 3.  create HTML for locations of buttons, images, and  user input, test layout, to be sure it behaves at intended
// 4.  upon execution of the index.html page, render the buttons with movie titles from the original array
// 5.  register on.click event to get data using the GIPHY API (10 static gifs for any .movieBtn clicked)
// 5a.   build request URL including search terms, API key, limit of gifs to return
// 5b.   use AJAX get() method to retrieve the response data
// 5c.   interpret response data, determine data needed, save to temp variable for output to html page
// 6.  register on.click event to toggle on/off animation for each gif retrieved
// 6a.   you must retrieve both static and animated versions of the url for each image, store in a variable
// 7.  under each gif retrieved, show the movie rating for that gif
// 8.  allow user input of movie title
// 9.  create new button for the user's movie title
// 10. add functionality to that new button to retrieve movie gifs