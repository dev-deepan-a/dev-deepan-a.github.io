var isMenuOpen = false;
var isGroutMenuOpen = false;
var isWallGroutMenuOpen = false;
var isWallTileMenuOpen = false;
var isFloorTileMenuOpen = false;
var isRoomMenuOpen = false;
var groutMenu = null;
var wallGroutMenu = null;
var roomMenu = null;
var wallTileMenu = null;
var floorTileMenu = null;

var activeMenu = null;

function initializeMenu() {
    groutMenu = document.getElementById('floor-grout-menu');
    wallGroutMenu = document.getElementById('wall-grout-menu');
    wallTileMenu = document.getElementById('wall-tile-menu');
    floorTileMenu = document.getElementById('floor-tile-menu');
    roomMenu = document.getElementById('rooms');
}

function toggleMenu(menuName) {
    isMenuOpen = !isMenuOpen;

    if (isMenuOpen) {
        openNav(menuName);
    } else {
        closeNav(menuName);
    }
}

function toggleGroutMenu(inputElement, menuName) {

    groutMenu = document.getElementById('floor-grout-menu');
    if (groutMenu) {
        if (!isGroutMenuOpen) {
            if (activeMenu != null && activeMenu != groutMenu) {
                hidePreviousActiveMenu();
            }
            inputElement.src = "src/img/ui/floor_grout_active.png";
            isGroutMenuOpen = true;
            activeMenu = groutMenu;
            openNav(menuName);
        } else {
            inputElement.src = "src/img/ui/floor_grout_default.png";
            closeNav(menuName);
            isGroutMenuOpen = false;
            activeMenu = null;
        }
    }
}

function toggleWallGroutMenu(inputElement, menuName) {

    wallGroutMenu = document.getElementById('wall-grout-menu');
    if (wallGroutMenu) {
        if (!isWallGroutMenuOpen) {
            if (activeMenu != null && activeMenu != wallGroutMenu) {
                hidePreviousActiveMenu();
            }
            inputElement.src = "src/img/ui/wall_grout_active.png";
            isWallGroutMenuOpen = true;
            activeMenu = wallGroutMenu;
            openNav(menuName);
        } else {
            inputElement.src = "src/img/ui/wall_grout_default.png";
            closeNav(menuName);
            isWallGroutMenuOpen = false;
            activeMenu = null;
        }
    }
}

function toggleWallTileMenu(inputElement, menuName) {

    wallTileMenu = document.getElementById('wall-tile-menu');
    if (wallTileMenu) {
        if (!isWallTileMenuOpen) {
            if (activeMenu != null && activeMenu != wallTileMenu) {
                hidePreviousActiveMenu();
            }
            inputElement.src = "src/img/ui/wall_tile_active.png";
            isWallTileMenuOpen = true;
            activeMenu = wallTileMenu;
            openNav(menuName);
        } else {
            inputElement.src = "src/img/ui/wall_tile_default.png";
            closeNav(menuName);
            isWallTileMenuOpen = false;
            activeMenu = null;
        }
    }
}

function toggleFloorTileMenu(inputElement, menuName) {

    floorTileMenu = document.getElementById('floor-tile-menu');
    if (floorTileMenu) {
        if (!isFloorTileMenuOpen) {
            if (activeMenu != null && activeMenu != floorTileMenu) {
                hidePreviousActiveMenu();
            }
            inputElement.src = "src/img/ui/floor_tile_active.png";
            isFloorTileMenuOpen = true;
            activeMenu = floorTileMenu;
            openNav(menuName);
        } else {
            inputElement.src = "src/img/ui/floor_tile_default.png";
            closeNav(menuName);
            isFloorTileMenuOpen = false;
            activeMenu = null;
        }
    }
}

function toggleRoomMenu(inputElement, menuName) {
    roomMenu = document.getElementById('rooms');
    if (roomMenu) {
        if (!isRoomMenuOpen) {
            if (activeMenu != null && activeMenu != roomMenu) {
                hidePreviousActiveMenu();
            }
            inputElement.src = "src/img/ui/rooms_active.png";
            isRoomMenuOpen = true;
            activeMenu = roomMenu;
            openNav(menuName);
        } else {
            inputElement.src = "src/img/ui/rooms_default.png";
            closeNav(menuName);
            isRoomMenuOpen = false;
            activeMenu = null;
        }
    }
}

function openNav(menuName) {
    if (window.innerWidth >= 640) {
        document.getElementById(menuName).style.width = "250px";
        document.getElementById("menu").style.marginLeft = "250px";

    } else {
        document.getElementById(menuName).style.height = "100px"
        document.getElementById("menu").style.marginBottom = "100px";
    }
}

function closeNav(menuName) {
    if (window.innerWidth >= 640) {
        document.getElementById(menuName).style.width = "0";
        document.getElementById("menu").style.marginLeft = "0";
    } else {
        document.getElementById(menuName).style.height = "0";
        document.getElementById("menu").style.marginBottom = "0";
    }
}

function hidePreviousActiveMenu() {
    if (activeMenu != null) {
        console.log(activeMenu);
        if (window.innerWidth >= 640) {
            activeMenu.style.width = "0";
        } else {
            activeMenu.style.height = "0";
        }
        isGroutMenuOpen = false;
        isWallGroutMenuOpen = false;
        isWallTileMenuOpen = false;
        isFloorTileMenuOpen = false;
        isRoomMenuOpen = false;
        loadDefaultMenuIcons();
    }
}

function loadDefaultMenuIcons() {
    document.getElementById('grouts_button').src = "src/img/ui/floor_grout_default.png";
    document.getElementById('wall-grouts_button').src = "src/img/ui/wall_grout_default.png";
    document.getElementById('wall_tile_button').src = "src/img/ui/wall_tile_default.png";
    document.getElementById('floor_tile_button').src = "src/img/ui/floor_tile_default.png";
    document.getElementById('room_button').src = "src/img/ui/rooms_default.png";
}

function closeActiveNavigationMenu() {
    if (activeMenu) {
        closeNav(activeMenu.id);
        loadDefaultMenuIcons();
        console.log("Closing active menu");

    }
}