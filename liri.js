//this allows us access to our keys
require("dotenv").config();
var keys = require("./keys.js");

//Grab command line instructions and set up switch statement
var command = process.argv[2].toLowerCase();

switch (command) {
  case "spotify-this-song":
    spotifyThis();
    break;

  case "movie-this":
    movieThis();
    break;

  case "do-what-it-says":
    //BEGINNING OF DO-WHAT-IT-SAYS COMMAND
    //uses fs to take what is inside of random.txt to call one of the commands
    //example of spotify this song I Want it That Way
    break;
  //END OF DO-WHAT-IT-SAYS

  case "concert-this":
    //BEGINNING OF CONCERT-THIS
    //access to moment to format date (MM/DD/YYYY) and keys
    //search BandsinTown API
    //display name of venue, venue location and date of event 
    break;
  //END OF CONCERT THIS

  default:
    console.log("Please input a valid instruction!");

}

//BEGINNING OF MOVIE-THIS
function movieThis() {

  //require axios to grab from API and grab users input
  var axios = require("axios");
  var movieName = process.argv.slice(3).join("+");

  //set default to "Mr. Nobody"
  if (movieName === "") {
    movieName = "mr nobody";
  }

  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=" + keys.omdb.id;

  //request info from omdb api
  axios.get(queryUrl).then(

    function (response) {
      //display title, year, imdb rating, rotten tomato rating, country, language, plot and actors
      console.log("This movie is titled: " + response.data.Title);
      console.log("This movie was released in: " + response.data.Year);
      console.log("This movie has an IMDB rating of: " + response.data.imdbRating);
      console.log("This movie has a Rotten Tomatoes rating of: " + response.data.Ratings[1].Value);
      console.log("This movie was produced in: " + response.data.Country);
      console.log("This movie is in: " + response.data.Language);
      console.log("The plot of this movie is: " + response.data.Plot);
      console.log("This movie features: " + response.data.Actors);
    })
    .catch(function (error) {
      console.log(error);
    });
}

//BEGINNGING SPOTIFY-THIS-SONG 
function spotifyThis () {

    //require spotify and access ids
    var Spotify = require('node-spotify-api');
    var spotifyThis = new Spotify(keys.spotify);
    //display artist, song name, preview link, the album
    var song = process.argv.slice(3).join(" ");

    //set default to "The Sign" by Ace of Base
    if (song === "") {
      song = "the sign ace of base";
    }

    spotifyThis.search({ type: 'track', query: song, limit: 1 }, function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      console.log(data.tracks.items[0])
      console.log("The artist is: " + data.tracks.items[0].album.artists[0].name);
      console.log("The song title is: " + data.tracks.items[0].name);
      console.log("The song comes from the album: "+ data.tracks.items[0].album.name);
      console.log("Listen to a preview!" + data.tracks.items[0].preview_url);
    });

}