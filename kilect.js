var id = chrome.contextMenus.create({id: "addGifv", title: 
  "Kilect this...", contexts:["video"],
  targetUrlPatterns:["*://*/*.gifv", "*://*/*.webm"]});

var id = chrome.contextMenus.create({id: "add", title: 
  "Kilect this", contexts:["image"]});
// Set fields
chrome.contextMenus.onClicked.addListener(function(info, tab) {
  /* Inject the script into the current tab */
  chrome.tabs.executeScript(tab.id, {
    code: "var imgUrl =" + JSON.stringify(info.srcUrl) + ";"}, function() {
      chrome.tabs.executeScript(tab.id, {file: "set.js"}, function () {

      });
    });
});

//edit
//style
// directories
