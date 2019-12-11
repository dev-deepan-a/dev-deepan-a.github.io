function handleEvents(id) {
  console.log(id);

  deselectMenu();

  switch (id) {
    case "floor-grout-menu":
      console.log("Grout Menu Called");
      button1 = document.getElementById("grouts_button");
      button1.src = "./src/img/ui/grout_selected.png";
      var groutMenu = document.getElementById("close-button");
      groutMenu.style.top = '70px';
      break;
    case "wall-tile":
      button2 = document.getElementById("wall_tile_button");
      button2.src = "./src/img/ui/wall_tile_selected.png";
      var groutMenu = document.getElementById("close-button");
      groutMenu.style.top = '170px';
      break;
    case "floor-tile":
      button3 = document.getElementById("floor_tile_button");
      button3.src = "./src/img/ui/floor_tile_selected.png";
      var groutMenu = document.getElementById("close-button");
      groutMenu.style.top = '250px';
      break;
    case "rooms":
      button3 = document.getElementById("room_button");
      button3.src = "./src/img/ui/room_selected.png";
      var groutMenu = document.getElementById("close-button");
      groutMenu.style.top = '400px';
      break;
    default:
      console.log("Error");
      break;
  }

  hideAllMenu(false);

  closeButton = document.getElementsByClassName("close-button");
  for (i = 0; i < closeButton.length; i++) {
    closeButton[i].style.display = "block";
  }
  console.log(id);
  var x = document.getElementById(id);
  console.log(x.style.display);
  if (x.style.display == "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }

}

function deselectMenu() {
  var button1 = document.getElementById("grouts_button");
  button1.src = "./src/img/ui/grout_deselected.jpg";

  var button2 = document.getElementById("wall_tile_button");
  button2.src = "./src/img/ui/walltile_deselected.png";

  var button3 = document.getElementById("floor_tile_button");
  button3.src = "./src/img/ui/floor_tile_deselected.jpg";

  var button4 = document.getElementById("room_button");
  button4.src = "./src/img/ui/rooms_deselected.png";
}

function hideAllMenu(doDeslectMenu) {
  subMenu = document.getElementsByClassName("sub-menu");
  for (i = 0; i < subMenu.length; i++) {
    subMenu[i].style.display = "none";
  }

  closeButton = document.getElementsByClassName("close-button");
  for (i = 0; i < closeButton.length; i++) {
    closeButton[i].style.display = "none";
  }

  if (doDeslectMenu)
    deselectMenu();

}
