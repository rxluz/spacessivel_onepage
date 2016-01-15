var medium = require('medium-sdk')

var client = new medium.MediumClient({
  clientId: 'd732a61bde04',
  clientSecret: '99b0e4e59fab8391ca81654c21d54da50f0864ed'
})

var url = client.getAuthorizationUrl('secretState', 'http://splanding.heroku.com', [
  medium.Scope.BASIC_PROFILE, medium.Scope.listPublications, medium.Scope.PUBLISH_POST
])

// (Send the user to the authorization URL to obtain an authorization code.)

client.ExchangeAuthorizationCode('YOUR_AUTHORIZATION_CODE', function (err, token) {
  client.getUser(function (err, user) {
    client.createPost({
      userId: user.id,
      title: 'A new post',
      contentFormat: medium.PostContentFormat.HTML,
      content: '<h1>A New Post</h1><p>This is my new post.</p>',
      publishStatus: medium.PostPublishStatus.DRAFT
    }, function (err, post) {
      console.log(token, user, post)
    })
  })
});

//console.log("hello medium file");
