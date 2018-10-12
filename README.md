# API-fun

Deployed Link: [API-fun](https://vwhope.github.io/API-fun/)

### Fun example of using APIs, AJAX and JSON

**Problems to Solve**
* Access and display Disney movie images from an external resource
* Provide additional data related to each Disney movie image
* Allow user to input their own movie title and display movie images
* Allow user to click displayed images to toggle between static and animated images

**Solution**

Using the AJAX GET request with two different, but related APIs (OMDb and GIPHY),
it is possible to retrieve the Disney movie image from GIPHY and the additional data about that movie from OMDb. The movie name is the common link between the two APIs and the API responses are both in JSON format.

By pushing the user's movie title to the existing movie array the user's movie button is created and movie images and data retrieved.

When retrieving the images from the API, both static and animated URLs of the image are stored. Using a combination of on-click events and data- attributes for the image, it is possible to toggle between the static and animated versions.


**Technical skills demonstrated in project:**
* use of two APIs to retrieve data from specific URLs 
    * GIPHY api - to retrieve gif images (static and animated)
    * OMDb api - to retrieve additional movie information
* application of JavaScript language
* application of CSS and reset files
* manipulation of the HTML page using the jQuery library
* responsive web design using media queries
* dynamically creating new buttons based on user input by pushing movie to array
* toggling between static and animated images using URL data from the GIPHY api


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
* Additional movie data (year-released, short plot, awards) from [OMDb](http://www.omdbapi.com)
