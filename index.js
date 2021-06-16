require('dotenv').config()
var loki = require('lokijs')
var db = new loki('spt.db')
var spt = db.addCollection('spt')
var SpotifyWebApi = require('spotify-web-api-node')

var spotifyApi = new SpotifyWebApi({
	clientId: process.env.SPOTIFY_CLIENT_ID,
	clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
	redirectUri: process.env.SPOTIFY_REDIRECT_URI
})

spotifyApi.setRefreshToken(process.env.REFRESH_TOKEN);
spotifyApi.refreshAccessToken().then(
	function(data) {
		console.log('The access token has been refreshed!');
  
		// Save the access token so that it's used in future calls
		spotifyApi.setAccessToken(data.body['access_token']);

		spotifyApi.getMySavedTracks()
		.then(function(data) {
			console.log(data.body.items);
		}, function(err) {
			console.log('Something went wrong!', err);
		});
	},
	function(err) {
		console.log('Could not refresh access token', err);
	}
);