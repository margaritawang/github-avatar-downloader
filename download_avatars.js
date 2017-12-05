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

  console.log(result);
  for (i in result) {
    var url = result[i]['avatar_url'];
    var filePath = './avatars/' + result[i]['login'] + '.jpg';
    downloadImageByURL(url, filePath);
  }

});

function downloadImageByURL(url, filePath) {
  var fs = require('fs');

  request.get(url)
    .on('error', function (err) {
      throw err;
    })
    .pipe(fs.createWriteStream(filePath));
}