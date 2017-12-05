var request = require('request');
var token = require('./secrets.js');


console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url : 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    json: true,
    headers: {
      'User-agent': 'request',
      'Authorization': 'token ' + token.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
  //  var obj = JSON.parse(body);
    cb(err,body);
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  if (err) {
    console.log('Error: ', err);
  }

  for (i in result) {
    console.log('avatar_url: ' + result[i]['avatar_url']);
  }

});