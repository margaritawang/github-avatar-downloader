var fs = require('fs');
var request = require('request');
var token = require('./secrets.js');

var repoOwner = process.argv[2];
var repoName = process.argv[3];

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    json: true,
    headers: {
      'User-agent': 'request',
      'Authorization': 'token ' + token.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    cb(err, body);
  });
}

function downloadImageByURL(url, filePath) {

  request.get(url)
    .on('error', function (err) {
      throw err;
    })
    .pipe(fs.createWriteStream(filePath));
}


getRepoContributors(repoOwner, repoName, function(err, result) {
  if (err) {
    console.log('Error: ', err);
  }

  if (repoOwner === undefined || repoName === undefined) {
    console.log("Error: Please specify both arguments!");
    return false;
  }

  for (i in result) {
    var url = result[i]['avatar_url'];
    var filePath = './avatars/' + result[i]['login'] + '.jpg';
    downloadImageByURL(url, filePath);
  }

});
