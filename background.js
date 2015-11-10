// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  console.log('Turning ' + tab.url + ' red!');
  chrome.tabs.executeScript({
    code: 'document.body.style.backgroundColor="red"'
  });
  tagImages();
})

function overlayImage(element) {
   var div = document.createElement('div'), element.parentElement.insertBefore(div, element); // add the div to the parent
   div.style.display = 'inline-block'; // make it behave like an image
   div.style.position = 'relative'; // for absolute position of children
   div.appendChild(element);
   var icon = document.createElement("img");
   icon.src = "icon.png";
   icon.style.position = 'absolute';
   icon.style.right = 0;
   icon.style.top = 0;
   div.appendChild(icon);
}

function tagImages()
{
	alert("lol");
  	var imgs = document.getElementsByTagName('img'); //collection of image

	for (var i=0, max=imgs.length; i < max; i++) {
		var width = imgs[i].clientWidth;
		var height = imgs[i].clientHeight;
		if (true) {
			overlayImage(img[i]);
		}
	}
}