require("dotenv").config();

const axios = require('axios');
var action = process.argv[2]
var query = process.argv[3]
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);




function findConcerts(artist){
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function(response){
            for (var i=0; i<response.data.length; i++){
            var date = response.data[i].datetime
            var newDate = date.split("")
            var formatted = newDate.slice(0,10).join("")
            console.log("---")  
            console.log(response.data[i].venue.name) 
            console.log(response.data[i].venue.city)  
            console.log(response.data[i].venue.country) 
            console.log(formatted) 
            console.log("---")  
            }
        })
}

function findMovie(movie){
    axios.get("http://www.omdbapi.com/?t=" + movie + "&apikey=trilogy")
    .then(function(response){
        // console.log(response)
        console.log(response.data.Title)
        console.log(response.data.Year)
        console.log(response.data.Rated)
        console.log(response.data.Ratings[1].Value)
        console.log(response.data.Country)
        console.log(response.data.Language)
        console.log(response.data.Plot)
        console.log(response.data.Actors)

    })
}

function findSong(song){
    if (!song){
        song = "The Sign by Ace of Base"
    }
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data.tracks.items[0].artists[0].name); 
      console.log(data.tracks.items[0].name); 
      console.log(data.tracks.items[0].album.external_urls.spotify); 
      console.log(data.tracks.items[0].album.name); 

      });
}

switch(action){
    case "concert-this": 
    findConcerts(query)  
    break
    case "movie-this":
    findMovie(query)
    break
    case "spotify-this-song":
    findSong(query)
}


