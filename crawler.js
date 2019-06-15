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
var {Savejson}=require('./savejson');
var SaveJson=new Savejson();
FB.setAccessToken('EAABwzLixnjYBAA6cjFScWyT9Er2l0vGtwcbRttXcPu07UhgcFN9HZBPAPUTmXZAjZCvMrQMiPZAQOtqUrGlMB1cMuE9SpPAsU14nKQCz9IygvDeoJFMxT3ZBw34HqroAdqIFC9zNnbMZBLpy5LAVQgOekojbZBKpHirhCXolQdnvAZDZD')
var data=[];
function callapi(url){
    console.log("hi")
    FB.api(url,function(res){
        if(!res || res.error) {
            console.log(!res ? 'error occurred' : res.error);
            return;
           }
        data=data.concat(res.data)
        if (res.paging){
            var nextUrl=res.paging.next.slice(32,res.paging.next.length)
            console.log(nextUrl)
            callapi(nextUrl)
        }
        else 
        {
            var pageId=url.split("/")[0];
            // console.log(pageId)
            console.log(data.length)
            SaveJson.storeData(data,'./'+pageId+".json")
        }
           
})
}


FB.api('160839194080753/posts?limit=250&fields=id,message,created_time,updated_time', function (res) {
    console.log("main function")
  if(!res || res.error) {
   console.log(!res ? 'error occurred' : res.error);
   return;
  }
  data=data.concat(res.data);
  if (res.paging){
      // FB.api(res.paging.next,function(res){
      //   if(!res || res.error) {
      //       console.log(!res ? 'error occurred' : res.error);
      //       return;
      //      }
      //   data=data.concat(res.data)  
      // })
    var nextUrl=res.paging.next.slice(32,res.paging.next.length)
    console.log(nextUrl)
    callapi(nextUrl);
  }
});