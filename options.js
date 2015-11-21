document.body.onload = function() {
    // Add functionality to select all box
    document.getElementById('sAll').onclick = selectAll;

    chrome.storage.local.get("klxn", function(items) {
        // Load up all the image data into the table
        if (!items.klxn || items.klxn.length == 0) {
                var msgCell = document.createElement("td");
                msgCell.colSpan = 4;
                var msgRow = document.createElement("tr");
                msgRow.appendChild(msgCell);
                msgRow.setAttribute('style', "color:#666; text-align:center;")
                msgCell.innerHTML = "Nothing to see here! <br> Right click images"+
                " and select 'Kilect this' to add to your Kilxn!";
                document.getElementById("data").appendChild(msgRow);
        }
        else {
        	for (imag in items.klxn) {
                //Make cells
                var imgDes = document.createElement("td");
        		var imgSrc = document.createElement("td");
                imgSrc.setAttribute("style", "direction: rtl; text-align:left;");
        		var imgTags = document.createElement("td");
                var imgSel = document.createElement("td");
                // Fill cells
                imgDes.innerText = items.klxn[imag].desc;
        		imgSrc.innerText = items.klxn[imag].src;
        		imgTags.innerText = items.klxn[imag].imgTags;

                // Make checkbox
                var imgCheck = document.createElement('input');
                imgCheck.type = "checkbox";
                imgCheck.onclick = function () {selectImg(this.parentElement
                    .parentElement.rowIndex - 1)};
                imgSel.appendChild(imgCheck);

                // Make row and add cells to it
        		var tabRow = document.createElement("tr");
                tabRow.appendChild(imgDes);
        		tabRow.appendChild(imgSrc);
        		tabRow.appendChild(imgTags);
                tabRow.appendChild(imgSel);
                // Description shows img when clicked, clicking URL selects it
                tabRow.cells[0].onclick = showImg;
                tabRow.cells[1].onclick = selectUrl;

                // Add row to table
           		document.getElementById("data").appendChild(tabRow);

                // Row to hold image to show
                var imgCell = document.createElement("td");
                imgCell.colSpan = 4;
                var imgHolder = document.createElement("tr");
                imgHolder.style.textAlign = "center";
                imgHolder.appendChild(imgCell);
                imgHolder.style.display = 'none';
                document.getElementById("data").appendChild(imgHolder);
        	}
        }
    });
}

function selectUrl () {
    var range = document.createRange();
    range.selectNode(this);
    window.getSelection().addRange(range);
}

function showImg () {
    var row = this.parentElement;
    var imgRow = row.nextSibling;
    var imgCell = imgRow.childNodes[0];
    // Hide existing image row if visible
    if (imgRow.style.display == '') {
        imgRow.style.display = "none";
        row.style.backgroundColor = "#fff";
    }
    // Insert the image into the following row
    else {
        if (!imgCell.childNodes[0]){
            var img = document.createElement("img");
            var a = document.createElement('a');
            img.src = row.cells[1].innerText;
            img.style.maxHeight = 380;
            img.style.maxWidth = "100%";
            a.href = img.src;
            a.appendChild(img);
            imgCell.appendChild(a);
            imgCell.childNodes[0].childNodes[0].onload = scrollToFit;
        }
        var tableHeight = 400;
        row.style.backgroundColor = "#eef"
        imgRow.style.display = '';

        // Scroll down to have entire img visible
        var imgHeight = imgCell.childNodes[0].childNodes[0].height;
        if (imgRow.offsetTop + imgHeight > main.scrollTop + tableHeight) {
                main.scrollTop = imgRow.offsetTop + imgHeight - tableHeight;
        }
    }
}

function scrollToFit () {
    var row = this.parentNode.parentNode.parentNode;
    if (row.offsetTop + this.height > main.scrollTop + 400) {
            main.scrollTop = row.offsetTop + this.height - 400;
    }
}

// Go through every row in table (save for titles) and add/remove all from selected
function selectAll () {
    var rows = document.getElementById('data').rows;
    var selAllImgs = this.checked;
    selectedRows = [];
    if (selAllImgs) {
        for (var i = 1; i < rows.length; i+=2) {
            if (rows[i].style.display != 'none') {
                rows[i].cells[3].childNodes[0].checked = true;
                selectImg(i-1);
            }
        }
    }
    else {
        for (var i = 1; i < rows.length; i+=2) {
            rows[i].cells[3].childNodes[0].checked = false;
            selectedRows.splice(i-1, 1);
        }
    }
}

function makeGoBut () {
    var goBut = document.createElement("input");
    goBut.type = "button";
    goBut.value = "Go";
    goBut.id = "go";
    editTools.appendChild(goBut);
}

function editKlxn () {
    if (selectedRows.length == 0) {
        alert("No images have been selected.");
    }
    else {
        chrome.storage.local.get("klxn", function(items) {
            var klxn =  items.klxn;
            for (var i = selectedRows.length - 1; i>= 0; i--) {
                klxn[selectedRows[i]/2].desc = newDes.value;
                klxn[selectedRows[i]/2].imgTags = newTags.value;
            }
            chrome.storage.local.set({klxn: klxn});
        });
        location.reload();
    }
}

function addTags () {
    if (selectedRows.length == 0) {
        alert("No images have been selected.");
    }
    else {
        chrome.storage.local.get("klxn", function(items) {
        var klxn =  items.klxn;
        for (var i = selectedRows.length - 1; i>= 0; i--) {
            if (klxn[selectedRows[i]/2].imgTags == "") {
              klxn[selectedRows[i]/2].imgTags += ", ";  
            }
            klxn[selectedRows[i]/2].imgTags += newTagsBox.value;
        }
        chrome.storage.local.set({klxn: klxn});
        });
        location.reload();
    }
}

function deleteSelected() {
    if (selectedRows.length == 0) {
        alert("No images have been selected.");
    }
    else {
    	chrome.storage.local.get("klxn", function(items) {
            var klxn =  items.klxn;
            for (var i = selectedRows.length - 1; i>= 0; i--) {
                klxn.splice(selectedRows[i]/2, 1);
            }
            chrome.storage.local.set({klxn: klxn});
        });
        location.reload();
    }
}

// It'll be faster for bigger klxns to keep track of an array of selected
// rows rather than go through the entire table looking for checked rows
function selectImg(i) {
    iInSelectedRows = selectedRows.indexOf(i);
    if (iInSelectedRows == -1) {
        selectedRows.push(i);
    }
    else {
        selectedRows.splice(iInSelectedRows, 1);
    }
}

// Hear me out for this one. Much more code, but during runtime far 
// fewer comparisons need be made.
function searchImgs () {
    var rows = document.getElementById('data').rows;
    if (this.value == "") {
        incUrls.disabled="";
    }
    else {
        incUrls.disabled = "disabled";
    }
    // If URLs are to be included in the search
    if (searchUrls) {
        for (var i = 1; i < rows.length; i+=2) {
            // Make all rows that match criteria visible
            if (rows[i].cells[2].innerText.indexOf(this.value) > -1 ||
                rows[i].cells[1].innerText.indexOf(this.value) > -1 ||
                rows[i].cells[0].innerText.indexOf(this.value) > -1) {
                rows[i].style.display = '';
            }
            // Otherwise hide the row, deselecting it
            else {
                rows[i].style.backgroundColor = '#fff';
                rows[i].style.display = 'none';

                // The row with the image should be hidden
                rows[i+1].style.display = 'none';
                if (selectedRows.indexOf(i-1) > -1) {
                    selectImg(i-1);
                    rows[i].cells[3].childNodes[0].checked = false;
                }
            }
        }
    }
    else {
        for (var i = 1; i < rows.length; i+=2) {
            // Make all rows that match criteria visible
            if (rows[i].cells[2].innerText.indexOf(this.value) > -1 ||
                rows[i].cells[0].innerText.indexOf(this.value) > -1) {
                rows[i].style.display = '';
            }
            // Otherwise hide the row, deselecting it
            else {
                rows[i].style.backgroundColor = '#fff';
                rows[i].style.display = 'none';

                // The row with the image should be hidden
                rows[i+1].style.display = 'none';
                if (selectedRows.indexOf(i-1) > -1) {
                    selectImg(i-1);
                    rows[i].cells[3].childNodes[0].checked = false;
                }
            }
        }
    }
}

function hideEdits () {
    while (editTools.firstChild) {
        editTools.removeChild(editTools.firstChild);
    }
}

function showEditBoxes () {
    var newDes = document.createElement("input");
    newDes.type = "text";
    newDes.placeholder= "New description";
    newDes.id = "newDes";
    editTools.appendChild(newDes);
    var newTags = document.createElement("input");
    newTags.type = "text";
    newTags.placeholder= "New tags";
    newTags.style.margin = "0px 2px";
    newTags.id = "newTags";
    editTools.appendChild(newTags);
    makeGoBut();
    document.getElementById('go').addEventListener('click', editKlxn);
}

function showAddTagBox () {
    var newTagsBox = document.createElement("input");
    newTagsBox.type = "text";
    newTagsBox.placeholder= "Tags to add";
    newTagsBox.style.marginRight = "2px";
    newTagsBox.id = "newTagsBox";
    document.getElementById('editTools').appendChild(newTagsBox);
    makeGoBut();
    document.getElementById('go').addEventListener('click', addTags);
}

// option select
document.getElementById('menu').addEventListener('change', function () {
            hideEdits();
    if (menu.selectedIndex == 1) {
        showEditBoxes();
    }
    else if (menu.selectedIndex == 2) {
        showAddTagBox();
    }
    else if (menu.selectedIndex == 3) {
        makeGoBut();
        go.value = "Remove";
        document.getElementById('go').addEventListener('click', deleteSelected);
    }
});

document.getElementById('incUrls').addEventListener('change', function () {
    searchUrls = incUrls.checked;
});

var selectedRows = [];

var searchUrls = true;

// search bar
document.getElementById('search').addEventListener('keyup', searchImgs);
document.getElementById('search').addEventListener('paste', searchImgs);
