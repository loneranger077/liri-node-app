require("dotenv").config();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

const command = process.argv[2];

if (command === "concert-this") {

    const artist = process.argv[3];
    const URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    $.ajax({
        url: URL,
        method: "GET"
      }).then(function(response) {
          
}

else if (command === "spotify-this-song") {

}

else if (command === "movie-this") {

}

else if (command === "do-what-it-says") {

}