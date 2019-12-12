var uploadNextDiv = null;
var uploadNextInputBtn = null;
var progressBarDivTag = null;
var progressDivTag = null;
var fileUploadDivTag = null;

window.onload = initialise;

function initialise(){
    uploadNextDiv = document.getElementById("upload-next");
    uploadNextInputBtn = document.getElementById("next-img-upload-input");
    fileUploadDivTag = document.getElementById('file-upload');
    progressBarDivTag = document.getElementById('progress-bar');
    progressDivTag = document.getElementById('progress-value');
}

function displayUploadNextButton(){
    uploadNextInputBtn.removeAttribute("disabled");
    uploadNextInputBtn.style.cursor = "pointer";
    uploadNextDiv.style.opacity = "100%";
}

function hideUploadNextButton(){
    uploadNextInputBtn.setAttribute("disabled", "disabled");
    uploadNextInputBtn.style.cursor = "default";
    uploadNextDiv.style.opacity = "25%";
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
    progressDivTag.style.width = "0%";
    progressBarDivTag.style.display = "none";
}

function changeProgressBar(){
    var widthPercent = progressDivTag.style.width;
    var width = parseInt(widthPercent.toString().replace('%', '')) + 5;
    progressDivTag.style.width = width+'%';
    console.log('increasing the progress');
    
    if(width == 100){
        clearInterval(progressCheck);
        hideProgressBar();
        drawSelectedImageOnCanvas();
        loadResultsPlaceholders();
    }
}