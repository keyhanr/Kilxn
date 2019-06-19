// Creates the dialog box HTML element with all required compnents and displays it
function displayDialogBox(){
    // Create dialog box element
    var dialogBox = document.createElement("div");
    dialogBox.id = dialogBoxId;
    dialogBox.innerHTML += dialogBoxText;

    // Create input fields and buttons used in the box
    var descriptionField = createInputField(descriptionFieldId, descriptionFieldText, inputStyle);
    var tagsField = createInputField(tagsFieldId, tagsFieldText, inputStyle);
    var submitButton = createButton(submitButtonText, buttonStyle, addToKilxn);
    var cancelButton = createButton(cancelButtonText, buttonStyle, closeBox);

    // Set the CSS style for the dialog box
    setStyle(dialogBox, dialogBoxStyle);

    // Add the dialog box elements to the box in order
    dialogBox.appendChild(descriptionField);
    dialogBox.appendChild(tagsField);
    dialogBox.innerHTML += "<br>";
    dialogBox.appendChild(submitButton);
    dialogBox.appendChild(cancelButton);

    // Add the dialog box to the current webpage
    document.body.appendChild(dialogBox);

    // Listens for the enter keypress in each input box, submit if heard
    addKeydownListener(descriptionFieldId, enterKey, addToKilxn);
    addKeydownListener(tagsFieldId, enterKey, addToKilxn);

    // Set the cursor onto the description field
    document.getElementById(descriptionFieldId).focus();
}

// When the "Add" button is clicked
function addToKilxn () {
    var imag = {
        src: imgUrl, 
        desc: kilxnDescriptionField.value, 
        imgTags: kilxnTagsField.value
    };
    closeBox();
    // Get the existing kilxn from storage, an empty array if it doesn't exist
    // then add the new image to it
    chrome.storage.local.get({klxn: []}, function (result) {
    var klxn = result.klxn;
    klxn.unshift(imag);
    // Update the existing kilxn
    chrome.storage.local.set({klxn: klxn}, function () {});
  });
}

// When "Cancel" button is clicked
function closeBox () {
    document.body.removeChild(document.getElementById(dialogBoxId));
}

//////// HELPER FUNCTIONS

// Turns a dictionary object into a string ready to be used as a CSS style
function stringifyStyle(style) {
    var styleString = "";
    for (var property in style) {
        styleString = styleString + property + ": " + style[property] + "; ";
    }
    return styleString;
}

// Sets the CSS style of a given element
function setStyle(element, style) {
    element.setAttribute("style", stringifyStyle(style));
}

// Creates an input HTML element
function createInputField(fieldId, fieldText, style) {
    var inputField = document.createElement("input");
    inputField.setAttribute("type", "text");
    inputField.setAttribute("placeholder", fieldText);
    inputField.setAttribute("style", stringifyStyle(style));
    inputField.id = fieldId;

    return inputField;
}

// Creates a button HTMl element
function createButton(buttonText, style, action) {
    var button = document.createElement("input");
    button.type = "button";
    button.value = buttonText;
    button.onclick = action;
    button.setAttribute("style", stringifyStyle(style));

    return button;
}

// Creates a listener for a given HTML element
function addKeydownListener(elementId, key, action) {
    document.getElementById(elementId).addEventListener("keydown", function(e) {
    if (e.keyCode == key) {
        action();
    }});
}

// Constants, text values, and CSS styles for required elements
var enterKey = 13;
var dialogBoxText = "Add to Kilxn";
var submitButtonText = "Add";
var cancelButtonText = "Cancel";
var dialogBoxId = "kilxnDialogBox";
var descriptionFieldId = "kilxnDescriptionField";
var descriptionFieldText = "Description";
var tagsFieldId = "kilxnTagsField";
var tagsFieldText = "Tags";
var dialogBoxStyle = {
    "width": "160px",
    "height": "108px",
    "position": "fixed",
    "left": "50%",
    "top": "50%", 
    "background": "#eee", 
    "font-family": "Segoe UI, Lucida Grande, Tahoma, sans-serif",
    "font-size": "16px",
    "border": "1px solid #ccc",
    "z-index": "999999",
    "margin-left": "-78px",
    "margin-top": "-75px",
    "padding": "3px 6px 0px",
    "line-height": "150%",
    "border-radius": "3px",
    "opacity": "100%",
    "text-align": "center",
    "box-shadow": "rgba(0, 0, 0, 0.1) 1px 1px 6px 2px",
    "box-sizing": "initial",
    "text-tranform": "none",
    "box-sizing": "content-box",
    "color": "#000",
    "line-height": "24px",
    "font-style": "normal",
    "font-stretch": "normal",
    "font-weight": "normal",
    "min-height": "108px",
    "text-tranform": "none",
    "text-align": "center"
};
var buttonStyle = {
    "background-color": "#fff",
    "background-size": "auto",
    "border": "1px #bbe solid",
    "border-radius": "3px",
    "box-shadow": "#aaa 0px -1px 1px inset, #fff 0px 1px 1px inset",
    "box-sizing": "content-box", 
    "color": "#000",
    "font-family": "Segoe UI, Lucida Grande, Tahoma, sans-serif",
    "font-size": "12px",
    "line-height": "15px",
    "margin": "2px",
    "min-height": "13px",
    "outline": "none",
    "padding": "1px 3px"
};
var inputStyle = {
    "font-family": "Segoe UI, Lucida Grande, Tahoma, sans-serif",
    "font-size": "13px",
    "padding": "2px",
    "margin": "2px",
    "border": "1px #bbb solid",
    "line-height": "15px",
    "min-height": "0px",
    "max-width": "146px",
    "height": "18px",
    "border-radius": "0px",
    "background-color": "#fff",
    "color": "#000;",
    "max-height": "18px",
    "box-sizing": "content-box"
};

/////// MAIN

// Close any pre-existing dialog box before showing the box
if (document.getElementById(dialogBoxId)) {
    closeBox();
}
displayDialogBox();
