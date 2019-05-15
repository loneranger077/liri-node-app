require("dotenv").config();

var axios = require("axios");

var keys = require("./keys.js"); 
var moment = require('moment');
moment().format();
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var fs = require('fs');

const command = process.argv[2];
var track = "";

if (command === "concert-this") {

    var artist = process.argv[3];
    const URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(URL).then(function(res) {
        data = res;
        for (i=0; i<res.data.length; i++) {
            console.log("Venue: " + res.data[i].venue.name);
            console.log("City: " + res.data[i].venue.city);
            rawDate = res.data[i].datetime;
            date = rawDate[5] + rawDate[6] + "/" + rawDate[8] + rawDate[9] + "/" + rawDate[0] + rawDate[1] + rawDate[2] + rawDate[3];
            console.log("Date: " + date);
            console.log("");
        };
});
}

else if (command === "spotify-this-song") {

    track = process.argv[3];
    if (track == undefined) {
        track = "The Sign";
    };
    spotifyIt();

}

else if (command === "movie-this") {
    const movie = process.argv[3];
    if (movie == undefined) {
        movie = "Mr. Nobody";
    };
    var URL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    axios.get(URL).then(function(res) {
        
        console.log("Release Year: " + res.data.Year);
        console.log("Title: " + res.data.Title);
        console.log("IMDB Rating: " + res.data.imdbRating);
        console.log("Rotten Tomatoes Rating: " + res.data.Ratings[1].Value);
        console.log("Country of origin: " + res.data.Country);
        console.log("Language: " + res.data.Language);
        console.log("Plot Summary: " + res.data.Plot);
        console.log("Cast: " + res.data.Actors);
  })

}

else if (command === "do-what-it-says") {
    fs.readFile('random.txt', "utf8", function(err, data) {
        track = data;
        spotifyIt();
    });
}

function spotifyIt() {

    spotify.search({ type: 'track', query: track }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log("Track Name: " + data.tracks.items[1].name); 
      console.log("Artist: " + data.tracks.items[1].artists[0].name);
      console.log("Album: " + data.tracks.items[1].album.name);
      console.log("Preview URL: " + `<a url="${data.tracks.items[1].preview_url}"></a>`);
      });
}