require('dotenv').config()

const readline = require('readline')

var SpotifyWebApi = require('spotify-web-api-node')

var scopes = ['user-read-recently-played', 'user-top-read', 'user-read-playback-position', 'user-read-playback-state', 'user-library-read', 'playlist-read-private', 'playlist-read-collaborative'],
	state = 'login'

var spotifyApi = new SpotifyWebApi({
	clientId: process.env.SPOTIFY_CLIENT_ID,
	clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
	redirectUri: process.env.SPOTIFY_REDIRECT_URI
})

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
console.log('To login with your Spotify account, you have to open the following URL in a web browser:\n')
var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
console.log(authorizeURL);
console.log()
console.log("Then, after granting the permissions and logging in, paste the URl you've been redirected to here:\n")
rl.question('URL: ', (url) => {
    let urlcode = new URL(url)
    console.log()
    spotifyApi.authorizationCodeGrant(urlcode.searchParams.get('code')).then(
        function(data) {
            console.log(`Paste this after REFRESH_TOKEN in the .env file:\n${data.body['refresh_token']}`);
        },
        function(err) {
            console.log('Something went wrong!', err);
        }
    );
    
    rl.close();
});