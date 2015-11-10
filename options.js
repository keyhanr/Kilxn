document.body.onload = function() {
    // Add functionality to select all box
    document.getElementById('sAll').onclick = selectAll;

    chrome.storage.local.get("klxn", function(items) {
        // Load up all the image data into the table
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
            // Firs two rows show img when clicked
            tabRow.cells[0].onclick = showImg;
            tabRow.cells[1].onclick = selectUrl;
       		document.getElementById("data").appendChild(tabRow);
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
    // Remove existing image row if there is one
    if (row.nextSibling && row.nextSibling.cells[0].colSpan == 4) {
        // delete or hide?
        data.deleteRow(row.nextSibling.rowIndex);
        row.style.backgroundColor = "#fff"
    }
    // Insert the image into the following row
    else {
        var img = document.createElement("img");
        var a = document.createElement('a');
        img.src = row.cells[1].innerText;;
        img.style.maxHeight = "275px";
        img.style.maxWidth = "100%";
        a.href = img.src;
        a.appendChild(img);
        var imgCell = document.createElement("td");
        imgCell.colSpan = 4;
        var imgHolder = document.createElement("tr");
        imgHolder.style.textAlign = "center";
        imgHolder.appendChild(imgCell);
        imgCell.appendChild(a);
        data.insertBefore(imgHolder, row.nextSibling);
        row.style.backgroundColor = "#eef"
        
        // Scroll down to have entire img visible
        if (imgHolder.offsetTop + img.height > main.scrollTop + 300) {
            main.scrollTop=imgHolder.offsetTop + img.height - 300;
        }
    }
}

// Go through every row in table (save for first) and add/remove all from selected
function selectAll () {
    var rows = document.getElementById('data').rows;
    var selAllImgs = this.checked;
    selectedImgs = [];
    for (var i = 1; i < rows.length; i++) {
        rows[i].cells[3].childNodes[0].checked = this.checked;
        if (selAllImgs) {
            selectedImgs.push(i-1);
        }
    }
}

function clearKlxn() {
    if (selectedImgs.length == 0) {
        alert("No images have been selected.");
    }
    else {
    	chrome.storage.local.get("klxn", function(items) {
            var klxn =  items.klxn;
            for (var i = selectedImgs.length - 1; i>= 0; i--) {
                klxn.splice(selectedImgs[i], 1);
            }
            chrome.storage.local.set({klxn: klxn});
        });
        location.reload();
    }
}

function confirmed(message) {
    return window.confirm(message);
}

function editKlxn () {

}

// It'll be faster for bigger klxns to keep track of an array of selected
// rows rather than go through the entire table looking for checked rows
function selectImg(i) {
    iInSelectedRows = selectedImgs.indexOf(i);
    if (iInSelectedRows == -1) {
        selectedImgs.push(i);
    }
    else {
        selectedImgs.splice(iInSelectedRows, 1);
    }
}

function searchImgs () {
        var rows = document.getElementById('data').rows;
        for (var i = 1; i < rows.length; i++) {
            if (rows[i].cells[2].innerText.indexOf(this.value) == -1) {
                rows[i].style.display = "none";
                if (selectedImgs.indexOf(i-1) > -1) {
                    selectImg(i-1);
                    rows[i].cells[3].childNodes[0].checked = false;
                }
            }
            else {
                rows[i].style.display = '';
            }
        }
    
}

var selectedImgs = [];

// clear button
document.getElementById('clear').addEventListener('click', clearKlxn);

// edit button
document.getElementById('edit').addEventListener('click', editKlxn);

// search bar
document.getElementById('search').addEventListener('keyup', searchImgs);
document.getElementById('search').addEventListener('paste', searchImgs);