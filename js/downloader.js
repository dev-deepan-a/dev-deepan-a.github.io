function download() {
//    console.log(wallTileCanvas.tagName);
//    image = wallTileCanvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
//
//    var link = document.createElement('a');
//    link.download = "my-image.png";
//    link.href = image;
//    link.click();
    createMergedImageLayer();
    var downloadCanvas = document.getElementById("mergedImageLayer");
    var downloadImage = downloadCanvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
    var link = document.createElement('a');
    link.download = "my-image.png";
    link.href = downloadImage;
    link.click();
    var downloadCanvasCtx = downloadCanvas.getContext("2d");
    downloadCanvasCtx.clearRect(0, 0, downloadCanvas.width, downloadCanvas.height);
}