var wallTileMenu = null;
var floorTileMenu = null;
var wallGroutMenu = null;
var floorGroutMenu = null;
var currentSelectedLanguage = "English";

function initializeApp() {
//    loadFloorGrouts("Kitchen");
//    loadWallGrouts();
//    loadWallTiles("kitchen");
//    loadFloorTiles("bath01");
}

// Function to load the grouts
function loadFloorGrouts(roomName)
{
    var floorGroutMenu = document.getElementById('floor-btn-group');

    while (floorGroutMenu.firstChild)
    {
        floorGroutMenu.removeChild(floorGroutMenu.firstChild);
    }

    var currentSelectedLanguage = document.getElementById("language-dropdown").value;

    for (i = 0; i < grouts.length; i++)
    {
        var currentHeaderName = getColorNameByLanguage(currentSelectedLanguage, i);
        if(currentHeaderName != " " && currentHeaderName != "")
        {
            var btn = document.createElement("BUTTON"); // Create a <button> element
            btn.classList.add('btn')
            btn.classList.add('floor-grout-btn')
            btn.style.backgroundColor = grouts[i].value;
            btn.setAttribute("colorName", currentHeaderName);

            btn.innerHTML = currentHeaderName; // Insert text
            if (i == 0)
            {
                btn.classList.add('active');
                changeFloorMenuHeaderName(currentHeaderName);
                changeFloorGrout(btn);
            }

            var buttonClass = document.createElement("DIV");
            buttonClass.innerHTML = grouts[i].className;
            buttonClass.classList.add('button-description');
            btn.appendChild(buttonClass);


            btn.onclick = function ()
            {
                changeFloorGrout(this);
                changeFloorMenuHeaderName(this.getAttribute("colorName"));
            }

            floorGroutMenu.appendChild(btn);
        }
    }
}

function loadWallGrouts(roomName)
{
    var wallGroutMenu = document.getElementById('wall-grout-btn-group');

    while (wallGroutMenu.firstChild)
    {
        wallGroutMenu.removeChild(wallGroutMenu.firstChild);
    }

    var currentSelectedLanguage = document.getElementById("language-dropdown").value;
    if(roomName != "Exterior01" && roomName != "Living01")
    {
        for (i = 0; i < grouts.length; i++)
        {
            var currentHeaderName = getColorNameByLanguage(currentSelectedLanguage, i);
            if(currentHeaderName != " " && currentHeaderName != "")
            {
                var btn = document.createElement("BUTTON"); // Create a <button> element
                btn.classList.add('btn')
                btn.classList.add('wall-grout-btn')
                btn.style.backgroundColor = grouts[i].value;
                btn.setAttribute("colorName", currentHeaderName);

                btn.innerHTML = currentHeaderName; // Insert text
                if (i == 0) {
                    btn.classList.add('active');
                    changeWallMenuHeaderName(currentHeaderName);
                    changeWallGrout(btn);
                }

                var buttonClass = document.createElement("DIV");
                buttonClass.innerHTML = grouts[i].className;
                buttonClass.classList.add('button-description');
                btn.appendChild(buttonClass);

                btn.onclick = function ()
                {
                    changeWallGrout(this);
                    changeWallMenuHeaderName(this.getAttribute("colorName"));
                }
                wallGroutMenu.appendChild(btn);
            }
        }
    }
}

function loadWallTiles(room)
{
    var wallTileMenu = document.getElementById('wall-tile-btn-group');

    while (wallTileMenu.firstChild)
    {
        wallTileMenu.removeChild(wallTileMenu.firstChild);
    }

    if(room != "Exterior01" && room != "Living01")
    {
        for (i = 0; i < 5; i++)
        {
            var btn = document.createElement("BUTTON"); // Create a <button> element
            btn.classList.add('btn')
            btn.classList.add('wall-tile-btn')
            btn.setAttribute("tileName", "WallTile"+i)
            btn.setAttribute("roomName", room)
            btn.style.backgroundImage = "url('src/thumbnails/wall_tiles/" + room + "/WallTile" + i + ".jpg')";
            if (i == 0)
            {
                btn.classList.add('active');
            }
            btn.onclick = function ()
            {
                changeWallTile(this);
            }
            wallTileMenu.appendChild(btn);
        }
    }
}

function loadFloorTiles(room)
{
    var floorTileMenu = document.getElementById('floor-tile-btn-group');

    while (floorTileMenu.firstChild)
    {
        floorTileMenu.removeChild(floorTileMenu.firstChild);
    }
    for (i = 0; i < 5; i++)
    {
        var btn = document.createElement("BUTTON"); // Create a <button> element
        btn.classList.add('btn')
        btn.classList.add('floor-tile-btn')
        btn.setAttribute("tileName", "FloorTile"+i)
        btn.setAttribute("roomName", room)
        btn.style.backgroundImage = "url('src/thumbnails/floor_tiles/" + roomName + "/FloorTile" + i + ".jpg')";

        if (i == 0) {
            btn.classList.add('active');
        }
        btn.onclick = function()
        {
            changeFloorTile(room, this);
        }
        floorTileMenu.appendChild(btn);
    }
}

function changeFloorGrout(currentButton) {
    var roomButtons = document.getElementsByClassName("floor-grout-btn");
    for (i = 0; i < roomButtons.length; i++) {
        roomButtons[i].classList.remove("active");
    }
    currentButton.classList.add('active');

    var floorGroutCanvas = document.getElementById("floorGroutLayer");
    changeFloorAndWallGroutImageColor(floorGroutCanvas, currentButton);
}

function changeFloorAndWallGroutImageColor(groutCanvas, currentBtn)
{
    var currentSelectedGroutColor = currentBtn.style.backgroundColor;
    var currentSelectedGroutColor = currentSelectedGroutColor.substring(4, currentSelectedGroutColor.length-1)
         .replace(/ /g, '')
         .split(',');

    var groutCanvasCtx = groutCanvas.getContext("2d");
    var imgData = groutCanvasCtx.getImageData(0, 0, groutCanvas.width, groutCanvas.height);

    for (var i = 0; i < imgData.data.length; i+= 4)
    {
      if(imgData.data[i+3] > 0)
      {
        imgData.data[i] = currentSelectedGroutColor[0];
        imgData.data[i+1] = currentSelectedGroutColor[1];
        imgData.data[i+2] = currentSelectedGroutColor[2];
        imgData.data[i+3] = 255;
      }
    }
    groutCanvasCtx.putImageData(imgData, 0, 0);
    invokeMagnify();
}

function changeFloorMenuHeaderName(headerName) {
    var header = document.getElementById("floor-grout-menu-header");
    if (header) {
        headerName = headerName.replace('CE40', '');
        headerName = headerName.replace('CE79', '');
        headerName = headerName.replace('CE89', '');
        header.children[0].innerHTML = headerName;
    }
}

function changeWallGrout(currentButton) {
    var roomButtons = document.getElementsByClassName("wall-grout-btn");
    for (i = 0; i < roomButtons.length; i++) {
        roomButtons[i].classList.remove("active");
    }
    currentButton.classList.add('active');

    var floorGroutCanvas = document.getElementById("wallGroutLayer");
    changeFloorAndWallGroutImageColor(floorGroutCanvas, currentButton);
}


function changeWallMenuHeaderName(headerName) {
    var header = document.getElementById("wall-grout-menu-header");
    if (header) {
        headerName = headerName.replace('CE40', '');
        headerName = headerName.replace('CE79', '');
        headerName = headerName.replace('CE89', '');
        header.children[0].innerHTML = headerName;
    }
}

function changeWallTile(currentButton) {
    var roomButtons = document.getElementsByClassName("wall-tile-btn");
    for (i = 0; i < roomButtons.length; i++) {
        roomButtons[i].classList.remove("active");
    }
    currentButton.classList.add('active');

    var wallTileCanvas = document.getElementById("wallTileLayer");
    var wallTileCanvasCtx = wallTileCanvas.getContext("2d");

    changeFloorAndWallTileImage(wallTileCanvasCtx, currentButton);
}


function changeWallTileMenuHeaderName(headerName) {
    var header = document.getElementById("wall-tile-menu-header");
    if (header) {
        headerName = headerName.replace('CE40', '');
        headerName = headerName.replace('CE79', '');
        headerName = headerName.replace('CE89', '');
        header.children[0].innerHTML = headerName;
    }
}

function changeFloorTile(room, currentButton) {
    var roomButtons = document.getElementsByClassName("floor-tile-btn");
    for (i = 0; i < roomButtons.length; i++) {
        roomButtons[i].classList.remove("active");
    }
    currentButton.classList.add('active');

    var floorTileCanvas = document.getElementById("floorTileLayer");
    var floorTileCanvasCtx = floorTileCanvas.getContext("2d");

    changeFloorAndWallTileImage(floorTileCanvasCtx, currentButton);
}


function changeFloorTileMenuHeaderName(headerName) {
    var header = document.getElementById("floor-tile-menu-header");
    if (header) {
        headerName = headerName.replace('CE40', '');
        headerName = headerName.replace('CE79', '');
        headerName = headerName.replace('CE89', '');
        header.children[0].innerHTML = headerName;
    }
}

function changeFloorAndWallTileImage(canvasCtx, currentButton)
{
    var tileName = currentButton.getAttribute("tileName");
    var room = currentButton.getAttribute("roomName");

    var tileImage = new Image();
    tileImage.onload = function () {
      if (window.innerWidth >= 640) {
        canvasCtx.canvas.width = tileImage.width;
        canvasCtx.canvas.height = tileImage.height;
      } else {
        canvasCtx.canvas.width = tileImage.width;
        canvasCtx.canvas.height = tileImage.height;
      }
      canvasCtx.drawImage(tileImage, 0, 0);
      invokeMagnify();
    }
    if (window.innerWidth >= 640) {
      tileImage.src = "src/img/" + room + "/" + tileName + "_L.png"
    } else if (window.innerWidth <= 640) {
      tileImage.src = "src/img/" + room + "/" + tileName + "_P.png"
    }
}

function getColorNameByLanguage(language, index)
{
    var colorName;
    switch(language)
    {
        case "German":
            colorName = grouts[index].colorName_German;
            break;
        case "Lithuanian":
            colorName = grouts[index].colorName_Lithuanian;
            break;
        case "Estonian":
            colorName = grouts[index].colorName_Estonian;
            break;
        case "Russian":
            colorName = grouts[index].colorName_Russian;
            break;
        case "Latvian":
            colorName = grouts[index].colorName_Latvian;
            break;
        case "BY":
            colorName = grouts[index].colorName_BY;
            break;
        case "BIH":
            colorName = grouts[index].colorName_BIH;
            break;
        case "Czech":
            colorName = grouts[index].colorName_CZ;
            break;
        case "Slovak":
            colorName = grouts[index].colorName_SK;
            break;
        case "Croatian":
            colorName = grouts[index].colorName_CRO;
            break;
        case "Slovenian":
            colorName = grouts[index].colorName_SLO;
            break;
        case "Romanian":
            colorName = grouts[index].colorName_Romanian;
            break;
        case "Hungarian":
            colorName = grouts[index].colorName_HU;
            break;
        case "Polish":
            colorName = grouts[index].colorName_Polski;
            break;
        default:
            colorName = grouts[index].colorName_English;
    }
    return colorName;
}

function changeLanguage()
{
    loadFloorGrouts(roomName);
    loadWallGrouts(roomName);
    currentSelectedLanguage = document.getElementById("language-dropdown").value;
    changeUIText();
}

function createMergedImageLayer()
{
    console.log("creating merged image");
    var baseCanvas = document.getElementById("baseLayer");
    var floorGroutCanvas = document.getElementById("floorGroutLayer");
    var wallGroutCanvas = document.getElementById("wallGroutLayer");
    var floorTileCanvas = document.getElementById("floorTileLayer");
    var wallTileCanvas = document.getElementById("wallTileLayer");
    var glassCanvas = document.getElementById("glassLayer");
    var downloadCanvas = document.getElementById("mergedImageLayer");

    var downloadCanvasCtx = downloadCanvas.getContext("2d");
    downloadCanvasCtx.clearRect(0, 0, downloadCanvas.width, downloadCanvas.height);
    downloadCanvas.width = baseCanvas.width;
    downloadCanvas.height = baseCanvas.height;
    // Draw the layers in order
    downloadCanvasCtx.drawImage(baseCanvas, 0, 0);
    downloadCanvasCtx.drawImage(floorGroutCanvas, 0, 0);
    downloadCanvasCtx.drawImage(floorTileCanvas, 0, 0);
    downloadCanvasCtx.drawImage(wallGroutCanvas, 0, 0);
    downloadCanvasCtx.drawImage(wallTileCanvas, 0, 0);
    downloadCanvasCtx.drawImage(glassCanvas, 0, 0);
}