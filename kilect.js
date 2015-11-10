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


// // by passing an object you can define default values e.g.: []
// chrome.storage.local.get({userKeyIds: []}, function (result) {
//     // the input argument is ALWAYS an object containing the queried keys
//     // so we select the key we need
//     var userKeyIds = result.userKeyIds;
//     userKeyIds.push({keyPairId: keyPairId, HasBeenUploadedYet: false});
//     // set the new array value to the same key
//     chrome.storage.local.set({userKeyIds: userKeyIds}, function () {
//         // you can use strings instead of objects
//         // if you don't  want to define default values
//         chrome.storage.local.get('userKeyIds', function (result) {
//             console.log(result.userKeyIds)
//         });
//     });
// });