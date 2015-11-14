var dBox = document.createElement("div");
dBox.id = "setBox";

// Give most defaults values so as to not inherit from document style
var buttonStyle = "font-family: Segoe UI, Lucida Grande, Tahoma, " +
    "sans-serif; font-size: 12px; padding:1px 3px; margin: 2px; background-" +
    "color:#fff; color:#000; border-radius:3px; background-size:auto; border: 1px "+
    "#bbe solid; box-shadow:#aaa 0px -1px 1px inset, #fff 0px 1px 1px inset; line-height: 15px;" + 
    "box-sizing: border-box; outline:none; onkeypress: 'console.log('h');";

var inputStyle = "font-family: Segoe UI, Lucida Grande, Tahoma, " +
    "sans-serif; font-size: 13px; padding:2px; margin: 2px; border:1px #bbb solid;" +
    "line-height: 15px";

dBox.setAttribute("style", "width:150px; height:108px; position:fixed; left:50%; "+
    "top:50%; background:#eee; font-family: Segoe UI, Lucida Grande, Tahoma, " +
    "sans-serif; font-size: 16px; border:1px solid #ccc; z-index:999; margin" +
    "-left:-78px; margin-top:-75px; padding:3px 6px 0px; line-height:150%;" + 
    "border-radius: 3px; opacity: 100%; text-align:center; box-shadow:" +
    "rgba(0, 0, 0, 0.1) 1px 1px 6px 2px; box-sizing: initial; text-tranform:" +
    "none; box-sizing: content-box; color:#000;");

dBox.innerHTML += "<center>Add to Kilxn</center>";

// description field
var desBox = document.createElement("input");
desBox.setAttribute('type', 'text');
desBox.setAttribute('placeholder', "Description");
desBox.setAttribute('style', inputStyle);
desBox.id = 'klxnDescBox';

dBox.appendChild(desBox);

//tags field
var tagBox = document.createElement("input");
tagBox.setAttribute('type', 'text');
tagBox.setAttribute('placeholder', 'Tags');
tagBox.setAttribute('style', inputStyle);
tagBox.id = 'klxnTagBox';

dBox.appendChild(tagBox);

dBox.innerHTML += '<br>';

var submitBut = document.createElement("input");
submitBut.type = "button";
submitBut.value = "Add";
submitBut.onclick = addToKlxn;
submitBut.setAttribute('style', buttonStyle);
submitBut.id = "submitButtonKlxns";
dBox.appendChild(submitBut);

var cancelBut =  document.createElement("input");
cancelBut.type = "button";
cancelBut.value = "Cancel";
cancelBut.onclick = closeBox;
cancelBut.setAttribute('style', buttonStyle);
dBox.appendChild(cancelBut);

document.body.appendChild(dBox);

document.getElementById("klxnDescBox").focus();

// Ideally I would have a method to check for the enter key, but for some reason
// only this works, so I have to write it for each field
document.getElementById("klxnDescBox").addEventListener('keydown', function (e) {
    if (e.keyCode == 13) {
        addToKlxn();
    }
});

document.getElementById("klxnTagBox").addEventListener('keydown', function (e) {
    if (e.keyCode == 13) {
        addToKlxn();
    }
});

function addToKlxn () {
    var imag = {src: imgUrl, desc: "", imgTags: ""};
    imag.desc = klxnDescBox.value;
    imag.imgTags = klxnTagBox.value;
    closeBox();
    chrome.storage.local.get({klxn: []}, function (result) {
    // the input argument is ALWAYS an object containing the queried keys
    // so we select the key we need
    var klxn = result.klxn;
    klxn.unshift(imag);
    // set the new array value to the same key
    chrome.storage.local.set({klxn: klxn}, function () {});
  });
}

function closeBox () {
    document.body.removeChild(document.getElementById("setBox"));
}
