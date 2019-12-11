window.onload = initialise;

var dragAndDropDiv = null;
var imgUploadBtn = null;

function initialise(){
    dragAndDropDiv = document.getElementById("img-upload");
    imgUploadBtn = document.getElementById("img-upload-input");
    imgUploadBtn.addEventListener("dragenter", onDragEnter, false);
    imgUploadBtn.addEventListener("dragleave", onDragLeave, false);
    imgUploadBtn.addEventListener("drop", onDragLeave, false);
}

function onDragEnter(){
    console.log("drag enter");
    if(dragAndDropDiv != null){
        dragAndDropDiv.style.backgroundColor = "1FB264";
        dragAndDropDiv.style.borderStyle = "dashed";
        dragAndDropDiv.style.borderWidth = "4px";
        dragAndDropDiv.style.borderColor = "ffffff";
    }
//    background-color: #1FB264;
//    border: 4px dashed #ffffff;
}

function onDragLeave(){
    console.log("drag leave");
    if(dragAndDropDiv != null){
        dragAndDropDiv.removeAttribute("style");
    }
}