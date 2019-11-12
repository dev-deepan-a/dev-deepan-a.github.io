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
var ui_text_names =
{
  "English": {
    "floorGroutText": "Floor Grouts",
    "wallGroutText": "Wall Grouts",
    "wallTileText": "Wall Tiles",
    "floorTileText": "Floor Tiles",
    "roomsText": "Rooms",
    "Kitchen01": "Kitchen",
    "Kitchen02": "Kitchen",
    "Living01": "Living",
    "Exterior01": "Outdoor",
    "Bath01": "Bath"
  },
  "Russian": {
    "floorGroutText": "Затирка для пола",
    "wallGroutText": "Затирка для стен",
    "wallTileText": "Плиточный клей для стен",
    "floorTileText": "Плиточный клей для пола",
    "roomsText": "Комнаты",
    "Kitchen01": "Кухня",
    "Kitchen02": "Кухня",
    "Living01": "гостинная",
    "Exterior01": "экстерьер",
    "Bath01": "ванная комната"
  },
  "German": {
    "floorGroutText": "Fugenfarbe/Boden",
    "wallGroutText": "Fugenfarbe/Wand",
    "floorTileText": "Fliesen/Boden",
    "wallTileText": "Fliesen/Wand",
    "roomsText": "Raum",
    "Kitchen01": "Küche",
    "Kitchen02": "Küche",
    "Living01": "Wohnzimmer",
    "Exterior01": "Draussen",
    "Bath01": "Badezimmer"
  },
  "Estonian": {
    "floorGroutText": "Põranda vuuk",
    "wallGroutText": "Seina vuuk",
    "floorTileText": "Põranda plaat",
    "wallTileText": "Seina plaat",
    "roomsText": "Toad",
    "Kitchen01": "Köök",
    "Kitchen02": "Köök",
    "Living01": "elutuba",
    "Exterior01": "Õues",
    "Bath01": "Vannituba"
  },
  "Lithuanian": {
    "floorGroutText": "Glaistas grindims",
    "wallGroutText": "Glaistas sienoms",
    "floorTileText": "Grindų plytelės",
    "wallTileText": "Sienų plytelės",
    "roomsText": "Patalpos",
    "Kitchen01": "Virtuvė",
    "Kitchen02": "Virtuvė",
    "Living01": "Svetainė",
    "Exterior01": "Išorė",
    "Bath01": "Vonia"
  },
  "Latvian": {
    "floorGroutText": "Grīdas šuve",
    "wallGroutText": "Sienas šuve",
    "floorTileText": "Grīdas flīze",
    "wallTileText": "Sienas flīze",
    "roomsText": "Telpas",
    "Kitchen01": "Virtuve",
    "Kitchen02": "Virtuve",
    "Living01": "Dzīvojamā istaba",
    "Exterior01": "Ārā",
    "Bath01": "Vannas istaba"
  }
}

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
    var spanElement = document.getElementById("floorGroutText");
    if (groutMenu) {
        if (!isGroutMenuOpen) {
            if (activeMenu != null && activeMenu != groutMenu) {
                hidePreviousActiveMenu();
            }
            inputElement.src = "src/img/ui/floor_grout_active.png";
            isGroutMenuOpen = true;
            activeMenu = groutMenu;
            openNav(menuName);
            setFontColor(spanElement, "black");
        } else {
            inputElement.src = "src/img/ui/floor_grout_default.png";
            closeNav(menuName);
            isGroutMenuOpen = false;
            activeMenu = null;
            setFontColor(spanElement, "white");
        }
    }
}

function toggleWallGroutMenu(inputElement, menuName) {

    wallGroutMenu = document.getElementById('wall-grout-menu');
    var spanElement = document.getElementById("wallGroutText");
    if (wallGroutMenu) {
        if (!isWallGroutMenuOpen) {
            if (activeMenu != null && activeMenu != wallGroutMenu) {
                hidePreviousActiveMenu();
            }
            inputElement.src = "src/img/ui/wall_grout_active.png";
            isWallGroutMenuOpen = true;
            activeMenu = wallGroutMenu;
            openNav(menuName);
            setFontColor(spanElement, "black");
        } else {
            inputElement.src = "src/img/ui/wall_grout_default.png";
            closeNav(menuName);
            isWallGroutMenuOpen = false;
            activeMenu = null;
            setFontColor(spanElement, "white");
        }
    }
}

function toggleWallTileMenu(inputElement, menuName) {

    wallTileMenu = document.getElementById('wall-tile-menu');
    var spanElement = document.getElementById("wallTileText");
    if (wallTileMenu) {
        if (!isWallTileMenuOpen) {
            if (activeMenu != null && activeMenu != wallTileMenu) {
                hidePreviousActiveMenu();
            }
            inputElement.src = "src/img/ui/wall_tile_active.png";
            isWallTileMenuOpen = true;
            activeMenu = wallTileMenu;
            openNav(menuName);
            setFontColor(spanElement, "black");
        } else {
            inputElement.src = "src/img/ui/wall_tile_default.png";
            closeNav(menuName);
            isWallTileMenuOpen = false;
            activeMenu = null;
            setFontColor(spanElement, "white");
        }
    }
}

function toggleFloorTileMenu(inputElement, menuName) {

    floorTileMenu = document.getElementById('floor-tile-menu');
    var spanElement = document.getElementById("floorTileText");
    if (floorTileMenu) {
        if (!isFloorTileMenuOpen) {
            if (activeMenu != null && activeMenu != floorTileMenu) {
                hidePreviousActiveMenu();
            }
            inputElement.src = "src/img/ui/floor_tile_active.png";
            isFloorTileMenuOpen = true;
            activeMenu = floorTileMenu;
            openNav(menuName);
            setFontColor(spanElement, "black");
        } else {
            inputElement.src = "src/img/ui/floor_tile_default.png";
            closeNav(menuName);
            isFloorTileMenuOpen = false;
            activeMenu = null;
            setFontColor(spanElement, "white");
        }
    }
}

function toggleRoomMenu(inputElement, menuName) {
    roomMenu = document.getElementById('rooms');
    var spanElement = document.getElementById("roomsText");
    if (roomMenu) {
        if (!isRoomMenuOpen) {
            if (activeMenu != null && activeMenu != roomMenu) {
                hidePreviousActiveMenu();
            }
            inputElement.src = "src/img/ui/rooms_active.png";
            isRoomMenuOpen = true;
            activeMenu = roomMenu;
            openNav(menuName);
            setFontColor(spanElement, "black");
        } else {
            inputElement.src = "src/img/ui/rooms_default.png";
            closeNav(menuName);
            isRoomMenuOpen = false;
            activeMenu = null;
            setFontColor(spanElement, "white");
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
        resetActiveFontColor(activeMenu.id);
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
        resetActiveFontColor(activeMenu.id);
        closeNav(activeMenu.id);
        loadDefaultMenuIcons();
        console.log("Closing active menu");

    }
}

function setFontColor(spanElement, color)
{
    spanElement.style.color = color;
}

function resetActiveFontColor(activeMenuId)
{
    switch(activeMenuId)
    {
        case "floor-grout-menu":
            var spanElement = document.getElementById("floorGroutText");
            setFontColor(spanElement, "white");
            break;
        case "wall-grout-menu":
            var spanElement = document.getElementById("wallGroutText");
            setFontColor(spanElement, "white");
            break;
        case "wall-tile-menu":
            var spanElement = document.getElementById("wallTileText");
            setFontColor(spanElement, "white");
            break;
        case "floor-tile-menu":
            var spanElement = document.getElementById("floorTileText");
            setFontColor(spanElement, "white");
            break;
        case "rooms":
            var spanElement = document.getElementById("roomsText");
            setFontColor(spanElement, "white");
            break;
    }
}

function setMainMenuText(value)
{
    var spanElement = document.getElementById("floorGroutText");
    spanElement.innerHTML = value["floorGroutText"];
    spanElement = document.getElementById("wallGroutText");
    spanElement.innerHTML = value["wallGroutText"];
    spanElement = document.getElementById("wallTileText");
    spanElement.innerHTML = value["wallTileText"];
    spanElement = document.getElementById("floorTileText");
    spanElement.innerHTML = value["floorTileText"];
    spanElement = document.getElementById("roomsText");
    spanElement.innerHTML = value["roomsText"];

    changeFloorTileMenuHeaderName(value["floorTileText"]);
    changeWallTileMenuHeaderName(value["wallTileText"]);
}

function changeUIText()
{
    console.log(ui_text_names[currentSelectedLanguage]);
    setMainMenuText(ui_text_names[currentSelectedLanguage]);
    changeRoomMenuHeaderName(roomName);
}

function getRoomNameBasisLanguage(roomName)
{
    var name = ui_text_names[currentSelectedLanguage][roomName];
    return name;
}