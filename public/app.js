var clipboard = new Clipboard('.clickable');

clipboard.on('success', function(e) {
    console.log(e);
    showToast();
});

function filter (element,what) {
    var value = $(element).val();

    if (value == '') {
        $('#'+what+' > li>span[class="glyphicon-class"]').parent().show();
    }
    else {
        $('#'+what + ' > li>span[class="glyphicon-class"]:not(:contains(' + value + '))').parent().hide();
        $('#'+what + ' > li>span[class="glyphicon-class"]:contains(' + value + ')').parent().show();
    }
};

function closeApp(){
  (require('electron').remote).getGlobal('sharedObj').quit();
}

function showToast() {
    // Get the toast DIV
    var x = document.getElementById("toast")

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
}
