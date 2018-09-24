# API-fun
### Fun example of using APIs, AJAX and JSON

#### Using GIPHY api to find Disney movie gifs
#### Using OMDb api to add additional movie information

**Skills demonstrated in project:**
* use of two APIs to retrieve data from specific URLs 
    * GIPHY api - to retrieve gif images (static and animated)
    * OMDb api - to retrieve additional movie information
* application of JavaScript language
* application of CSS and reset files
* manipulation of the HTML page using the jQuery library
* responsive web design
* dynamically creating new buttons based on user input
* toggling between static and animated images using URL data from the GIPHY api
    
**Goals of program:**
* to create buttons based on data in an array
* to create buttons based on user input
* to retrieve data using AJAX and the GIPPHY and OMBDb apis
* switch between static and animated versions of the gif based on user click

**To play game:**
* open the index.html file in the browser
* click any existing button to see 10 static gifs related to the movie on that button
    *  if available, additional movie informaton is also displayed
        * year-released
        * short plot
        * awards
* click on any image to change image from static to animated
* click on same image again to change from animated back to static
* type a new Disney movie name into the input field titled "Add a Disney Movie Title"
* click the "Submit" button to create a new button
* once new button is created, click the new button to see 10 static gifs related to that movie
* if user enters a movie name that already exists, a message will display in red:
  * "duplicate entry, try another movie"
* Refresh the page to display only buttons from the original array, clearing the user-created buttons

**Resource Contributors:**
* Both static and animated gifs from [GIPHY](https://giphy.com/)
* Additional movie data (Year, short plot, awards) from [OMDb](http://www.omdbapi.com)
