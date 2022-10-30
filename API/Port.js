const fs = require('fs');
const path = require('path')
function getPort(){
try {

    const data = fs.readFileSync(path.join(__dirname,'..','/config.json'), 'utf8');

    const config = JSON.parse(data);
    port = config.port
    return port
} catch (err) {
    console.log(`Error reading file from disk: ${err}`);
    return err
}
}
module.exports=getPort()