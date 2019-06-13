/* This file makes images and gifvs on webpages kilectable, giving the option of
 * kilecting them when right-clicked. The menu item runs the script that creates
 * the Kilect Dialog Box in the user's open tab. 
 *
*/

// Title of context menu items
var kilectText = "Kilect this...";

// Create context menu item when images are right-clicked
chrome.contextMenus.create({
  title: kilectText, 
  contexts: ["image"]
});

// Create context menu item when gifvs are right-clicked
chrome.contextMenus.create({
  title: kilectText, 
  contexts: ["video"],
  targetUrlPatterns: ["*://*/*.gifv", "*://*/*.webm"]
});


chrome.contextMenus.onClicked.addListener(function(info, tab){
// Run the Kilect Dialog Box in the current tab
  chrome.tabs.executeScript(tab.id, {
  	// The URL is necessary for kilecting so pass it to the Kilect Dialog Box
    code: "var imgUrl =" + JSON.stringify(info.srcUrl) + ";"}, 
    // Run the script that will create the Kilect Dialog Box in the open tab
    function(){
      chrome.tabs.executeScript(tab.id, {file: "js/dialogBox.js"}, function(){});
    });
});
