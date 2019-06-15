// var FB = require('fb');
// FB.init({
//     appId      : '1623703764440807',
//     status     : true,
//     xfbml      : true,
//     version    : 'v2.7' // or v2.6, v2.5, v2.4, v2.3
//   });


//   var pageAccessToken = 'EAABwzLixnjYBAMZCAFsmFmnNJQ3nNR6AA5pA1yCBUZCqERZAXZBZBudHEXxZAry5wZCnZBkcYERSJSxdGlZB1QgcoAxYh9L1acwkOg8lP9aZCO0HYhkdazfI9nYpPCUwTEgRW4StLd5hNZBjYLYKJxTDEWF4chkuxYRS3lLbUemaDCweQZDZD';
//   FB.api('160839194080753/posts', {
//     access_token : pageAccessToken
//   },function(response) {
//     console.log(response);
//   });

var FB = require('fb');
FB.setAccessToken('EAABwzLixnjYBAA6cjFScWyT9Er2l0vGtwcbRttXcPu07UhgcFN9HZBPAPUTmXZAjZCvMrQMiPZAQOtqUrGlMB1cMuE9SpPAsU14nKQCz9IygvDeoJFMxT3ZBw34HqroAdqIFC9zNnbMZBLpy5LAVQgOekojbZBKpHirhCXolQdnvAZDZD')

FB.api('160839194080753/posts', function (res) {
  if(!res || res.error) {
   console.log(!res ? 'error occurred' : res.error);
   return;
  }
  console.log(res);

});