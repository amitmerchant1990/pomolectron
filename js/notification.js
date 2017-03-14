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
    var notification = new Notification('Notification title', {
      icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
      body: "Hey there! You've been notified!"
    });

    var notiSound=document.getElementById('notiSound');
    //notiSound.play();

    //setTimeout( function () { notification.close(); }, 3000);

    notification.onclose = function(){
      //notiSound.pause();
    }

    notification.onclick = function () {
      window.open("http://stackoverflow.com/a/13328397/1269037");
    };
  }
}

function closeApp(){
  ipc.send('closeApp', 'close');

}
