window.onload = function () {
  var links = document.getElementById('qrDiv')
  var { shell } = require('electron')
  // const notifier = require('node-notifier');


  links.addEventListener('dblclick', function (e) {
    //   e.preventDefault()
    let url = `${localURL}`
    shell.openExternal(url)

  })
  // links.addEventListener('click', function (e) {
  //   //   e.preventDefault()
  //   notifier.notify({
  //     title: 'OLANBox已经开启',
  //     message: `点我打开${localURL}`,
  //     sound: true, // Only Notification Center or Windows Toasters
  //     wait: true // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait or notify-send as it does not support the wait option

  //   });

  // })
  // notifier.on('click', function (notifierObject, options, event) {
  //   // Triggers if `wait: true` and user clicks notification
  //   let url = `${localURL}`
  //   shell.openExternal(url)
  // });

}