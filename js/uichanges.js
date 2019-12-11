var uploadNextButton = null;
var progressBarDivTag = null;
var fileUploadDivTag = null;

window.onload = initialise;

function initialise(){
    uploadNextButton = document.getElementById("upload-next");
    fileUploadDivTag = document.getElementById('file-upload');
    progressBarDivTag = document.getElementById('progress-bar');
    
    uploadNextButton.onclick = function(){
        hideCloseButton();
        clearCanvas();
        displayFileUploadDiv();
    }
}

function displayUploadNextButton(){
    uploadNextButton.style.display = "block";
}

function hideUploadNextButton(){
    uploadNextButton.style.display = "none";
}

function hideFileUploadDiv(){
    fileUploadDivTag.style.display = "none";
}

function displayFileUploadDiv(){
    fileUploadDivTag.style.display = "block";
}

function displayProgressBar(){
    progressBarDivTag.style.display = "block";
}

function hideProgressBar(){
    progressBarDivTag.style.width = "0%";
    progressBarDivTag.style.display = "none";
}