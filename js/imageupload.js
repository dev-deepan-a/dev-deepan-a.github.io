var imageRecognitionUploadFolder = "data/image-recognition-data";
var selectedImage = null;
var uploadedImageName = null;
var imageRecognitionBucketName = "roomstyler-internal";
var imageRecognitionResultFolder = "data/web-search-data/";
var bucketRegion = "us-east-1";
var IdentityPoolId = "us-east-1:c4226877-5118-4b33-9965-ab529f62b91c";
var s3 = null;
var s3FileCheck = null;
initializeS3();


window.addEventListener('load', function() 
{
    document.querySelector('input[type="file"]').addEventListener('change', function() 
    {
        if (this.files && this.files[0]) 
        {
            selectedImage = this.files[0];
            drawSelectedImageOnCanvas();
        }
    });
});

function startRecognition()
{
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
            alert("uploaded successfully");
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
    var imageCanvas = document.getElementById('uploadedImage');  // $('img')[0]
    var imageCanvasCtx = imageCanvas.getContext("2d");
    var img = new Image();
    img.src = URL.createObjectURL(selectedImage); // set src to blob url
    img.onload = function()
    {
        imageCanvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
        var canvasDivSize = {width: imageCanvas.parentElement.clientWidth, height: imageCanvas.parentElement.clientHeight};

        var resizedImageResolution = calculateAspectRatioFit(img, canvasDivSize);

        imageCanvas.width = resizedImageResolution.width;
        imageCanvas.height = resizedImageResolution.height;
        imageCanvasCtx.drawImage(img, 0, 0, img.width, img.height,
                                0, 0, imageCanvas.width, imageCanvas.height);
    }
}

function process_result(result_content)
{
    console.log("processing results");
    
    result = JSON.parse(result_content);
    for(var key in result)
    {
        var bboxes = result[key][0].bounding_boxes;
        
        var canvas = document.getElementById('uploadedImage');
        var context = canvas.getContext('2d');

        var topLeftX = parseFloat(bboxes[1]) * canvas.scrollWidth;
        var topLeftY = parseFloat(bboxes[0]) * canvas.scrollHeight;
        var bottomRightX = parseFloat(bboxes[3]) * canvas.scrollWidth;
        var bottomRightY = parseFloat(bboxes[2]) * canvas.scrollHeight;

        width = bottomRightX - topLeftX;
        height = bottomRightY - topLeftY;
        
        context.beginPath();
        context.rect(topLeftX, topLeftY, width, height);
        context.lineWidth = 2;
        context.strokeStyle = 'red';
        context.stroke();
    }
    
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
    
    return resizedImageResolution;
}

function uuidv4() 
{
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
}