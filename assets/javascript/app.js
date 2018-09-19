// The purpose of this code is to:
//    gain experience using an API, in this case the GIPHY API
//    use AJAX GET() method to request data using the API
//    once data is recieved in the JSON data format, access data needed for project



// create an array of items to be used for the button labels
// TOPICS for this example are titles of Disney Movies
var topics = ["Snow White", "Pinocchio", "Fantasia", "Dumbo", "Bambi", "Cinderella", 
"Alice in Wonderland", "Peter Pan", "Lady and the Tramp", "Sleeping Beauty",
"Pollyanna", "101 Dalmations", "The Parent Trap", "The Sword and the Stone", 
"Jungle Book", "The Love Bug", "The Aristocats", "Robin Hood", "The Fox and the Hound",
"The Great Mouse Detective"
];

// create a button tag for every element in the topics array, update DOM
for (var i = 0; i < topics.length; i++) {
var btnLabel = topics[i];
console.log(btnLabel);
};


