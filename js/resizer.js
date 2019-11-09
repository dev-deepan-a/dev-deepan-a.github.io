function resizeCanvasBasedOnWindowSize() {
    var roomIndex = 0;
    var roomButtons = document.getElementsByClassName("room-btn");
    for (i = 0; i < roomButtons.length; i++) {;
        if (roomButtons[i].className.includes('active')) {
            roomIndex = i;
        }
    }
    switch (roomIndex) {
        case 0:
            roomName = "Exterior";
            break;
        case 1:
            roomName = "Kitchen";
            break;
        case 2:
            roomName = "Kitchen01";
            break;
        case 3:
            roomName = "Living";
            break;
    }
    var canvas = document.getElementById("layer1");
    var ctx = canvas.getContext("2d");
    var image = new Image();
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
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
        image.src = "src/img/" + roomName + "_L.jpg"
    } else if (window.innerWidth <= 640) {
        image.src = "src/img/" + roomName + "_P.jpg"
    }

    resizeSubMenu('floor-grout-menu');
    resizeSubMenu('wall-grout-menu');
    resizeSubMenu('floor-tile-menu');
    resizeSubMenu('wall-tile-menu');
    resizeSubMenu('rooms');
}

function resizeSubMenu(menuName) {

    if (window.innerWidth >= 640) {
        document.getElementById(menuName).style.width = "0";
        document.getElementById("menu").style.marginLeft = "0";
        document.getElementById(menuName).style.height = "100%";
    } else {
        document.getElementById(menuName).style.height = "0";
        document.getElementById(menuName).style.width = "100%";
        document.getElementById("menu").style.marginBottom = "0";
    }

    loadDefaultMenuIcons();
    isGroutMenuOpen = false;
    isRoomMenuOpen = false;
}