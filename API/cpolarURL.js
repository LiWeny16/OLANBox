const fs = require('fs');
const path = require('path')
function getcpolarURL(){
try {

    const data = fs.readFileSync(path.join(__dirname,'..','/config.json'), 'utf8');

    const config = JSON.parse(data);
    cpolarURL = config.cpolarURL
    return cpolarURL
} catch (err) {
    console.log(`Error reading file from disk: ${err}`);
    return err
}
}
module.exports=getcpolarURL()