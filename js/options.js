document.body.onload = function() {
    document.getElementById('sAll').onclick = selectAll;

    chrome.storage.local.get("klxn", function(items) {
        if (!items.klxn || items.klxn.length == 0) {
                var msgCell = document.createElement("td");
                msgCell.colSpan = 4;
                var msgRow = document.createElement("tr");
                msgRow.appendChild(msgCell);
                msgRow.setAttribute('style', "color:#666; text-align:center;")
                msgCell.innerHTML = "Nothing to see here! <br> Right click an "+
                "image and select 'Kilect this' to add to your Kilxn!";
                document.getElementById("data").appendChild(msgRow);
        }
        else {
        	for (imag in items.klxn) {
                var imgDes = document.createElement("td");
        		var imgSrc = document.createElement("td");
                imgSrc.setAttribute("style", "direction: rtl; text-align:left;");
        		var imgTags = document.createElement("td");
                var imgSel = document.createElement("td");
                imgDes.innerText = items.klxn[imag].desc;
        		imgSrc.innerText = items.klxn[imag].src;
        		imgTags.innerText = items.klxn[imag].imgTags;
                var imgCheck = document.createElement('input');
                imgCheck.type = "checkbox";
                imgCheck.onclick = function () {selectImg(this.parentElement
                    .parentElement.rowIndex - 1)};
                imgSel.appendChild(imgCheck);
                imgDes.style.cursor = "pointer";
        		var tabRow = document.createElement("tr");
                tabRow.appendChild(imgDes);
        		tabRow.appendChild(imgSrc);
        		tabRow.appendChild(imgTags);
                tabRow.appendChild(imgSel);
                tabRow.cells[0].onclick = showImg;
                tabRow.cells[1].onclick = selectUrl;
           		document.getElementById("data").appendChild(tabRow);
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

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function showImg () {
    var row = this.parentElement;
    var imgRow = row.nextSibling;
    var imgCell = imgRow.childNodes[0];
    if (imgRow.style.display == '') {
        imgRow.style.display = "none";
        row.style.backgroundColor = "#fff";
    }
    else {
        if (!imgCell.childNodes[0]){
            imgSrc = row.cells[1].innerText;
            if (endsWith(imgSrc, ".gifv")){
                imgSrc = imgSrc.substring(0, imgSrc.length - 4) + "webm";
            }
            if (endsWith(imgSrc, ".webm")){
                var img = document.createElement("video");
                type="video/webm";
                img.autoplay = true;
                img.loop = true;
                img.addEventListener('mouseover', function() { 
                    this.controls = true; }, false);
                img.addEventListener('mouseout', function() { 
                    this.controls = false; }, false);
            }
            else {
                var img = document.createElement("img");
            }
            var a = document.createElement('a');
            img.src = imgSrc;
            img.style.maxHeight = 380;
            img.style.maxWidth = "100%";
            a.href = img.src;
            a.appendChild(img);
            imgCell.appendChild(a);
            imgCell.childNodes[0].childNodes[0].onload = scrollToFit;
        }
        var tableHeight = 400;
        row.style.backgroundColor = "#f5f5fd"
        imgRow.style.display = '';
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

function selectImg(i) {
    iInSelectedRows = selectedRows.indexOf(i);
    if (iInSelectedRows == -1) {
        selectedRows.push(i);
    }
    else {
        selectedRows.splice(iInSelectedRows, 1);
    }
}

function searchImgs () {
    var rows = document.getElementById('data').rows;
    if (this.value == "") {
        incUrls.disabled="";
    }
    else {
        incUrls.disabled = "disabled";
    }
    if (searchUrls) {
        for (var i = 1; i < rows.length; i+=2) {
            if (rows[i].cells[2].innerText.indexOf(this.value) > -1 ||
                rows[i].cells[1].innerText.indexOf(this.value) > -1 ||
                rows[i].cells[0].innerText.indexOf(this.value) > -1) {
                rows[i].style.display = '';
            }
            else {
                rows[i].style.backgroundColor = '#fff';
                rows[i].style.display = 'none';
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
            if (rows[i].cells[2].innerText.indexOf(this.value) > -1 ||
                rows[i].cells[0].innerText.indexOf(this.value) > -1) {
                rows[i].style.display = '';
            }
            else {
                rows[i].style.backgroundColor = '#fff';
                rows[i].style.display = 'none';
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
document.getElementById('search').addEventListener('keyup', searchImgs);
document.getElementById('search').addEventListener('paste', searchImgs);
