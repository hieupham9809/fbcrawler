const fs = require('fs');
var numpost = 0;
class EliminateTrash {
    constructor(){};
    eliminateTrash(path){
        try {
            var data = fs.readFileSync(path, 'utf8');
            var jsonObject = JSON.parse(data);
            console.log("length before: " + jsonObject.length.toString());
            jsonObject = jsonObject.filter(item => {
                var pattern = /[0-9]/;
                return (item.hasOwnProperty('message') && item.message.length > 200 && pattern.test(item.message));
            });
            numpost += jsonObject.length;
            console.log("length after: " + jsonObject.length.toString());
            fs.writeFileSync(path.split('.json')[0] + '_trimmed.json', JSON.stringify(jsonObject));
        } catch (err){
            console.error(err);
        }
    }
}

// module.exports = {EliminateTrash};
 var eliminateTrashOb = new EliminateTrash();
// eliminateTrashOb.eliminateTrash('./379380485898721.json'); 
const dirPath = '../data_raw/';
fs.readdir(dirPath, (err, filenames)=>{
    if (err){
        return;
    }
    filenames.forEach((filename)=>{
        eliminateTrashOb.eliminateTrash(dirPath + filename);
    })
    console.log("Total post: " + numpost.toString());
})