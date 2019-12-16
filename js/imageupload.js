var imageRecognitionUploadFolder = "data/image-recognition-data";
var selectedImage = null;
var uploadedImageName = null;
var imageRecognitionBucketName = "roomstyler-internal";
var imageRecognitionResultFolder = "data/web-search-data/";
var bucketRegion = "us-east-1";
var IdentityPoolId = "us-east-1:c4226877-5118-4b33-9965-ab529f62b91c";
var s3 = null;
var s3FileCheck = null;
var context = null;
var canvas = null;
var currentSelectedDiv = null;
var progressBar = null;
var progressCheck = null;
initializeS3();


window.addEventListener('load', function() 
{
    document.getElementById("img-upload-input").addEventListener('change', function() 
    {
        if (this.files && this.files[0]) 
        {
            selectedImage = this.files[0];
//            loadResultsPlaceholders();
            progressBar = document.getElementById("progress-value");
            hideFileUploadDiv();
            hideUploadNextButton();
            displayProgressBar();
            startRecognition();
        }
    });
    document.getElementById("next-img-upload-input").addEventListener('change', function() 
    {
        if (this.files && this.files[0]) 
        {
            selectedImage = this.files[0];
            clearCanvas();
            clearResults();
            displayFileUploadDiv();
//            loadResultsPlaceholders();
            progressBar = document.getElementById("progress-value");
            hideFileUploadDiv();
            hideUploadNextButton();
            displayProgressBar();
            startRecognition();
        }
    });
});

function startRecognition()
{
    progressCheck = setInterval(changeProgressBar, 2000);
    
    uploadedImageName = "";
    s3Upload(selectedImage);
    s3FileCheck = window.setInterval(s3GetObjects, 2000);
}

function initializeS3()
{   
    AWS.config.update({
      region: bucketRegion,
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId
      })
    });

    s3 = new AWS.S3({
      apiVersion: "2006-03-01",
      params: { Bucket: imageRecognitionBucketName }
    });   
}

function s3Upload(file)
{    
    var extension = file.name.split('.').pop();
    uploadedImageName = uuidv4() + "." + extension;
    var keyName = imageRecognitionUploadFolder + "/" + uploadedImageName;
    var params = {
        Bucket: imageRecognitionBucketName,
        Key: keyName,
        Body: file
    };
    
    s3.upload(params,function(err, data)
    {
        if(err)    
        {
            alert("upload failed: + "+err.message);
            console.log(err);
        }
        else
        {
            clearInterval(progressCheck);
            progressCheck = setInterval(changeProgressBar, 200);
            console.log(data);   
        }
    });
}

function s3GetObjects()
{
    s3.listObjects({Prefix: imageRecognitionResultFolder}, function(err, data)
    {
        var result_json_file_name = uploadedImageName.split('.')[0]
        console.log("waiting for the file " + result_json_file_name);
        if(!err)
        {
            var bucketObjects = data.Contents;
            for(var index in bucketObjects)
            {
                var objectKey = bucketObjects[index].Key;
                if(objectKey.includes(result_json_file_name)) 
                {
                    console.log("result is ready");
                    var s3 = new AWS.S3();
                    var json_key = imageRecognitionResultFolder + result_json_file_name+".json"
                    var params = {Bucket: imageRecognitionBucketName, Key: json_key}
                    s3.getObject(params, function(error, response)
                    {
                        if(error)    
                            console.log(error.message);
                        else    
                        {
                            process_result(response.Body.toString('utf-8'));
                        }
                    });
                    clearInterval(s3FileCheck);
                }
            }
        }
        else
        {
            clearInterval(s3FileCheck);
            console.log(err.message);    
        }
    });
}

function drawSelectedImageOnCanvas()
{    
    var canvasContainer = document.getElementById('canvas-container');
    var imageCanvas = document.getElementById('uploadedImage');  // $('img')[0]
    var imageCanvasCtx = imageCanvas.getContext("2d");
    var img = new Image();
    img.src = URL.createObjectURL(selectedImage); // set src to blob url
    img.onload = function()
    {
        imageCanvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
        var canvasDivSize = {width: canvasContainer.clientWidth, height: canvasContainer.clientHeight};

        var resizedImageResolution = calculateAspectRatioFit(img, canvasDivSize);

//        canvasContainer.style.width = resizedImageResolution.width + 'px';
//        canvasContainer.style.height = resizedImageResolution.height + 'px';
//        canvasContainer.width = resizedImageResolution.width;
//        canvasContainer.height = resizedImageResolution.height;
        imageCanvas.width = resizedImageResolution.width;
        imageCanvas.height = resizedImageResolution.height;
        imageCanvas.style.width = resizedImageResolution.width + 'px';
        imageCanvas.style.height = resizedImageResolution.height + 'px';
        imageCanvasCtx.drawImage(img, 0, 0, img.width, img.height,
                                0, 0, imageCanvas.width, imageCanvas.height);
    }
    
    imageCanvas.onclick = function(){
        if(currentSelectedDiv != null){
            console.log("clearing the selected div");
            setCanvasOpaque(currentSelectedDiv);
            currentSelectedDiv = null;
        }
    }
}

function process_result(result_content)
{
    console.log("processing results");
    
    result = JSON.parse(result_content);
    
    var lastCropSelection = null;
    
    for(var key in result){
        if(result[key][0]["similar_products"].length > 0){
            var bboxes = result[key][0].bounding_boxes;
        
            canvas = document.getElementById('uploadedImage');
            context = canvas.getContext('2d');

            var topLeftX = parseFloat(bboxes[1]) * canvas.scrollWidth;
            var topLeftY = parseFloat(bboxes[0]) * canvas.scrollHeight;
            var bottomRightX = parseFloat(bboxes[3]) * canvas.scrollWidth;
            var bottomRightY = parseFloat(bboxes[2]) * canvas.scrollHeight;

            width = bottomRightX - topLeftX;
            height = bottomRightY - topLeftY;

            var leftPos = (topLeftX+bottomRightX)/2;
            var topPos = (topLeftY+bottomRightY)/2;    

            // create a crop selection div tag
            var cropSelection = createCropSelection(topLeftX, topLeftY, width, height, key);

            // create the hotspot button
            createHotspotButtonOnCropSelection(cropSelection);
            
            // add the cropSelection div tag to the canvas
            var canvasArea = document.getElementById('canvas-container');
            canvasArea.appendChild(cropSelection);
            
            lastCropSelection = cropSelection;
        }
    }
    
    setCanvasTransparent(lastCropSelection);
    currentSelectedDiv = lastCropSelection;
    hideCropPreview(lastCropSelection);
    
    load_results(result_content);
}

function calculateAspectRatioFit(img, canvasDivSize) 
{
    var aspectRatio = (img.width/img.height);
    var minResolution = Math.min(canvasDivSize.width, canvasDivSize.height);
    var resizedImageResolution = {width: minResolution, height: minResolution};

    if(aspectRatio >1)
    {
        var scalingFactor = canvasDivSize.width/(canvasDivSize.height * aspectRatio);
        var resizedHeight = scalingFactor * canvasDivSize.height;
        resizedImageResolution = {width: canvasDivSize.width, 
                                     height: resizedHeight};
    }

    if(aspectRatio < 1)
    {
        var scalingFactor = (canvasDivSize.height * aspectRatio)/canvasDivSize.width;
        var resizedWidth = scalingFactor * canvasDivSize.width;
        resizedImageResolution = {width: resizedWidth, 
                                     height: canvasDivSize.height};    
    }
    
    console.log(canvasDivSize);
    console.log(resizedImageResolution);
    
    return resizedImageResolution;
}

function createCropSelection(topLeftX, topLeftY, width, height, key){
    var cropSelection = document.createElement('DIV');
    cropSelection.className = "cropSelection";
    cropSelection.setAttribute("name", key);
    cropSelection.style.width = width+'px';
    cropSelection.style.height = height+'px';
    cropSelection.style.left = topLeftX +'px';
    cropSelection.style.top = topLeftY +'px';
    cropSelection.setAttribute("left", topLeftX);
    cropSelection.setAttribute("top", topLeftY);
    cropSelection.setAttribute("width", width);
    cropSelection.setAttribute("height", height);
    return cropSelection;
}

function createHotspotButtonOnCropSelection(cropSelection){
    var hotspotButton = document.createElement('BUTTON');
    hotspotButton.style.width = '36px';
    hotspotButton.style.height = '36px';
    hotspotButton.style.position = "absolute";
    hotspotButton.style.textShadow = "none";
    hotspotButton.style.border = "none";
    hotspotButton.style.backgroundColor = "transparent";
    hotspotButton.style.outline = "none";
    hotspotButton.innerHTML = '<img style="position: relative;width: 15px; height: 15px;" src="src/images/hotspot.png" />';
    
    // make the hotspot button as a child of cropSelection div tag to place it in the center
    cropSelection.appendChild(hotspotButton);
    
    hotspotButton.onmouseover = function(){
        if(currentSelectedDiv == null || currentSelectedDiv != this.parentElement)
            displayCropPreview(this.parentElement);
    }

    hotspotButton.onmouseout = function(){
        if(currentSelectedDiv == null){
            setCanvasOpaque(this.parentElement);
        }
        else{
            setCanvasTransparent(this.parentElement);
            hideCropPreview(currentSelectedDiv);
        }
    }

    hotspotButton.onclick = function(){
        setCanvasTransparent(currentSelectedDiv);
        currentSelectedDiv = this.parentElement;
        hideCropPreview(this.parentElement);
        clearResults();
        displayResultsForCurrentProduct(this.parentElement.getAttribute("name"));
    }
    
    return hotspotButton;
}

function displayCropPreview(btnParent){
    var left = parseFloat(btnParent.getAttribute("left"));
    var top = parseFloat(btnParent.getAttribute("top"));
    var width = parseFloat(btnParent.getAttribute("width"));
    var height = parseFloat(btnParent.getAttribute("height"));
    
    btnParent.style.borderStyle = "solid";
    btnParent.style.borderColor = "lightgray";
    btnParent.style.borderWidth = "2px";
    
    console.log(left);
    
    var imgData = context.getImageData(left, top, width, height);
    for (var i = 0; i < imgData.data.length; i+= 4){
        if(imgData.data[i+3] > 0){
            imgData.data[i+3] = 128;
        }
    }
    context.putImageData(imgData, left, top);
}

function hideCropPreview(btnParent){
    var left = parseFloat(btnParent.getAttribute("left"));
    var top = parseFloat(btnParent.getAttribute("top"));
    var width = parseFloat(btnParent.getAttribute("width"));
    var height = parseFloat(btnParent.getAttribute("height"));
    
    btnParent.style.borderStyle = "solid";
    btnParent.style.borderColor = "#04a0f7";
    btnParent.style.borderWidth = "2px";
    
    var imgData = context.getImageData(left, top, width, height);
    for (var i = 0; i < imgData.data.length; i+= 4){
        if(imgData.data[i+3] > 0){
            imgData.data[i+3] = 255;
        }
    }
    context.putImageData(imgData, left, top);
}

function setCanvasTransparent(btnParent){
    var width = canvas.width;
    var height = canvas.height;
    var imgData = context.getImageData(0, 0, width, height);
    for (var i = 0; i < imgData.data.length; i+= 4){
        if(imgData.data[i+3] > 0){
            imgData.data[i+3] = 100;
        }
    }
    context.putImageData(imgData, 0, 0);
    
    if(btnParent != null)
        btnParent.style.border = "none";
}

function clearCanvas(){
    if(context != null && canvas != null)
        context.clearRect(0, 0, canvas.width, canvas.height);
    
    var canvasArea = document.getElementById('canvas-container');
    
    console.log(canvasArea);
    console.log(canvasArea.children.length);
    console.log(canvasArea.children[0]);
    
    var child = canvasArea.lastElementChild; 
    while (child) { 
        if(canvasArea.children.length == 1)
            child = null;
        else{
            canvasArea.removeChild(child);        
            child = canvasArea.lastElementChild; 
        }
    }
    
    for(var i = 0; i < canvasArea.children.length; i++){
        if(canvasArea.children[i].className == "cropSelection")
            canvasArea.removeChild(canvasArea.children[i]);
    }
}

function setCanvasOpaque(btnParent){
    var width = canvas.width;
    var height = canvas.height;
    var imgData = context.getImageData(0, 0, width, height);
    for (var i = 0; i < imgData.data.length; i+= 4){
        if(imgData.data[i+3] > 0){
            imgData.data[i+3] = 255;
        }
    }
    context.putImageData(imgData, 0, 0);
    
    if(btnParent != null)
        btnParent.style.border = "none";
}

function uuidv4() 
{
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
}