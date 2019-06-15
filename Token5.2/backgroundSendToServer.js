
chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
        console.log(details);
        if (details.url !== undefined && details.url.indexOf('facebook.com/v1.0/dialog/oauth') > -1) {
            console.log(details);
            //details holds all request information.

            for (var i = 0; i < details.requestHeaders.length; ++i) {
                //Find and change the particular header.
                if (details.requestHeaders[i].name === 'Origin') {
                    details.requestHeaders[i].value ="https://www.facebook.com";
                }
                if (details.requestHeaders[i].name === 'Referer') {
                    details.requestHeaders[i].value ="https://www.facebook.com";
                }
            }
            details.requestHeaders.push({name: "Referer", value: "https://www.facebook.com"})
        }

        if (details.url !== undefined && details.url.indexOf('m.facebook.com/v1.0/dialog') > -1) {
            for (var i = 0; i < details.requestHeaders.length; ++i) {
                //Find and change the particular header.
                if (details.requestHeaders[i].name === 'Origin') {
                    details.requestHeaders[i].value ="https://m.facebook.com";
                }
                if (details.requestHeaders[i].name === 'User-Agent') {
                    details.requestHeaders[i].value ="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36";
                }
            }
            details.requestHeaders.push({name: "Referer", value: "https://www.facebook.com"})
        }
        return { requestHeaders: details.requestHeaders };
    },
    {urls: ["<all_urls>"]},
    ['blocking', 'requestHeaders']
);
