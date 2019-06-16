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
var id_list=['219297601825182', '173043689557649', '186406298594616', '1673905732921572', '417989295022812', '412410089098065', '349485175214625', '1641241849499407', '1378709832362013', '134024933310700', '417531328368737', '734867643263879', '104853663008289', '203947556459685', '865577806855316', '164811497338050', '1256520121160185', '1536565609756073', '149582911744749', '1472662339675863', '534946433200726', '1696395167256295', '129791420547673', '167984136560917', '413934735358043', '412667638790399', '145633062281', '980920408585673', '200966533568147', '712222508789675', '242170065930293', '1193990540628088', '524538074238532', '264996773576954', '1202876543059447', '343572125981024', '176244315888829', '348352131951086', '724775937654364', '133636546828042', '1187687724593140', '1242586625757427', '566758956736338', '235671576466980', '345933782429293', '109590986204106', '316275611727547', '1447014612185085', '2499035353443423', '630169120339675', '151466991626534', '577872139003489', '153938911293271', '419836908088213', '1258937074121547', '214561795381924', '269907900516627', '456146911134480', '616998505089308', '423242111125933', '702939773140081', '209708339212816', '153518374815794', '1505110323143628', '616113865165743', '2443089585708558', '213939592416464', '742947229198498', '712127785482156', '122263424475037', '1200392776801021', '943897435789107', '375925195817466'];
FB.setAccessToken('EAABwzLixnjYBAHSLZBIqbrhVZBQGOGLH2uFnI6FrzqPKVAqhR1K3w8XHFce6tUDzb1eZBJyXIn1ZCaGcHjydMJZCSEkMhQiySBkATso8VTIXEVcrEiZBpIkqW6viO8nUGplr6noFJNuuIyZAPO8oNJv8Q2ZAZBnFYMNNOUL8S8GhclQZDZD')
var data=[];
for (let i=0;i<id_list.length;i++)
{
    data.push([]);
}
console.log(data);
console.log(data[0]);
function callapi(url,index){
    console.log("hi")
    FB.api(url,function(res){
        if(!res || res.error) {
            console.log(!res ? 'error occurred' : res.error);
            return;
           }
        console.log(`data ${index} ${data[index]}`)
        data[index]=data[index].concat(res.data)
        if (res.paging){
            var nextUrl=res.paging.next.slice(32,res.paging.next.length)
            console.log(nextUrl)
            callapi(nextUrl,index)
        }
        else 
        {
            var pageId=url.split("/")[0];
            // console.log(pageId)
            console.log(data[index].length)
            SaveJson.storeData(data[index],'./'+pageId+".json")
        }
           
})
}

for (let i=0;i<id_list.length;i++)
{
    FB.api(id_list[i]+'/posts?limit=250&fields=id,message,created_time,updated_time', function (res) {
    console.log("main function")
  if(!res || res.error) {
   console.log(!res ? 'error occurred' : res.error);
   return;
  }
  console.log(`data ${i}`)
  console.log(data[i]);
  data[i]=data[i].concat(res.data);
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
    callapi(nextUrl,i);
  }
});
}