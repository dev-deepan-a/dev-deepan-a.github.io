var roomName = "";

function changeRoom(roomIndex, currentButton) 
{
    console.log(currentButton)
    var roomButtons = document.getElementsByClassName("room-btn");
    console.log(roomButtons.length);
    for (i = 0; i < roomButtons.length; i++) {
        roomButtons[i].classList.remove("active");
    }

    switch (roomIndex) {
        case 0:
            roomName = "Exterior01";
            $(currentButton).addClass('active');
            break;
        case 1:
            roomName = "Kitchen01";
            $(currentButton).addClass('active');
            break;
        case 2:
            roomName = "Kitchen02";
            $(currentButton).addClass('active');
            break;
        case 3:
            roomName = "Living01";
            $(currentButton).addClass('active');
            break;
        case 4:
            roomName = "Bath01";
            $(currentButton).addClass('active');
            break;
    }
    changeRoomMenuHeaderName(roomName);
    loadFloorGrouts(roomName);
    loadWallGrouts(roomName);
    loadWallTiles(roomName);
    loadFloorTiles(roomName);
    //base layer
    var canvas = document.getElementById("baseLayer");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var image = new Image();
    // image.src = "src/img/Exterior_P.jpg";
    image.onload = function () {
        if (window.innerWidth >= 640) {
            ctx.canvas.width = image.width;
            ctx.canvas.height = image.height;
            // image.src = "src/img/Exterior_L.jpg"
        } else {
            ctx.canvas.width = image.width;
            ctx.canvas.height = image.height;
            // image.src = "src/img/Exterior_P.jpg"
        }
        ctx.drawImage(image, 0, 0);
    }

    if (window.innerWidth >= 640) {
        image.src = "src/img/" + roomName + "/Base_L.png"

    } else if (window.innerWidth <= 640) {
        image.src = "src/img/" + roomName + "/Base_P.png"
    }

    var glassCanvas = document.getElementById("glassLayer");
    var glassCtx = glassCanvas.getContext("2d");
    glassCtx.clearRect(0, 0, canvas.width, canvas.height);
    if(roomName == "Bath01")
    {
        var image2 = new Image();
        image2.onload = function ()
        {
            if (window.innerWidth >= 640) {
                glassCtx.canvas.width = image2.width;
                glassCtx.canvas.height = image2.height;
                // image.src = "src/img/Exterior_L.jpg"
            } else {
                glassCtx.canvas.width = image2.width;
                glassCtx.canvas.height = image2.height;
                // image.src = "src/img/Exterior_P.jpg"
            }
            glassCtx.drawImage(image2, 0, 0);
        }

        if (window.innerWidth >= 640) {
            image2.src = "src/img/" + roomName + "/BaseGlass_L.png"

        } else if (window.innerWidth <= 640) {
            image2.src = "src/img/" + roomName + "/BaseGlass_P.png"
        }
    }
//    magnify('baseLayer', 2);

    //floor grout layer
    var floorGroutCanvas = document.getElementById("floorGroutLayer");
    var floorGroutCanvasCtx = floorGroutCanvas.getContext("2d");
    var floorGroutImage = new Image();
    floorGroutCanvasCtx.clearRect(0, 0, canvas.width, canvas.height);

    var floorGroutImageURL = "src/img/" + roomName + "/FloorGrout_L.png";

    var imageStatus = checkIfImageExists(floorGroutImageURL);

    if(imageStatus == 200)
    {
        floorGroutImage.onload = function ()
        {
            if (window.innerWidth >= 640)
            {
                floorGroutCanvasCtx.canvas.width = floorGroutImage.width;
                floorGroutCanvasCtx.canvas.height = floorGroutImage.height;
                // image.src = "src/img/Exterior_L.jpg"
            }
            else
            {
                floorGroutCanvasCtx.canvas.width = floorGroutImage.width;
                floorGroutCanvasCtx.canvas.height = floorGroutImage.height;
                // image.src = "src/img/Exterior_P.jpg"
            }
            floorGroutCanvasCtx.drawImage(floorGroutImage, 0, 0);
        }

        if (window.innerWidth >= 640)
        {
            floorGroutImage.src = "src/img/" + roomName + "/FloorGrout_L.png"
        }
        else if (window.innerWidth <= 640)
        {
            floorGroutImage.src = "src/img/" + roomName + "/FloorGrout_P.png"
        }
    }
    else
    {
        console.log(floorGroutImageURL + " is not available");
    }

//    magnify('baseLayer', 2);

    //floor tile layer
    var floorTileCanvas = document.getElementById("floorTileLayer");
    var floorTileCanvasCtx = floorTileCanvas.getContext("2d");
    var floorTileImage = new Image();
    floorTileCanvasCtx.clearRect(0, 0, canvas.width, canvas.height);

    var floorTileImageURL = "src/img/" + roomName + "/FloorTile0_L.png";

    var imageStatus = checkIfImageExists(floorTileImageURL);
    if(imageStatus == 200)
    {
        floorTileImage.onload = function ()
        {
            if (window.innerWidth >= 640) {
                floorTileCanvasCtx.canvas.width = floorTileImage.width;
                floorTileCanvasCtx.canvas.height = floorTileImage.height;
            } else {
                floorTileCanvasCtx.canvas.width = floorTileImage.width;
                floorTileCanvasCtx.canvas.height = floorTileImage.height;
            }
            floorTileCanvasCtx.drawImage(floorTileImage, 0, 0);
        }

        if (window.innerWidth >= 640)
        {
            floorTileImage.src = "src/img/" + roomName + "/FloorTile0_L.png"
        }
        else if (window.innerWidth <= 640)
        {
            floorTileImage.src = "src/img/" + roomName + "/FloorTile0_P.png"
        }
    }
    else
    {
        console.log(floorTileImageURL + " is not available");
    }

    //wall grout layer
    var wallGroutCanvas = document.getElementById("wallGroutLayer");
    var wallGroutCanvasCtx = wallGroutCanvas.getContext("2d");
    var wallGroutImage = new Image();
    wallGroutCanvasCtx.clearRect(0, 0, canvas.width, canvas.height);

    var wallGroutImageURL = "src/img/" + roomName + "/WallGrout_L.png";

    var imageStatus = checkIfImageExists(wallGroutImageURL);
    if(imageStatus == 200)
    {
        wallGroutImage.onload = function ()
        {
            if (window.innerWidth >= 640) {
                wallGroutCanvasCtx.canvas.width = wallGroutImage.width;
                wallGroutCanvasCtx.canvas.height = wallGroutImage.height;
            } else {
                wallGroutCanvasCtx.canvas.width = wallGroutImage.width;
                wallGroutCanvasCtx.canvas.height = wallGroutImage.height;
            }
            wallGroutCanvasCtx.drawImage(wallGroutImage, 0, 0);
        }

        if (window.innerWidth >= 640)
        {
            wallGroutImage.src = "src/img/" + roomName + "/WallGrout_L.png"
        }
        else if (window.innerWidth <= 640)
        {
            wallGroutImage.src = "src/img/" + roomName + "/WallGrout_P.png"
        }
    }
    else
    {
        console.log(wallGroutImageURL + " is not available");
    }

    //wall tile layer
    var wallTileCanvas = document.getElementById("wallTileLayer");
    var wallTileCanvasCtx = wallTileCanvas.getContext("2d");
    var wallTileImage = new Image();
    wallTileCanvasCtx.clearRect(0, 0, canvas.width, canvas.height);

    var wallTileImageURL = "src/img/" + roomName + "/WallTile0_L.png";

    var imageStatus = checkIfImageExists(wallTileImageURL);
    if(imageStatus == 200)
    {
        wallTileImage.onload = function ()
        {
            if (window.innerWidth >= 640) {
                wallTileCanvasCtx.canvas.width = wallTileImage.width;
                wallTileCanvasCtx.canvas.height = wallTileImage.height;
            } else {
                wallTileCanvasCtx.canvas.width = wallTileImage.width;
                wallTileCanvasCtx.canvas.height = wallTileImage.height;
            }
            wallTileCanvasCtx.drawImage(wallTileImage, 0, 0);
        }

        if (window.innerWidth >= 640)
        {
            wallTileImage.src = "src/img/" + roomName + "/WallTile0_L.png"
        }
        else if (window.innerWidth <= 640)
        {
            wallTileImage.src = "src/img/" + roomName + "/WallTile0_P.png"
        }
    }
    else
    {
        console.log(wallTileImageURL + " is not available");
    }
}

function checkIfImageExists(image_url)
{
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', image_url, false);
    xhr.send(null);
    return xhr.status;
}

function changeRoomMenuHeaderName(headerName) {
    var header = document.getElementById("room-menu-header");
    if (header) {
        header.children[0].innerHTML = headerName;
    }
}