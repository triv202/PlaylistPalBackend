/**
 * This is an example of a basic node.js script that performs
 * the Client Credentials oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 */
import express from 'express'
const app = express();
var cors = require('cors');

app.use(cors());

app.get('/api/auth', function(req, res) {
  var request = require('request'); // "Request" library

  var client_id = 'b75ef94842bd4627bac222de4d935037'; // Your client id
  var client_secret = '89b98ac03aa54f5899e9dfd2ec7413d7'; // Your secret

// your application requests authorization
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log(body.access_token);
      res.end(JSON.stringify(body));
    }
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});
