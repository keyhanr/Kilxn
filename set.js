var dBox = document.createElement("div");
dBox.id = "setBox";

// Give most defaults values so as to not inherit from document style
var buttonStyle = "font-family: Segoe UI, Lucida Grande, Tahoma, " +
    "sans-serif; font-size: 12px; padding:1px 3px; margin: 2px; background-" +
    "color:#eee; color:#000; border-radius:3px; background-size:auto; border: 1px "+
    "#bbe solid; box-shadow:#ccc 0px -1px 1px inset; line-height: 15px;" + 
    "box-sizing: initial;";

var inputStyle = "font-family: Segoe UI, Lucida Grande, Tahoma, " +
    "sans-serif; font-size: 13px; padding:2px; margin: 2px; border:1px #bbb solid" +
    "box-sizing: initial";

dBox.setAttribute("style", "width:150px; height:108px; position:fixed; left:50%; "+
    "top:50%; background:#DDD; font-family: Segoe UI, Lucida Grande, Tahoma, " +
    "sans-serif; font-size: 16px; border:1px solid #555; z-index:999; margin" +
    "-left:-78px; margin-top:-75px; padding:3px 6px 0px; line-height:150%;" + 
    "border-radius: 3px; opacity: 100%; text-align:center; box-shadow:" +
    "rgba(0, 0, 0, 0.2) 1px 1px 1px 1px; box-sizing: initial");

dBox.innerHTML += "<center>Add to Kilxn</center>";

// description field
var desBox = document.createElement("input");
desBox.setAttribute('type', 'text');
desBox.setAttribute('placeholder', "Description");
desBox.setAttribute('id', 'des');
desBox.setAttribute('style', inputStyle);

dBox.appendChild(desBox);

//tags field
var tagBox = document.createElement("input");
tagBox.setAttribute('type', 'text');
tagBox.setAttribute('placeholder', 'Tags');
tagBox.setAttribute('id', 'tags');
tagBox.setAttribute('style', inputStyle);

dBox.appendChild(tagBox);

dBox.innerHTML += '<br>';

//var pathMenu = document.createElement("select");
/*var option = 1;
for (String dir: dirs) {
    var pathOption = document.createElement("option");
    pathOption.value = dir + option;
    option = option + 1;
    pathMenu.appendChild(pathOption);
}*/
// var klxnsOption = document.createElement("option");
// klxnsOption.text = "Klxns";
// pathMenu.add(klxnsOption);
/*var addNewOption = document.createElement("option");
addNewOption.text = "Make new klxn...";
addNewOption.onClick = function () {
    dBox.insertBefore(newPath, )
}
pathMenu.add(addNewOption);
dBox.appendChild(pathMenu);*/

var submitBut = document.createElement("input");
submitBut.type = "button";
submitBut.value = "Add";
submitBut.onclick = addToKlxn;
submitBut.setAttribute('style', buttonStyle);
dBox.appendChild(submitBut);

var cancelBut =  document.createElement("input");
cancelBut.type = "button";
cancelBut.value = "Cancel";
cancelBut.onclick = closeBox;
cancelBut.setAttribute('style', buttonStyle);
dBox.appendChild(cancelBut);

document.body.appendChild(dBox);

function addToKlxn () {
    var imag = {src: imgUrl, desc: "", imgTags: ""};
    imag.desc = document.getElementById('des').value;
    imag.imgTags = document.getElementById('tags').value;
    closeBox();
    chrome.storage.local.get({klxn: []}, function (result) {
    // the input argument is ALWAYS an object containing the queried keys
    // so we select the key we need
    var klxn = result.klxn;
    klxn.push(imag);
    // set the new array value to the same key
    chrome.storage.local.set({klxn: klxn}, function () {});
  });
}

function closeBox () {
    document.body.removeChild(document.getElementById("setBox"));
}