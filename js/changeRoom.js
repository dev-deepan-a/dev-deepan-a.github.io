var roomName = "";
var canvas = null;
var floorTileCanvas = null;
var wallTileCanvas = null;
var floorGroutCanvas = null;
var wallGroutCanvas = null;

var isFloorGroutLayerLoaded = false;
var isWallGroutLayerLoaded = false;
var isWallTileLayerLoaded = false;
var isFloorTileLayerLoaded = false;
var isBaseLayerLoaded = false;
var isGlassLayerLoaded = false;

function changeRoom(roomIndex, currentButton) 
{
    isFloorGroutLayerLoaded = isWallGroutLayerLoaded = isWallTileLayerLoaded = isFloorTileLayerLoaded =
    isBaseLayerLoaded = isGlassLayerLoaded = false;

    var roomButtons = document.getElementsByClassName("room-btn");
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

    console.log(roomName);

    //base layer
    var canvas = document.getElementById("baseLayer");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var image = new Image();
    image.onload = function () {
        if (window.innerWidth >= 640) {
            ctx.canvas.width = image.width;
            ctx.canvas.height = image.height;
        } else {
            ctx.canvas.width = image.width;
            ctx.canvas.height = image.height;
        }
        canvas.setAttribute("imageSource", image.src);
        ctx.drawImage(image, 0, 0);
        isBaseLayerLoaded = true;
        invokeMagnify();
    };
    image.onerror = function()
    {
        isBaseLayerLoaded = true;
        invokeMagnify();
    };

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
            } else {
                glassCtx.canvas.width = image2.width;
                glassCtx.canvas.height = image2.height;
            }
            glassCanvas.setAttribute("imageSource", image2.src);
            glassCtx.drawImage(image2, 0, 0);
            isGlassLayerLoaded = true;
            invokeMagnify();
        };
        image2.onerror = function()
        {
            isGlassLayerLoaded = true;
            invokeMagnify();
        }

        if (window.innerWidth >= 640) {
            image2.src = "src/img/" + roomName + "/BaseGlass_L.png"

        } else if (window.innerWidth <= 640) {
            image2.src = "src/img/" + roomName + "/BaseGlass_P.png"
        }
    }
    else
    {
        isGlassLayerLoaded = true;
        invokeMagnify();
    }
//    magnify('baseLayer', 2);

    //floor grout layer
    if(window.floorGroutCanvas == null)
    {
        window.floorGroutCanvas = document.getElementById("floorGroutLayer");
    }
    var floorGroutCanvasCtx = window.floorGroutCanvas.getContext("2d");
    var floorGroutImage = new Image();
    floorGroutCanvasCtx.clearRect(0, 0, canvas.width, canvas.height);

    floorGroutImage.onload = function ()
    {
        if (window.innerWidth >= 640)
        {
            floorGroutCanvasCtx.canvas.width = floorGroutImage.width;
            floorGroutCanvasCtx.canvas.height = floorGroutImage.height;
        }
        else
        {
            floorGroutCanvasCtx.canvas.width = floorGroutImage.width;
            floorGroutCanvasCtx.canvas.height = floorGroutImage.height;
        }
        floorGroutCanvas.setAttribute("imageSource", floorGroutImage.src);
        floorGroutCanvasCtx.drawImage(floorGroutImage, 0, 0);
        isFloorGroutLayerLoaded = true;
        invokeMagnify();
    };
    floorGroutImage.onerror = function()
    {
        isFloorGroutLayerLoaded = true;
        invokeMagnify();
    }

    if (window.innerWidth >= 640)
    {
        floorGroutImage.src = "src/img/" + roomName + "/FloorGrout_L.png"
    }
    else if (window.innerWidth <= 640)
    {
        floorGroutImage.src = "src/img/" + roomName + "/FloorGrout_P.png"
    }

//    magnify('baseLayer', 2);

    //floor tile layer
    if(window.floorTileCanvas == null)
    {
        window.floorTileCanvas = document.getElementById("floorTileLayer");
    }

    var floorTileCanvasCtx = window.floorTileCanvas.getContext("2d");
    var floorTileImage = new Image();
    floorTileCanvasCtx.clearRect(0, 0, canvas.width, canvas.height);

    var floorTileImageURL = "src/img/" + roomName + "/FloorTile0_L.png";

    floorTileImage.onload = function ()
    {
        if (window.innerWidth >= 640) {
            floorTileCanvasCtx.canvas.width = floorTileImage.width;
            floorTileCanvasCtx.canvas.height = floorTileImage.height;
        } else {
            floorTileCanvasCtx.canvas.width = floorTileImage.width;
            floorTileCanvasCtx.canvas.height = floorTileImage.height;
        }
        floorTileCanvas.setAttribute("imageSource", floorTileImage.src);
        floorTileCanvasCtx.drawImage(floorTileImage, 0, 0);
        isFloorTileLayerLoaded = true;
        invokeMagnify();
    };
    floorTileImage.onerror = function()
    {
        isFloorTileLayerLoaded = true;
        invokeMagnify();
    }

    if (window.innerWidth >= 640)
    {
        floorTileImage.src = "src/img/" + roomName + "/FloorTile0_L.png"
    }
    else if (window.innerWidth <= 640)
    {
        floorTileImage.src = "src/img/" + roomName + "/FloorTile0_P.png"
    }

    //wall grout layer
    if(window.wallGroutCanvas == null)
    {
        window.wallGroutCanvas = document.getElementById("wallGroutLayer");
    }
    var wallGroutCanvasCtx = window.wallGroutCanvas.getContext("2d");
    var wallGroutImage = new Image();
    wallGroutCanvasCtx.clearRect(0, 0, canvas.width, canvas.height);

    wallGroutImage.onload = function ()
    {
        if (window.innerWidth >= 640) {
            wallGroutCanvasCtx.canvas.width = wallGroutImage.width;
            wallGroutCanvasCtx.canvas.height = wallGroutImage.height;
        } else {
            wallGroutCanvasCtx.canvas.width = wallGroutImage.width;
            wallGroutCanvasCtx.canvas.height = wallGroutImage.height;
        }

        wallGroutCanvas.setAttribute("imageSource", wallGroutImage.src);
        wallGroutCanvasCtx.drawImage(wallGroutImage, 0, 0);
        isWallGroutLayerLoaded = true;
        invokeMagnify();
    };
    wallGroutImage.onerror = function()
    {
        isWallGroutLayerLoaded = true;
        invokeMagnify();
    }

    if (window.innerWidth >= 640)
    {
        wallGroutImage.src = "src/img/" + roomName + "/WallGrout_L.png"
    }
    else if (window.innerWidth <= 640)
    {
        wallGroutImage.src = "src/img/" + roomName + "/WallGrout_P.png"
    }

    //wall tile layer
    if(window.wallTileCanvas == null)
    {
        window.wallTileCanvas = document.getElementById("wallTileLayer");
    }

    var wallTileCanvasCtx = window.wallTileCanvas.getContext("2d");
    var wallTileImage = new Image();
    wallTileCanvasCtx.clearRect(0, 0, canvas.width, canvas.height);

    wallTileImage.onload = function ()
    {
        if (window.innerWidth >= 640) {
            wallTileCanvasCtx.canvas.width = wallTileImage.width;
            wallTileCanvasCtx.canvas.height = wallTileImage.height;
        } else {
            wallTileCanvasCtx.canvas.width = wallTileImage.width;
            wallTileCanvasCtx.canvas.height = wallTileImage.height;
        }
        wallTileCanvas.setAttribute("imageSource", wallTileImage.src);
        wallTileCanvasCtx.drawImage(wallTileImage, 0, 0);
        isWallTileLayerLoaded = true;
        invokeMagnify();
    };
    wallTileImage.onerror = function()
    {
        isWallTileLayerLoaded = true;
        invokeMagnify();
    }

    if (window.innerWidth >= 640)
    {
        wallTileImage.src = "src/img/" + roomName + "/WallTile0_L.png"
    }
    else if (window.innerWidth <= 640)
    {
        wallTileImage.src = "src/img/" + roomName + "/WallTile0_P.png"
    }

    changeRoomMenuHeaderName(roomName);
    loadFloorGrouts(roomName);
    loadWallGrouts(roomName);
    loadWallTiles(roomName);
    loadFloorTiles(roomName);
}

function changeRoomMenuHeaderName(headerName) {

    var header = document.getElementById("room-menu-header");
    if (header) {
        var name = getRoomNameBasisLanguage(headerName);
        header.children[0].innerHTML = name;
    }
}

function invokeMagnify()
{
    if(isBaseLayerLoaded && isGlassLayerLoaded && isFloorGroutLayerLoaded && isWallGroutLayerLoaded &&
    isWallTileLayerLoaded && isFloorTileLayerLoaded)
    {
        console.log("entering");
        createMergedImageLayer();
        magnify("mergedImageLayer", 2);
    }
    else
    {
        console.log("not entering");
    }
}