var ipc = require('electron').ipcRenderer;

document.addEventListener('DOMContentLoaded', function () {
  if (!Notification) {
    alert('Desktop notifications not available in your browser. Try Chromium.');
    return;
  }

  if (Notification.permission !== "granted")
    Notification.requestPermission();
});

function notifyUser() {
  if (Notification.permission !== "granted")
    Notification.requestPermission();
  else {
    var notification = new Notification('Buzzz!! Time\'s up', {
      icon: 'res/tomato-big.png',
      body: "Hey there! You've been notified!"
    });

    //var notiSound=document.getElementById('notiSound');
    //notiSound.play();

    //setTimeout( function () { notification.close(); }, 3000);

    notification.onclose = function(){
      //notiSound.pause();
    }
  }
}
