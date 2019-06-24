const fs = require('fs');
class EliminateEmoji {
    constructor(){};
    eliminateEmoji(path){
        try{
            var data = fs.readFileSync(path, 'utf8');
            var jsonObject = JSON.parse(data);
            var i;
            //const pattern = /[\u1F601-\u1F64F\u1F681-\u1F6C5\u1F30D-\u1F567\u2702-\u27B0\u1F680-\u1F6C0\u24C2-\u1F251\u2300-\u26FF\u2700-\u27BF]/g;
            //const pattern = /([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g;
            //const pattern = /([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]|[\u2700-\u27BF]|\u2B50)/g;
            //\\x{0001f300}-\\x{0001f64f}]|[\\x{0001f680}-\\x{0001f6ff}
            const pattern = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c\ude32-\ude3a]|[\ud83c\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
            for (i in jsonObject){
                var message = jsonObject[i].message;
                message = message.replace(pattern, '');
                //console.log(message);
                jsonObject[i].message = message;
            }
            fs.writeFileSync(path.split('.json')[0] + '_deleteEmoji.json', JSON.stringify(jsonObject));
            
        } catch (err){
            console.error(err);
        }
    }
}

var eliminateEmojiOb = new EliminateEmoji();
//eliminateEmojiOb.eliminateEmoji('./379380485898721_trimmed.json');
const dirPath = '../data_eliminate/';
fs.readdir(dirPath, (err, filenames)=>{
    if (err){
        return;
    }
    filenames.forEach((filename)=>{
        eliminateEmojiOb.eliminateEmoji(dirPath + filename);
    })
    
})