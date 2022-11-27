const os = require('os');

/**
 * 获取当前机器的ip地址
 */
function getIPAdress() {
  var ifaces=os.networkInterfaces()

  for (var dev in ifaces) {
    // console.log(dev);
    if(!(dev.includes("vEthernet")||dev.includes("VMware"))){
    let iface = ifaces[dev] //解构对象

    for (let i = 0; i < iface.length; i++) {
      let {family, address, internal} = iface[i]  //结构数组

      if (family === 'IPv4' && address !== '127.0.0.1' && !internal) {
        return address
      }
    }
    }
  }
}

console.log(getIPAdress());
module.exports = getIPAdress()