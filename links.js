window.onload=function(){
var links = document.getElementById('qrDiv')
var { shell } = require('electron')


links.addEventListener('dblclick', function(e){
//   e.preventDefault()
  let url = `${localURL}`
  shell.openExternal(url)
}) 

}