const fs = require('fs');
class Savejson {
    constructor(){};
    storeData(data, path){
        try {
            fs.writeFileSync(path, JSON.stringify(data))
        } catch (err) {
            console.error(err)
        }
    }
}
module.exports = {Savejson};